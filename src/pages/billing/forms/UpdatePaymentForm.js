import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { getBillingCountries } from 'src/actions/billing';
import billingUpdate from 'src/actions/billingUpdate';
import { showAlert } from 'src/actions/globalAlert';
import { updatePaymentInitialValues } from 'src/selectors/accountBillingForms';
import { prepareCardInfo } from 'src/helpers/billing';
import { Button, Panel } from 'src/components/matchbox';
import PaymentForm from 'src/components/billing/PaymentForm';
import BillingAddressForm from 'src/components/billing/BillingAddressForm';
import styles from './UpdatePaymentForm.module.scss';

const FORMNAME = 'updatePayment';

export class UpdatePaymentForm extends Component {
  componentDidMount() {
    this.props.getBillingCountries();
  }

  onSubmit = values => {
    const { billingUpdate, showAlert } = this.props;

    const newValues = values.card ? { ...values, card: prepareCardInfo(values.card) } : values;

    return billingUpdate(newValues).then(() => {
      showAlert({ type: 'success', message: 'Payment Information Updated' });
    });
  };

  render() {
    const { onCancel, handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Panel title="Update Payment Information">
          <Panel.Section>
            <PaymentForm formName={FORMNAME} disabled={submitting} />
          </Panel.Section>
          <Panel.Section>
            <BillingAddressForm
              formName={FORMNAME}
              disabled={submitting}
              countries={this.props.billing.countries}
            />
          </Panel.Section>
          <Panel.Section>
            <Button type="submit" primary disabled={submitting}>
              Update Payment Information
            </Button>
            {onCancel && (
              <Button onClick={onCancel} className={styles.Cancel}>
                Cancel
              </Button>
            )}
          </Panel.Section>
        </Panel>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  billing: state.billing,
  initialValues: updatePaymentInitialValues(state),
});

const mapDispatchtoProps = { getBillingCountries, billingUpdate, showAlert };
const formOptions = { form: FORMNAME, enableReinitialize: true };
export default connect(
  mapStateToProps,
  mapDispatchtoProps,
)(reduxForm(formOptions)(UpdatePaymentForm));
