import React, { Component } from 'react';
import { connect } from 'react-redux';
import { list as getSubaccounts } from 'src/actions/subaccounts';
import { Panel, Grid } from '@sparkpost/matchbox';
import Page from '../components/SignalsPage';
import EngagementRecencyOverview from '../containers/EngagementRecencyOverviewContainer';
import FacetFilter from '../components/filters/FacetFilter';
import DateFilter from '../components/filters/DateFilter';
import SubaccountFilter from '../components/filters/SubaccountFilter';
import InfoTooltip from '../components/InfoTooltip';
import { ENGAGEMENT_RECENCY_INFO } from '../constants/info';

export class EngagementRecencyDashboard extends Component {
  componentDidMount() {
    this.props.getSubaccounts();
  }

  render() {
    const { subaccounts } = this.props;

    return (
      <Page title={
        <>
          Engagement Recency
          <InfoTooltip content={ENGAGEMENT_RECENCY_INFO} />
        </>
      }>
        <Panel sectioned>
          <Grid>
            <Grid.Column lg={4}>
              <DateFilter />
            </Grid.Column>
            <SubaccountFilter />
            <FacetFilter />
          </Grid>
        </Panel>
        <EngagementRecencyOverview subaccounts={subaccounts} hideTitle />
      </Page>
    );
  }
}

const mapStateToProps = (state, props) => ({
  subaccounts: state.subaccounts.list
});

const mapDispatchToProps = {
  getSubaccounts
};

export default connect(mapStateToProps, mapDispatchToProps)(EngagementRecencyDashboard);
