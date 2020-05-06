import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { LabelledValue, CopyField } from 'src/components';
import { Stack } from 'src/components/matchbox';
import { PageLink } from 'src/components/links';

import config from 'src/config';
const smtpAuth = config.smtpAuth;
const smtpDesc = 'Use the information below to configure your SMTP client to relay via SparkPost.';

/**
 * SMTP Info Table
 * Used in onboarding and SMTP account page
 * apiKey - enables a CopyField
 */
class SmtpDetails extends Component {
  render() {
    const { apiKey } = this.props;

    const smtpDescContent = apiKey
      ? `${smtpDesc} We generated an API key for you to use as a password.`
      : `${smtpDesc} You need an API key to use as a password when filling out the information.`;

    const passwordContent = apiKey ? (
      <CopyField
        value={apiKey}
        helpText="For security, this key will never be displayed in full again. Make sure you copy it somewhere safe!"
      />
    ) : (
      <p>
        The password is an API key with <strong>Send via SMTP</strong> permissions.{' '}
        <PageLink to="/account/api-keys">Manage API Keys</PageLink>
      </p>
    );

    return (
      <Fragment>
        <Stack space="500">
          <p>{smtpDescContent}</p>

          <div>
            <LabelledValue label="Host" value={smtpAuth.host} />
            <LabelledValue label="Port" value={smtpAuth.port} />
            {config.smtpAuth.alternativePort && (
              <LabelledValue label="Alternative Port" value={`${smtpAuth.alternativePort}`} />
            )}
            <LabelledValue label="Authentication" value="AUTH LOGIN" />
            <LabelledValue label="Encryption" value="STARTTLS" />
            <LabelledValue label="Username" value={smtpAuth.username} />
            <LabelledValue label="Password">{passwordContent}</LabelledValue>
          </div>
        </Stack>
      </Fragment>
    );
  }
}

SmtpDetails.defaultProps = {
  apiKey: null,
};

SmtpDetails.propTypes = {
  apiKey: PropTypes.string,
};

export default SmtpDetails;
