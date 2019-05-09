/* eslint max-lines: ["warn", { "max": 220, "skipComments": true }] */
// @see discussion for custom lint rule, https://github.com/SparkPost/2web2ui/issues/230
import sparkpostApiRequest from 'src/actions/helpers/sparkpostApiRequest';
import localforage from 'localforage';
import config from 'src/config';
import { getTestDataKey, shapeContent } from './helpers/templates';
import setSubaccountHeader from './helpers/setSubaccountHeader';

export function listTemplates() {
  return sparkpostApiRequest({
    type: 'LIST_TEMPLATES',
    meta: {
      method: 'GET',
      url: '/v1/templates',
      showErrorAlert: false
    }
  });
}

export function getDraft(id, subaccountId) {
  return sparkpostApiRequest({
    type: 'GET_DRAFT_TEMPLATE',
    meta: {
      method: 'GET',
      url: `/v1/templates/${id}`,
      headers: setSubaccountHeader(subaccountId)
    }
  });
}

export function getDraftAndPreview(id, subaccountId) {
  return async (dispatch) => {
    const { content } = await dispatch(getDraft(id, subaccountId));
    const { payload = {}} = await dispatch(getTestData({ id, mode: 'draft' }));
    const substitution_data = payload.substitution_data || {};

    return dispatch(getPreview({ content, id, mode: 'draft', substitution_data, subaccountId }));
  };
}

// @todo Switch to the newer preview endpoint
// @see https://github.com/SparkPost/sparkpost-admin-api-documentation/blob/master/services/content_previewer_api.md#preview-inline-content-post
// @see https://github.com/SparkPost/sparkpost-api-documentation/blob/master/services/templates.md#preview-templatesidpreviewdraft
export function getPreview({ content, id, mode, subaccountId, substitution_data = {}}) {
  return sparkpostApiRequest({
    type: 'GET_TEMPLATE_PREVIEW',
    meta: {
      context: { id, mode },
      method: 'POST',
      url: '/v1/utils/content-previewer',
      data: { content, substitution_data },
      headers: setSubaccountHeader(subaccountId),
      showErrorAlert: false
    }
  });
}

export function getPublished(id, subaccountId) {
  return sparkpostApiRequest({
    type: 'GET_PUBLISHED_TEMPLATE',
    meta: {
      method: 'GET',
      url: `/v1/templates/${id}`,
      params: { draft: false },
      headers: setSubaccountHeader(subaccountId),
      showErrorAlert: false
    }
  });
}

export function getPublishedAndPreview(id, subaccountId) {
  return async (dispatch) => {
    const { content } = await dispatch(getPublished(id, subaccountId));
    const { payload = {}} = await dispatch(getTestData({ id, mode: 'published' }));
    const substitution_data = payload.substitution_data || {};

    return dispatch(getPreview({ content, id, mode: 'published', substitution_data, subaccountId }));
  };
}

export function create(data) {
  const { id, testData, assignTo, subaccount, content, ...formData } = data;

  return (dispatch) => {
    dispatch(setTestData({ id, mode: 'draft', data: testData }));

    return dispatch(sparkpostApiRequest({
      type: 'CREATE_TEMPLATE',
      meta: {
        method: 'POST',
        url: '/v1/templates',
        headers: setSubaccountHeader(subaccount),
        data: {
          ...formData,
          id,
          content: shapeContent(content),
          shared_with_subaccounts: assignTo === 'shared'
        }
      }
    }));
  };
}

export function update(data, subaccountId, params = {}) {
  const { id, testData, content, ...formData } = data;

  return (dispatch) => {
    dispatch(setTestData({ id, mode: 'draft', data: testData }));

    return dispatch(sparkpostApiRequest({
      type: 'UPDATE_TEMPLATE',
      meta: {
        method: 'PUT',
        url: `/v1/templates/${id}`,
        data: {
          ...formData,
          content: shapeContent(content)
        },
        params,
        headers: setSubaccountHeader(subaccountId),
        context: {
          id
        }
      }
    }));
  };
}

export function publish(data, subaccountId) {
  return (dispatch) => {
    const { id, testData } = data;

    // Save draft first, then publish
    return dispatch(update(data, subaccountId)).then(() => {
      dispatch(setTestData({ id, mode: 'published', data: testData }));

      return dispatch(sparkpostApiRequest({
        type: 'PUBLISH_TEMPLATE',
        meta: {
          method: 'PUT',
          url: `/v1/templates/${id}`,
          data: { published: true },
          headers: setSubaccountHeader(subaccountId)
        }
      }));
    });
  };
}

export function deleteTemplate(id, subaccountId) {
  return sparkpostApiRequest({
    type: 'DELETE_TEMPLATE',
    meta: {
      method: 'DELETE',
      url: `/v1/templates/${id}`,
      headers: setSubaccountHeader(subaccountId)
    }
  });
}

export function setTestData({ data, id, mode }) {
  return (dispatch, getState) => {
    const username = getState().currentUser.username;
    const testData = typeof data === 'object' ? JSON.stringify(data) : data;
    return localforage.setItem(getTestDataKey({ id, username, mode }), testData).then(() => dispatch({ type: 'SET_TEMPLATE_TEST_DATA' }));
  };
}

export function getTestData({ id, mode }) {
  return (dispatch, getState) => {
    const username = getState().currentUser.username;

    return localforage.getItem(getTestDataKey({ id, username, mode })).then((results) => {
      const defaultKeys = Object.keys(config.templates.testData);
      let testData;

      if (results) {
        const extracted = JSON.parse(results);

        if (defaultKeys.some(((key) => key in extracted))) {
          // If we find any of the expected keys, assume this is the modern format.
          // Note: this technique leaves all top level keys from local storage intact.
          testData = {
            // Set defaults for each key
            ...config.templates.testData,
            // Bring in existing fields from local storage
            ...extracted
          };
        } else {
          // Reshape test data if it does not conform with the current format.
          // There was an earlier format which included only substitution_data values.
          testData = { ...config.templates.testData, substitution_data: extracted };
        }
      }
      // Note: no fallthrough case: if no test data exists for this template,
      // the action payload will be undefined.

      return dispatch({
        type: 'GET_TEMPLATE_TEST_DATA',
        payload: testData
      });
    });
  };
}

// @see https://github.com/SparkPost/sparkpost-api-documentation/blob/master/services/transmissions.md#create-a-transmission-post
export function sendPreview({ id, mode, emails, from, subaccountId }) {
  const recipients = emails.map((email) => ({
    address: { email }
  }));

  return async (dispatch) => {
    const { payload: testData = {}} = await dispatch(getTestData({ id, mode }));

    return dispatch(sparkpostApiRequest({
      type: 'SEND_PREVIEW_TRANSMISSION',
      meta: {
        method: 'POST',
        url: '/v1/transmissions',
        headers: setSubaccountHeader(subaccountId),
        data: {
          ...testData,
          content: {
            template_id: id,
            use_draft_template: mode === 'draft'
          },
          options: {
            ...testData.options,
            sandbox: /sparkpostbox.com$/i.test(from)
          },
          recipients
        }
      }
    }));
  };
}
