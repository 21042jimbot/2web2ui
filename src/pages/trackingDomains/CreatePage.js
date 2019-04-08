import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Page, Banner, UnstyledLink } from '@sparkpost/matchbox';
import CreateForm from './components/CreateForm';
import { createTrackingDomain } from 'src/actions/trackingDomains';
import { selectTrackingDomainCname } from 'src/selectors/account';
import { LINKS } from 'src/constants';

export class CreatePage extends Component {

  onSubmit = (data) => {
    const { history, createTrackingDomain } = this.props;
    return createTrackingDomain(data).then(() => {
      history.push('/account/tracking-domains');
    });
  };

  render() {
    const { cname } = this.props;
    return (
      <div>
        <Page
          title='Create Tracking Domain'
          breadcrumbAction={{ content: 'Back to Tracking Domains', to: '/account/tracking-domains', Component: Link }}
        />
        <Banner
          status="info"
          title="Verification required">
          <p>Tracking domains need to be verified via DNS. You'll need to <strong>add a CNAME record</strong> with the value of <strong>{cname}</strong> to this domain's DNS settings before it can be used or set as the default. <UnstyledLink to={LINKS.DOMAIN_VERIFICATION} external>Learn more about editing your DNS settings.</UnstyledLink></p>
        </Banner>
        <CreateForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect((state) => ({
  cname: selectTrackingDomainCname(state)
}), { createTrackingDomain })(CreatePage);
