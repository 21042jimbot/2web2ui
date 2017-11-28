import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Page, Panel } from '@sparkpost/matchbox';

import { deleteApiKey, listApiKeys, updateApiKey, listGrants, listSubaccountGrants } from 'src/actions/api-keys';
import { list as listSubaccounts } from 'src/actions/subaccounts';

import { hasSubaccounts } from 'src/selectors/subaccounts';
import { getApiKey, getFormLoading } from 'src/selectors/api-keys';

import { Loading, DeleteModal } from 'src/components';
import ApiKeyForm from './components/ApiKeyForm';

const breadcrumbAction = {
  content: 'API Keys',
  Component: Link,
  to: '/account/api-keys'
};

export class ApiKeysDetailsPage extends Component {
  static defaultProps = {
    apiKey: {}
  };

  state = {
    showDeleteModal: false
  };

  constructor(props) {
    super(props);
    this.secondaryActions = [
      { content: 'Delete', onClick: this.onToggleDelete }
    ];
  }

  componentDidMount() {
    this.props.listApiKeys();
    this.props.listGrants();
    if (this.props.hasSubaccounts) {
      this.props.listSubaccountGrants();
      this.props.listSubaccounts();
    }
  }

  handleDelete = () => {
    const { deleteApiKey, history } = this.props;

    deleteApiKey().then(() => {
      history.push('/account/api-keys');
    });
  };

  onToggleDelete = () => {
    this.setState({ showDeleteModal: !this.state.showDeleteModal });
  };

  onSubmit = (values) => {
    const { updateApiKey, history } = this.props;

    return updateApiKey(values).then((res) => {
      history.push('/account/api-keys');
    });
  };

  render() {
    const { apiKey, loading } = this.props;

    if (loading) {
      return <Loading />;
    }

    return (
      <Page
        title={apiKey.label}
        breadcrumbAction={breadcrumbAction}
        secondaryActions={this.secondaryActions}>
        <Panel>
          <Panel.Section>
            <ApiKeyForm apiKey={apiKey} onSubmit={this.onSubmit} />
          </Panel.Section>
        </Panel>
        <DeleteModal
          open={this.state.showDeleteModal}
          title="Are you sure you want to delete this key?"
          content={<p>The key will be immediately and permanently removed. This cannot be undone.</p>}
          onCancel={this.onToggleDelete}
          onDelete={this.handleDelete}
        />
      </Page>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { error, grants } = state.apiKeys;

  return {
    apiKey: getApiKey(state, props),
    error,
    grants,
    hasSubaccounts: hasSubaccounts(state),
    loading: getFormLoading(state) || state.apiKeys.keysLoading
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const { id } = props.match.params;

  return {
    deleteApiKey: () => dispatch(deleteApiKey(id)),
    listApiKeys: () => dispatch(listApiKeys()),
    updateApiKey: (values) => dispatch(updateApiKey(id, values)),
    listGrants: () => dispatch(listGrants()),
    listSubaccountGrants: () => dispatch(listSubaccountGrants()),
    listSubaccounts: () => dispatch(listSubaccounts())
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ApiKeysDetailsPage)
);
