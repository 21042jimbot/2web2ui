import React, { Component } from 'react';

import { Page } from 'src/components/matchbox';
import { Loading, ApiErrorBanner, TableCollection } from 'src/components';
import { PageLink } from 'src/components/links';
import InfoBanner from './components/InfoBanner';

const columns = [
  { label: 'Name', sortKey: 'name' },
  { label: 'ID', sortKey: 'id' },
  { label: 'Recipients', sortKey: 'total_accepted_recipients', width: '20%' },
];

const primaryAction = {
  content: 'Create Recipient List',
  Component: PageLink,
  to: '/lists/recipient-lists/create',
};

const getRowData = ({ name, id, total_accepted_recipients }) => [
  <PageLink to={`/lists/recipient-lists/edit/${id}`}>{name}</PageLink>,
  id,
  total_accepted_recipients,
];

export class ListPage extends Component {
  onReloadApiBanner = () => {
    this.props.listRecipientLists({ force: true }); // force a refresh
  };

  renderError() {
    return (
      <ApiErrorBanner
        errorDetails={this.props.error.message}
        message="Sorry, we ran into an error loading Recipient Lists"
        reload={this.onReloadApiBanner}
      />
    );
  }

  renderCollection() {
    return (
      <TableCollection
        columns={columns}
        getRowData={getRowData}
        pagination={true}
        rows={this.props.recipientLists}
        filterBox={{
          show: true,
          keyMap: { count: 'total_accepted_recipients' },
          exampleModifiers: ['name', 'id', 'count'],
          itemToStringKeys: ['name', 'id'],
        }}
        defaultSortColumn="name"
      />
    );
  }

  render() {
    const { error, loading } = this.props;

    if (loading) {
      return <Loading />;
    }

    return (
      <Page title="Recipient Lists" primaryAction={primaryAction}>
        {this.props.isEmptyStateEnabled && this.props.isHibanaEnabled && <InfoBanner />}
        {error ? this.renderError() : this.renderCollection()}
      </Page>
    );
  }
}

export default ListPage;
