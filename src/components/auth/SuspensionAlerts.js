import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { showAlert } from 'src/actions/globalAlert';
import { PageLink, SupportTicketLink } from 'src/components/links';
import { hasStatus, isSuspendedForBilling } from 'src/helpers/conditions/account';

/**
 * Triggers global alerts for:
 * - Account suspended
 * - Account suspended for billing
 */
export class SuspensionAlerts extends Component {
  getMessage() {
    return this.props.isSuspendedForBilling ? (
      <Fragment>
        <div>Your account is currently suspended due to a billing problem.</div>
        <div>
          To make a payment and reactivate your account,{' '}
          <PageLink to="/account/billing">visit the billing page</PageLink>.
        </div>
      </Fragment>
    ) : (
      <Fragment>
        <div>Your account is currently suspended.</div>
        <div>
          For any questions or to request reactivation, please{' '}
          <SupportTicketLink issueId="account_suspension">submit a ticket</SupportTicketLink>.
        </div>
      </Fragment>
    );
  }

  componentDidUpdate(prevProps) {
    const { isSuspended, showAlert } = this.props;

    if (!prevProps.isSuspended && isSuspended) {
      showAlert({
        type: 'warning',
        message: this.getMessage(),
        maxWidth: 800,
        autoDismiss: false,
        dedupeId: 'SUSPENSION_NOTICE',
      });
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  isSuspended: hasStatus('suspended')(state),
  isSuspendedForBilling: isSuspendedForBilling(state),
});
export default connect(mapStateToProps, { showAlert })(SuspensionAlerts);
