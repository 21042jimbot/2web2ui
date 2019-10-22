import React from 'react';
import { Page } from '@sparkpost/matchbox';
import ApiErrorBanner from 'src/components/apiErrorBanner';
import { Templates } from 'src/components/images';
import Loading from 'src/components/loading';
import PageLink from 'src/components/pageLink';
import SnippetCollection from './components/SnippetCollection';
import { ROLES } from 'src/constants';
export default class ListPage extends React.Component {
  componentDidMount() {
    this.props.getSnippets();
    if (this.props.hasSubaccounts && this.props.subaccounts.length === 0) {
      this.props.listSubaccounts();
    }
  }

  renderError() {
    const { error, getSnippets } = this.props;
    return (
      <ApiErrorBanner
        errorDetails={error.message}
        message="Sorry, we seem to have had some trouble loading your snippets."
        reload={getSnippets}
      />
    );
  }

  renderCollection() {
    const { snippets, hasSubaccounts, canCreate, userAccessLevel } = this.props;
    return (
      <SnippetCollection
        canCreate={canCreate}
        hasSubaccounts={hasSubaccounts}
        canViewSubaccounts={userAccessLevel !== ROLES.SUBACCOUNT_REPORTING}
        snippets={snippets}
      />
    );
  }

  render() {
    const { canCreate, error, loading, snippets } = this.props;

    if (loading) {
      return <Loading />;
    }

    return (
      <Page
        title="Snippets"
        primaryAction={(
          canCreate
            ? { Component: PageLink, content: 'Create Snippet', to: '/snippets/create' }
            : undefined
        )}
        empty={{
          show: !error && snippets.length === 0,
          image: Templates,
          title: 'Manage your template snippets',
          content: <p>Build, import, edit, and reuse snippets.</p>
        }}
      >
        {error ? this.renderError() : this.renderCollection()}
      </Page>
    );
  }
}
