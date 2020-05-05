import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { createWebhook, getEventDocs } from 'src/actions/webhooks';
import { showAlert } from 'src/actions/globalAlert';
import { Loading } from 'src/components';
import { PageLink } from 'src/components/links';
import { Page, Panel } from 'src/components/matchbox';
import WebhookForm from './components/WebhookForm';
import { setSubaccountQuery } from 'src/helpers/subaccounts';
import { selectWebhookEventListing } from 'src/selectors/eventListing';

export class WebhooksCreate extends Component {
  componentDidMount() {
    this.props.getEventDocs();
  }

  /*
    Makes a webhook object from form values and calls the createWebhook action
    with it. Invoked in the form's onSubmit func
  */
  create = values => {
    const { createWebhook, showAlert, eventListing } = this.props;
    const { name, target, subaccount, eventsRadio, auth, assignTo } = values;
    const webhook = { name, target };

    if (eventsRadio === 'select') {
      webhook.events = Object.keys(values.events).filter(key => values.events[key]);
    } else {
      // all events
      webhook.events = eventListing.map(event => event.key);
    }

    // builds the webhooks auth details from the form values
    switch (auth) {
      case 'basic':
        webhook.auth_type = 'basic';
        webhook.auth_credentials = {
          username: values.basicUser,
          password: values.basicPass,
        };
        break;
      case 'oauth2':
        webhook.auth_type = 'oauth2';
        webhook.auth_request_details = {
          url: values.tokenURL,
          body: {
            client_id: values.clientId,
            client_secret: values.clientSecret,
          },
        };
        break;
      default:
        // none
        break;
    }

    let subaccountId;

    // Value from the radio group
    if (assignTo === 'master') {
      subaccountId = 0;
    }

    // 'values.subaccount' only available if assignTo = 'subaccount'
    if (assignTo === 'subaccount') {
      subaccountId = subaccount.id;
    }

    return createWebhook({ webhook, subaccount: subaccountId }).then(() =>
      showAlert({ type: 'success', message: 'Webhook created' }),
    );
  };

  componentDidUpdate(prevProps) {
    const { webhook, history } = this.props;

    // Handles the history push after create
    if (_.isEmpty(prevProps.webhook) && !_.isEmpty(webhook)) {
      history.push(`/webhooks/details/${webhook.id}${setSubaccountQuery(webhook.subaccount)}`);
    }
  }

  render() {
    const { eventListing, eventsLoading } = this.props; // Form doesn't load until we have events

    if (eventListing.length === 0 && eventsLoading) {
      return <Loading />;
    }

    return (
      <Page
        title="Create Webhook"
        breadcrumbAction={{ content: 'View All Webhooks', Component: PageLink, to: '/webhooks' }}
      >
        <Panel>
          <WebhookForm newWebhook={true} onSubmit={this.create} />
        </Panel>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  webhook: state.webhooks.webhook,
  eventsLoading: state.webhooks.docsLoading,
  eventListing: selectWebhookEventListing(state),
});

export default withRouter(
  connect(mapStateToProps, { createWebhook, getEventDocs, showAlert })(WebhooksCreate),
);
