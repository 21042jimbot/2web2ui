import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Page, Tabs, Panel, Modal, Button } from '@sparkpost/matchbox';
import { Close, Launch } from '@sparkpost/matchbox-icons';
import { reduxForm } from 'redux-form';
import _ from 'lodash';
import { hasAccountOptionEnabled, isAccountUiOptionSet } from 'src/helpers/conditions/account';
import { prepareCardInfo, isProductOnSubscription } from 'src/helpers/billing';
import { rvAddPaymentFormInitialValues } from 'src/selectors/recipientValidation';
import { getBillingInfo } from 'src/actions/account';
import addRVtoSubscription from 'src/actions/addRVtoSubscription';
import { getSubscription as getBillingSubscription } from 'src/actions/billing';
import JobsTableCollection from './components/JobsTableCollection';
import ListForm, { ListTab } from './components/ListForm';
import SingleAddressForm, { SingleAddressTab } from './components/SingleAddressForm';
import ApiDetails from './components/ApiDetails';
import RVDisabledPage from './components/RVDisabledPage';
import RecipientValidationPriceTable from './components/RecipientValidationPriceTable';
import ConditionSwitch, { Case, defaultCase } from 'src/components/auth/ConditionSwitch';
import styles from './RecipientValidationPage.module.scss';
import ValidateSection from './components/ValidateSection';
import { FORMS } from 'src/constants';

const FORMNAME = FORMS.RV_ADDPAYMENTFORM;

const tabs = [
  { content: <span className={styles.TabPadding}>List</span>, key: 'list' },
  { content: 'Single Address', key: 'single' },
  { content: 'API Integration', key: 'api' },
];

export class RecipientValidationPage extends Component {
  state = {
    selectedTab: this.props.tab || 0,
    showPriceModal: false,
    useSavedCC: Boolean(this.props.billing.credit_card),
  };

  componentDidMount() {
    this.props.getBillingInfo();
    if (this.props.isStandAloneRVSet) this.props.getBillingSubscription();
  }

  componentDidUpdate(prevProps) {
    if (this.props.billing !== prevProps.billing)
      this.setState({ useSavedCC: Boolean(this.props.billing.credit_card) });
  }
  handleTabs(tabIdx) {
    const { history, isStandAloneRVSet } = this.props;
    history.replace(`/recipient-validation/${tabs[tabIdx].key}`);
    this.setState({ selectedTab: tabIdx });
    if (isStandAloneRVSet) this.props.reset();
  }

  renderTabContent = tabId => {
    switch (tabId) {
      case 0:
        return <ListForm />;
      case 1:
        return <SingleAddressForm />;
      case 2:
        return <ApiDetails />;
      default:
        return null;
    }
  };

  handleToggleCC = val => this.setState({ useSavedCC: !val });

  renderTabContentSRV = tabId => {
    const { handleSubmit, reset } = this.props;
    switch (tabId) {
      case 0:
        return <ListTab handleSubmit={handleSubmit} reset={reset} />;
      case 1:
        return <SingleAddressTab />;
      case 2:
        return <ApiDetails formname={FORMNAME} />;
      default:
        return null;
    }
  };

  redirectToNextStep = values => {
    switch (this.state.selectedTab) {
      case 1:
        this.props.history.push(`/recipient-validation/single/${values.address}`);
        break;
      case 2:
        this.props.history.push(`/account/api-keys`);
        break;
      default:
        break;
    }
  };

  onSubmit = values => {
    const {
      billing: { plans, subscription },
      isRVonSubscription,
    } = this.props;
    if (this.state.useSavedCC && isRVonSubscription) {
      this.redirectToNextStep(values);
    } else {
      const cardValues = values.card ? { ...values, card: prepareCardInfo(values.card) } : values;

      const newValues = {
        ...cardValues,
        billingId: subscription
          ? (_.find(plans, { code: subscription.code }) || {}).billingId
          : (_.find(plans, { product: 'recipient_validation' }) || {}).billingId,
      };
      let action = this.props.addRVtoSubscription({
        values: newValues,
        updateCreditCard: !this.state.useSavedCC,
        isRVonSubscription: isRVonSubscription,
      });
      return action.then(() => this.redirectToNextStep(values));
    }
  };

  handleModal = (showPriceModal = false) => this.setState({ showPriceModal });

