import _ from 'lodash';
import config from 'src/config';
import { createSelector } from 'reselect';
import { getDomains, isVerified } from 'src/selectors/sendingDomains';
import { selectSubaccountIdFromProps, hasSubaccounts } from 'src/selectors/subaccounts';
import { filterTemplatesBySubaccount } from 'src/helpers/templates';

export const selectTemplates = (state) => state.templates.list;
export const selectPublishedTemplates = (state) => _.filter(state.templates.list, (template) => template.has_published);
export const selectTemplateById = (state, props) => state.templates.byId[props.match.params.id] || { draft: {}, published: {}};

export const selectDraftTemplate = (state, id) => _.get(state, ['templates', 'byId', id, 'draft']);
export const selectPublishedTemplate = (state, id) => _.get(state, ['templates', 'byId', id, 'published']);
export const selectDraftTemplatePreview = (state, id, defaultValue) => (
  state.templates.contentPreview.draft[id] || defaultValue
);
export const selectPublishedTemplatePreview = (state, id, defaultValue) => (
  state.templates.contentPreview.published[id] || defaultValue
);
export const selectPreviewLineErrors = (state) => (
  _.get(state, 'templates.contentPreview.error.response.data.errors', [])
);

export const selectDefaultTestData = () => JSON.stringify(config.templates.testData, null, 2);
export const selectTemplateTestData = (state) => JSON.stringify(state.templates.testData || config.templates.testData, null, 2);

export const cloneTemplate = (template) => Object.assign({ ...template }, { name: `${template.name} Copy`, id: `${template.id}-copy` });

export const selectClonedTemplate = (state, props) => {
  const template = selectTemplateById(state, props);

  if (_.get(props, 'match.params.id') && !_.isEmpty(template.draft)) {
    return cloneTemplate(template.draft);
  }
};

// Selects sending domains for From Email typeahead
export const selectDomainsBySubaccount = createSelector(
  [getDomains, selectSubaccountIdFromProps],
  (domains, subaccountId) => _.filter(domains, (domain) => {

    if (!isVerified(domain)) {
      return false;
    }

    return subaccountId
      ? domain.shared_with_subaccounts || domain.subaccount_id === Number(subaccountId)
      : !domain.subaccount_id;
  })
);

/**
 * Selects subaccountId from the selector's second arguement, in place of props
 */
export const selectSubaccountId = (state, subaccountId) => subaccountId;

/**
 * Selects published templates, filtered by provided subaccount
 * @param state  redux state
 * @param subaccountId
 */
export const selectPublishedTemplatesBySubaccount = createSelector(
  [selectPublishedTemplates, selectSubaccountId, hasSubaccounts],
  (templates, subaccountId, subaccountsExist) => filterTemplatesBySubaccount({ templates, subaccountId, hasSubaccounts: subaccountsExist })
);
