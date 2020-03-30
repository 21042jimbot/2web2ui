import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { required } from 'src/helpers/validation';
import { TextFieldWrapper } from 'src/components';
import { ExternalLink } from 'src/components/links';
import { Button, Error } from 'src/components/matchbox';
import { verifyAndLogin } from 'src/actions/tfa';
import { LINKS } from 'src/constants';
import styles from './TfaForm.module.scss';

export class TfaForm extends Component {
  handleSubmit = ({ code }) => {
    const { enabled: _enabled, ...authData } = this.props.tfa;

    return this.props.verifyAndLogin({ authData, code }).catch(err => {
      if (err.response.status === 400 || err.response.status === 403) {
        throw new SubmissionError({
          _error: 'The code is invalid. Please contact login.issues@sparkpost.com for assistance.',
        });
      }
    });
  };

  render() {
    const { tfaPending, pristine, error } = this.props;

    return (
      <div>
        <div>
          <p className="join-p">
            Enter the code generated by your two-factor auth application, or one of your{' '}
            <ExternalLink to={LINKS.TFA_BACKUP_CODES}>backup codes</ExternalLink>.
          </p>
        </div>
        <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
          <Field
            autoFocus
            name="code"
            id="code"
            label="Code"
            placeholder="123456"
            component={TextFieldWrapper}
            validate={required}
          />
          {error && <Error wrapper="div" error={error} className={styles.TFASubmissionError} />}
          <Button primary submit disabled={tfaPending || pristine}>
            {tfaPending ? 'Logging In' : 'Log In'}
          </Button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ tfa }) {
  return {
    tfa,
    tfaPending: tfa.tfaPending,
    initialValues: {
      code: tfa.code,
    },
  };
}

const formOptions = {
  form: 'tfaForm',
};

export default connect(mapStateToProps, { verifyAndLogin })(reduxForm(formOptions)(TfaForm));