  renderRVPriceModal = () => (
    <Panel className={styles.modalContainer} accent>
      <div style={{ float: 'right' }}>
        <Button onClick={() => this.handleModal(false)} flat>
          <Close />
        </Button>
      </div>
      <div className={styles.bodyContainer}>
        <h3>How was this calculated?</h3>
        <RecipientValidationPriceTable
          cellProps={{
            style: {
              padding: '8px 0',
            },
          }}
        />
      </div>
    </Panel>
  );

  renderRecipientValidation = () => {
    const { selectedTab, showPriceModal } = this.state;
    const { isStandAloneRVSet, billing, billingLoading, valid, submitting } = this.props;

    return (
      <Page
        title="Recipient Validation"
        primaryArea={
          <Button size="large" onClick={() => this.handleModal(true)}>
            See Pricing
          </Button>
        }
      >
        <p className={styles.LeadText}>
          Recipient Validation is an easy, efficient way to verify that email addresses are valid
          before you send. We run each address through a series of checks to catch many common
          problems, including syntax errors and non-existent mailboxes, to drive better
          deliverability, cut down on fraud, and capture every opportunity.
        </p>
        {!isStandAloneRVSet && (
          <>
            <Tabs
              selected={selectedTab}
              connectBelow={true}
              tabs={tabs.map(({ content }, idx) => ({
                content,
                onClick: () => this.handleTabs(idx),
              }))}
            />

            <Panel>{this.renderTabContent(selectedTab)}</Panel>
          </>
        )}

        {isStandAloneRVSet && (
          <Panel>
            <div className={styles.TabsWrapper}>
              <Tabs
                selected={selectedTab}
                connectBelow={true}
                tabs={tabs.map(({ content }, idx) => ({
                  content,
                  onClick: () => this.handleTabs(idx),
                }))}
              />

              {selectedTab === 2 && (
                <div className={styles.TagWrapper}>
                  <Button
                    flat
                    external
                    to="https://developers.sparkpost.com/api/recipient-validation/"
                  >
                    API Docs
                    <Launch className={styles.LaunchIcon} />
                  </Button>
                </div>
              )}
            </div>
            <Panel.Section>{this.renderTabContentSRV(selectedTab)}</Panel.Section>
          </Panel>
        )}
        {selectedTab === 0 && <JobsTableCollection />}
        {(selectedTab === 1 || selectedTab === 2) && isStandAloneRVSet && !billingLoading && (
          <ValidateSection
            credit_card={billing.credit_card}
            submitButtonName={selectedTab === 2 ? 'Create API Key' : 'Validate'}
            submitDisabled={!valid || submitting}
            formname={FORMNAME}
            handleCardToggle={this.handleToggleCC}
            defaultToggleState={!this.state.useSavedCC}
          />
        )}

        <Modal open={showPriceModal} onClose={() => this.handleModal(false)}>
          {this.renderRVPriceModal()}
        </Modal>
      </Page>
    );
  };

  render() {
    return !this.props.isStandAloneRVSet ? (
      <ConditionSwitch>
        <Case condition={hasAccountOptionEnabled('recipient_validation')}>
          {this.renderRecipientValidation()}
        </Case>
        <Case condition={defaultCase}>
          <RVDisabledPage />
        </Case>
      </ConditionSwitch>
    ) : (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        {this.renderRecipientValidation()}
      </form>
    );
  }
}

const mapStateToProps = (state, props) => ({
  tab: tabs.findIndex(({ key }) => key === props.match.params.category) || 0,
  isStandAloneRVSet: isAccountUiOptionSet('standalone_rv')(state),
  account: state.account,
  billing: state.account.billing || {},
  billingLoading: state.account.billingLoading,
  isRVonSubscription: isProductOnSubscription('recipient_validation')(state),
  initialValues: rvAddPaymentFormInitialValues(state),
});

export default withRouter(connect(mapStateToProps, { getBillingInfo })(RecipientValidationPage));

const formOptions = { form: FORMNAME, enableReinitialize: true };
export const RecipientValidationPageSRV = withRouter(
  connect(mapStateToProps, { getBillingInfo, addRVtoSubscription, getBillingSubscription })(
    reduxForm(formOptions)(RecipientValidationPage),
  ),
);
