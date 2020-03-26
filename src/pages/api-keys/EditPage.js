import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Page, Panel } from 'src/components/matchbox';
import {
  deleteApiKey,
  getApiKey,
  updateApiKey,
  listGrants,
  listSubaccountGrants,
} from 'src/actions/api-keys';
import { showAlert } from 'src/actions/globalAlert';

import { hasSubaccounts } from 'src/selectors/subaccounts';
import { getFormLoading, selectApiKeyId } from 'src/selectors/api-keys';
import { selectSubaccountIdFromQuery } from 'src/selectors/subaccounts';

import { Loading, DeleteModal } from 'src/components';
import ApiKeyForm from './components/ApiKeyForm';

const breadcrumbAction = {
  content: 'API Keys',
  Component: Link,
  to: '/account/api-keys',
};

export class ApiKeyEditPage extends Component {
  static defaultProps = {
    apiKey: {},
  };

  state = {
    showDeleteModal: false,
  };

  componentDidMount() {
    const { subaccount, id } = this.props;
    this.props.getApiKey({ id, subaccount });

    this.props.listGrants();
    if (this.props.hasSubaccounts) {
      this.props.listSubaccountGrants();
    }
  }

  handleDelete = () => {
    const { deleteApiKey, history, subaccount, id, showAlert } = this.props;

    return deleteApiKey({ id, subaccount }).then(() => {
      history.push('/account/api-keys');
      return showAlert({ type: 'success', message: 'API key deleted' });
    });
  };

  onToggleDelete = () => {
    this.setState({ showDeleteModal: !this.state.showDeleteModal });
  };

  onSubmit = values => {
    const { id, showAlert, updateApiKey } = this.props;

    return updateApiKey({ id, ...values }).then(() =>
      showAlert({
        type: 'success',
        message: 'API key updated',
      }),
    );
  };

  render() {
    const { apiKey, error, loading } = this.props;

    if (loading) {
      return <Loading />;
    }

    if (error) {
      return <Redirect to="/account/api-keys" />;
    }

    return (
      <Page
        title={apiKey.label}
        breadcrumbAction={breadcrumbAction}
        secondaryActions={[{ content: 'Delete', onClick: this.onToggleDelete }]}
      >
        <Panel>
          <ApiKeyForm apiKey={apiKey} onSubmit={this.onSubmit} readOnly={false} />
        </Panel>
        <DeleteModal
          open={this.state.showDeleteModal}
          title="Are you sure you want to delete this key?"
          content={
            <p>The key will be immediately and permanently removed. This cannot be undone.</p>
          }
          onCancel={this.onToggleDelete}
          onDelete={this.handleDelete}
        />
      </Page>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { error, grants, key } = state.apiKeys;

  return {
    apiKey: key,
    id: selectApiKeyId(state, props),
    error,
    grants,
    hasSubaccounts: hasSubaccounts(state),
    loading: getFormLoading(state) || state.apiKeys.keyLoading,
    subaccount: selectSubaccountIdFromQuery(state, props),
  };
};

export default connect(mapStateToProps, {
  getApiKey,
  updateApiKey,
  listGrants,
  listSubaccountGrants,
  deleteApiKey,
  showAlert,
})(ApiKeyEditPage);
