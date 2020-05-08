import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { updateBillingContact, getBillingCountries } from 'src/actions/billing';
import { showAlert } from 'src/actions/globalAlert';
import { updateContactInitialValues } from 'src/selectors/accountBillingForms';

import { Button, Panel } from 'src/components/matchbox';
import { ButtonWrapper } from 'src/components';
import BillingContactForm from './fields/BillingContactForm';

const FORMNAME = 'updateContact';

export class UpdateContactForm extends Component {
  componentDidMount() {
    this.props.getBillingCountries();
  }

  onSubmit = values => {
    const { updateBillingContact, showAlert } = this.props;
    return updateBillingContact(values).then(() => {
      showAlert({ type: 'success', message: 'Billing Contact Updated' });
    });
  };

  render() {
    const { onCancel, handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Panel title="Update Billing Contact">
          <Panel.Section>
            <BillingContactForm
              formName={FORMNAME}
              disabled={submitting}
              countries={this.props.billing.countries}
            />
          </Panel.Section>
          <Panel.Section>
            <ButtonWrapper marginTop="0">
              <Button type="submit" variant="primary" disabled={submitting}>
                Update Billing Contact
              </Button>
              <Button onClick={onCancel} variant="secondary">
                Cancel
              </Button>
            </ButtonWrapper>
          </Panel.Section>
        </Panel>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  billing: state.billing,
  initialValues: updateContactInitialValues(state),
});

const mapDispatchtoProps = { getBillingCountries, updateBillingContact, showAlert };
const formOptions = { form: FORMNAME, enableReinitialize: true };
export default connect(
  mapStateToProps,
  mapDispatchtoProps,
)(reduxForm(formOptions)(UpdateContactForm));
