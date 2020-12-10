import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Loading, ApiErrorBanner, Collection } from 'src/components';
import { PageLink } from 'src/components/links';
import { Page, Panel } from 'src/components/matchbox';
import { Generic } from 'src/components/images';
import { listTrackingDomains } from 'src/actions/trackingDomains';
import { list as listSubaccounts } from 'src/actions/subaccounts';
import {
  selectTrackingDomainsList,
  selectUnverifiedTrackingDomains,
  selectTrackingDomainsAreLoaded,
} from 'src/selectors/trackingDomains';
import { selectTrackingDomainCname } from 'src/selectors/account';
import UnverifiedBanner from './components/UnverifiedBanner';
import TrackingDomainRow from './components/TrackingDomainRow';

const primaryAction = {
  content: 'Create Tracking Domain',
  Component: PageLink,
  to: '/account/tracking-domains/create',
};

export class ListPage extends Component {
  componentDidMount() {
    this.props.listTrackingDomains();
    this.props.listSubaccounts();
  }

  onReloadApiBanner = () => {
    this.props.listTrackingDomains();
  };

  renderError() {
    return <ApiErrorBanner error={this.props.error} reload={this.onReloadApiBanner} />;
  }

  renderCollection() {
    const { trackingDomains, unverified, verifying, trackingDomainCname } = this.props;
    return (
      <div>
        <UnverifiedBanner unverifiedDomains={unverified} cname={trackingDomainCname} />
        <Collection
          rows={trackingDomains || []}
          rowComponent={props => <TrackingDomainRow {...props} verifying={verifying} />}
          // getRowData={getRowData} // TODO:replace rowComponent
          rowKeyName="domain"
          outerWrapper={Panel.LEGACY}
          pagination={true}
          filterBox={{
            show: true,
            exampleModifiers: ['domain', 'status'],
            itemToStringKeys: ['domain', 'subaccount_id'],
          }}
        />
      </div>
    );
  }

  render() {
    const { error, trackingDomains, trackingDomainsLoaded } = this.props;

    if (!trackingDomainsLoaded) {
      return <Loading />;
    }

    return (
      <Page
        title="Tracking Domains"
        primaryAction={primaryAction}
        empty={{
          show: trackingDomainsLoaded && trackingDomains.length === 0,
          content: <p>Use a custom domain for engagement tracking</p>,
          image: Generic,
        }}
      >
        {error ? this.renderError() : this.renderCollection()}
      </Page>
    );
  }
}

const mapStateToProps = state => {
  const { trackingDomains } = state;
  return {
    error: trackingDomains.error,
    loading: trackingDomains.listLoading,
    trackingDomains: selectTrackingDomainsList(state),
    trackingDomainCname: selectTrackingDomainCname(state),
    trackingDomainsLoaded: selectTrackingDomainsAreLoaded(state),
    unverified: selectUnverifiedTrackingDomains(state),
    verifying: trackingDomains.verifying,
  };
};

export default connect(mapStateToProps, { listTrackingDomains, listSubaccounts })(ListPage);
