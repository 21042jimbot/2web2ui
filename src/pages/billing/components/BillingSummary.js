import React, { Component } from 'react';
import { LabelledValue } from 'src/components';
import { PageLink } from 'src/components/links';
import { Box, Panel, UnstyledLink, Modal } from 'src/components/matchbox';
import { OGOnlyWrapper } from 'src/components/hibana';
import {
  PremiumBanner,
  EnterpriseBanner,
  PendingPlanBanner,
  FreePlanWarningBanner,
} from './Banners';
import UpdatePaymentForm from '../forms/UpdatePaymentForm';
import UpdateContactForm from '../forms/UpdateContactForm';
import AddIps from '../forms/AddIps';
import DedicatedIpSummarySection from './DedicatedIpSummarySection';
import InvoiceHistory from './InvoiceHistory';
import CardSummary from 'src/components/billing/CardSummary';
import PlanSummary from './PlanSummary';
import RecipientValidationModal from './RecipientValidationModal';
import { formatFullNumber } from 'src/helpers/units';
import totalRVCost from '../helpers/totalRecipientValidationCost';
import _ from 'lodash';
import { formatDateTime } from 'src/helpers/date';
const PAYMENT_MODAL = 'payment';
const CONTACT_MODAL = 'contact';
const IP_MODAL = 'ip';
const RV_MODAL = 'recipient_validation';

export default class BillingSummary extends Component {
  state = {
    show: false,
  };

  handleModal = (modal = false) => {
    this.setState({ show: this.state.show ? false : modal });
  };

  handlePaymentModal = () => this.handleModal(PAYMENT_MODAL);
  handleContactModal = () => this.handleModal(CONTACT_MODAL);
  handleIpModal = () => this.handleModal(IP_MODAL);
  handleRvModal = () => this.handleModal(RV_MODAL, true);

  renderSummary = () => {
    const { account } = this.props;
    const { billing } = account;
    return (
      <Panel title="Billing" data-id="billing-panel">
        <Panel.Section
          actions={[
            {
              content: 'Update Payment Information',
              onClick: this.handlePaymentModal,
              color: 'orange',
            },
          ]}
        >
          <CardSummary label="Credit Card" credit_card={billing.credit_card} />
        </Panel.Section>
        <Panel.Section
          actions={[
            {
              content: 'Update Billing Contact',
              onClick: this.handleContactModal,
              color: 'orange',
            },
          ]}
        >
          <LabelledValue label="Billing Contact">
            <h6>
              {billing.first_name} {billing.last_name}
            </h6>
            <p>{billing.email}</p>
          </LabelledValue>
        </Panel.Section>
      </Panel>
    );
  };

  renderDedicatedIpSummarySection = isTransitioningToSelfServe => (
    <DedicatedIpSummarySection
      count={this.props.sendingIps.length}
      plan={this.props.currentPlan}
      onClick={this.handleIpModal}
      isTransitioningToSelfServe={isTransitioningToSelfServe}
    />
  );

  renderRecipientValidationSection = ({ rvUsage }) => {
    const volumeUsed = _.get(rvUsage, 'recipient_validation.month.used', 0);
    const recipientValidationDate = _.get(rvUsage, 'recipient_validation.timestamp');
    return (
      <Panel.Section>
        <LabelledValue label="Recipient Validation">
          <h6>
            {formatFullNumber(volumeUsed)} emails validated for {totalRVCost(volumeUsed)}
            <small> as of {formatDateTime(recipientValidationDate)}</small>
          </h6>
          <UnstyledLink onClick={this.handleRvModal}>How was this calculated?</UnstyledLink>
        </LabelledValue>
      </Panel.Section>
    );
  };

  render() {
    const {
      account,
      subscription: billingSubscription,
      currentPlan,
      canChangePlan,
      canUpdateBillingInfo,
      canPurchaseIps,
      invoices,
      accountAgeInDays,
    } = this.props;
    const { rvUsage, pending_cancellation, subscription, billing = {} } = account;
    const { show } = this.state;
    // This is an extreme case to support manually billed accounts while transitioning to self serve
    const isTransitioningToSelfServe =
      billing !== null && !billing.credit_card && subscription.type === 'default';

    const volumeUsed = _.get(rvUsage, 'recipient_validation.month.used', 0);

    const changePlanActions = [];
    if (!pending_cancellation && canChangePlan && !isTransitioningToSelfServe) {
      const changePlanLabel = currentPlan.isFree ? 'Upgrade Now' : 'Change Plan';
      changePlanActions.push({
        content: changePlanLabel,
        to: '/account/billing/plan',
        Component: PageLink,
        color: 'orange',
      });
    }

    return (
      <div>
        <PendingPlanBanner account={account} subscription={billingSubscription} />
        <FreePlanWarningBanner account={account} accountAgeInDays={accountAgeInDays} />
        <Panel accent title="Plan Overview">
          <Panel.Section actions={changePlanActions}>
            <LabelledValue label="Your Plan">
              <PlanSummary plan={account.subscription} pendingCancellation={pending_cancellation} />
            </LabelledValue>
          </Panel.Section>
          {canPurchaseIps && this.renderDedicatedIpSummarySection(isTransitioningToSelfServe)}
          {rvUsage && this.renderRecipientValidationSection({ rvUsage })}
        </Panel>

        {canUpdateBillingInfo && this.renderSummary()}

        {invoices.length > 0 && <InvoiceHistory invoices={this.props.invoices} />}

        <PremiumBanner />
        <EnterpriseBanner />

        <Modal open={!!show} onClose={this.handleModal}>
          {show === PAYMENT_MODAL && <UpdatePaymentForm onCancel={this.handleModal} />}
          {show === CONTACT_MODAL && <UpdateContactForm onCancel={this.handleModal} />}
          {show === IP_MODAL && <AddIps onClose={this.handleModal} />}
        </Modal>
        <OGOnlyWrapper as={Modal} open={show === RV_MODAL} onClose={this.handleModal}>
          <Box
            as={Modal}
            open={show === RV_MODAL}
            onClose={this.handleModal}
            showCloseButton={true}
          >
            <RecipientValidationModal volumeUsed={volumeUsed} onClose={this.handleModal} />
          </Box>
        </OGOnlyWrapper>
      </div>
    );
  }
}
