import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';
import cookie from 'js-cookie';
import _ from 'lodash';

import { CenteredLogo } from 'src/components';
import { PageLink } from 'src/components/links';
import { Error, Panel } from 'src/components/matchbox';
import JoinForm from './components/JoinForm';
import JoinError from './components/JoinError';
import SignUpTabs from './components/SignUpTabs';
import config from 'src/config';
import { inSPCEU } from 'src/config/tenant';
import { authenticate } from 'src/actions/auth';
import { loadScript } from 'src/helpers/loadScript';
import * as analytics from 'src/helpers/analytics';
import { register } from 'src/actions/account';
import {
  AFTER_JOIN_REDIRECT_ROUTE,
  LINKS,
  AWS_COOKIE_NAME,
  ANALYTICS_CREATE_ACCOUNT,
  CROSS_LINK_MAP,
} from 'src/constants';
import styles from './JoinPage.module.scss';

const brand = CROSS_LINK_MAP[config.crossLinkTenant];

export class JoinPage extends Component {
  state = {
    formData: {},
  };

  extractQueryParams = () => {
    const { params } = this.props;
    const existingCookie = cookie.getJSON(config.attribution.cookieName) || {};

    const allData = { ...existingCookie, ...params };

    return {
      sfdcid: allData.sfdcid,
      attributionData: _.pick(allData, config.salesforceDataParams),
      creationParams: allData,
    };
  };

  registerSubmit = values => {
    this.setState({ formData: values });
    const {
      params: { plan, product },
      register,
      authenticate,
    } = this.props;
    const { sfdcid, attributionData, creationParams } = this.extractQueryParams();

    const accountFields = _.omit(values, 'email_opt_in');
    const signupData = {
      ...accountFields,
      sfdcid,
      salesforce_data: { ...attributionData, email_opt_out: !values.email_opt_in },
      creation_params: { ...creationParams, email_opt_in: Boolean(values.email_opt_in) },
    };

    return register(signupData)
      .then(accountData => {
        analytics.setVariable('username', accountData.username);
        analytics.trackFormSuccess(ANALYTICS_CREATE_ACCOUNT, {
          form_type: ANALYTICS_CREATE_ACCOUNT,
        });
        return authenticate(accountData.username, values.password);
      })
      .then(() => {
        if (product === 'rv') {
          return this.props.history.push('/onboarding/recipient-validation');
        }
        return this.props.history.push(AFTER_JOIN_REDIRECT_ROUTE, { plan });
      });
  };

  render() {
    const { createError } = this.props.account;
    const { formData } = this.state;

    return (
      <div>
        {loadScript({ url: LINKS.RECAPTCHA_LIB_URL })}
        <CenteredLogo showAwsLogo={this.props.isAWSsignUp} />
        <Panel accent={!brand}>
          {brand && (
            <SignUpTabs brand={brand} isSPCEU={this.props.isSPCEU} location={this.props.location} />
          )}
          {createError && (
            <Panel.Section>
              <Error error={<JoinError errors={createError} data={formData} />} />
            </Panel.Section>
          )}
          <Panel.Section>
            <h3 className={styles.header}>{`Sign Up for SparkPost${
              this.props.isSPCEU ? ' EU' : ''
            }`}</h3>
            <JoinForm onSubmit={this.registerSubmit} />
          </Panel.Section>
        </Panel>
        <Panel.Footer
          left={
            <small>
              Already have an account? <PageLink to="/auth">Log In</PageLink>.
            </small>
          }
        />
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    account: state.account,
    params: qs.parse(props.location.search),
    isAWSsignUp: !!cookie.get(AWS_COOKIE_NAME),
    isSPCEU: inSPCEU(),
  };
}

export default withRouter(connect(mapStateToProps, { authenticate, register })(JoinPage));
