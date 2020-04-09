import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { Grid, Button, Panel } from 'src/components/matchbox';
import { getBillingCountries, updateBillingSubscription } from 'src/actions/billing';
import billingUpdate from 'src/actions/billingUpdate';
import { showAlert } from 'src/actions/globalAlert';
import { Loading } from 'src/components/loading/Loading';
import { prepareCardInfo } from 'src/helpers/billing';
import { getFirstCountry, getFirstStateForCountry } from 'src/selectors/accountBillingForms';
import PlanSummary from '../components/PlanSummary';
import BillingAddressForm from 'src/components/billing/BillingAddressForm';
import PaymentForm from 'src/components/billing/PaymentForm';

const FORMNAME = 'enableAutomaticBilling';

export class EnableAutomaticBillingForm extends React.Component {
  componentDidMount() {
    this.props.getBillingCountries();
  }

  onSubmit = values => {
    const { billingUpdate, history, showAlert, updateBillingSubscription } = this.props;

    return billingUpdate({ ...values, card: prepareCardInfo(values.card) })
      .then(() =>
        updateBillingSubscription({
          type: 'active',
        }),
      )
      .then(() => {
        history.push('/account/billing');
        showAlert({ type: 'success', message: 'Automatic Billing Enabled' });
      });
  };

  render() {
    const { billingCountries, currentSubscription, handleSubmit, loading, submitting } = this.props;

    if (loading) {
      return <Loading />;
    }

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Grid>
          <Grid.Column>
            <Panel title="Add a Credit Card">
              <Panel.Section>
                <PaymentForm formName={FORMNAME} disabled={submitting} />
              </Panel.Section>
              <Panel.Section>
                <BillingAddressForm
                  formName={FORMNAME}
                  disabled={submitting}
                  countries={billingCountries}
                />
              </Panel.Section>
            </Panel>
          </Grid.Column>
          <Grid.Column xs={12} md={5}>
            <Panel title="Your Plan">
              <Panel.Section>
                <PlanSummary plan={currentSubscription} />
              </Panel.Section>
              <Panel.Section>
                <Button disabled={submitting} fullWidth primary type="submit">
                  {submitting ? 'Loading...' : 'Enable Automatic Billing'}
                </Button>
              </Panel.Section>
            </Panel>
          </Grid.Column>
        </Grid>
      </form>
    );
  }
}

const mapStateToProps = state => {
  const country = getFirstCountry(state);

  return {
    billingCountries: state.billing.countries,
    currentSubscription: state.account.subscription,
    initialValues: {
      email: state.currentUser.email,
      billingAddress: {
        firstName: state.currentUser.first_name, // for billingCreate
        lastName: state.currentUser.last_name, // for billingCreate
        state: getFirstStateForCountry(state, country),
        country,
      },
    },
    loading: state.billing.plansLoading,
  };
};

const mapDispatchtoProps = {
  billingUpdate,
  getBillingCountries,
  showAlert,
  updateBillingSubscription,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchtoProps,
  )(reduxForm({ form: FORMNAME, enableReinitialize: true })(EnableAutomaticBillingForm)),
);
