import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { LINKS } from 'src/constants';
import { TextFieldWrapper } from 'src/components/reduxFormWrappers';
import { Button, UnstyledLink } from '@sparkpost/matchbox';
import { required, minLength } from 'src/helpers/validation';

export class RegisterUserForm extends Component {
  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Field
          name="username"
          component={TextFieldWrapper}
          label="Username"
          validate={required}
          disabled={true}
        />
        <Field
          name="password"
          component={TextFieldWrapper}
          label="Password"
          helpText="Passwords must be at least 12 characters long."
          validate={[required, minLength(12)]}
          disabled={submitting}
          type="password"
          autoFocus={true}
          autoComplete="new-password"
          data-lpignore={true} // removes inaccurate LastPass password management behavior
        />
        <p>
          <small>
            By joining, you agree to SparkPost's{' '}
            <UnstyledLink to={LINKS.TOU} external>
              Terms of Use
            </UnstyledLink>
          </small>
        </p>
        <Button primary submit disabled={submitting}>
          {submitting ? 'Loading' : 'Confirm'}
        </Button>
      </form>
    );
  }
}

const mapStateToProps = (state, { email }) => ({
  initialValues: { username: email },
});

const RegisterUserReduxForm = reduxForm({ form: 'RegisterUser' })(RegisterUserForm);
export default connect(mapStateToProps, {})(RegisterUserReduxForm);
