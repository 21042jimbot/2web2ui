import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { list as getSubaccounts } from 'src/actions/subaccounts';
import { getCurrentHealthScore } from 'src/actions/signals';
import { Grid } from 'src/components/matchbox';
import Page from '../components/SignalsPage';
import HealthScoreOverview from '../containers/HealthScoreOverviewContainer';
import FacetFilter from '../components/filters/FacetFilter';
import DateFilter from '../components/filters/DateFilter';
import SubaccountFilter from '../components/filters/SubaccountFilter';
import CurrentHealthGauge from './components/CurrentHealthGauge/CurrentHealthGauge';
import HealthScoreChart from './components/HealthScoreChart/HealthScoreChart';
import facets from '../constants/facets';
import InfoTooltip from '../components/InfoTooltip';
import { HEALTH_SCORE_INFO } from '../constants/info';

export function HealthScoreDashboard(props) {
  const { from, getCurrentHealthScore, getSubaccounts, relativeRange, subaccounts, to } = props;

  // Gets subaccount info on mount
  useEffect(() => {
    getSubaccounts();
  }, [getSubaccounts]);

  // Gets injections and current score for gauge and timeseries only when dates change
  useEffect(() => {
    // Ordered by ascending sid to guarantee account rollup (-1) is returned
    // order_by: 'sid' is the default behavior
    getCurrentHealthScore({ relativeRange, order: 'asc', limit: 1, from, to });
  }, [getCurrentHealthScore, relativeRange, from, to]);

  return (
    <Page
      title={
        <>
          Health Score
          <InfoTooltip content={HEALTH_SCORE_INFO} />
        </>
      }
      primaryArea={<DateFilter left />}
    >
      <Grid>
        <Grid.Column xs={12} lg={5} xl={4}>
          <CurrentHealthGauge />
        </Grid.Column>
        <Grid.Column xs={12} lg={7} xl={8}>
          <HealthScoreChart />
        </Grid.Column>
      </Grid>
      <HealthScoreOverview
        defaults={{ perPage: 25 }}
        subaccounts={subaccounts}
        hideTitle
        header={
          <Grid>
            <SubaccountFilter />
            <FacetFilter facets={facets} />
          </Grid>
        }
      />
    </Page>
  );
}

const mapStateToProps = state => ({
  facet: state.signalOptions.facet,
  from: state.signalOptions.from,
  subaccounts: state.subaccounts.list,
  relativeRange: state.signalOptions.relativeRange,
  to: state.signalOptions.to,
});

const mapDispatchToProps = {
  getCurrentHealthScore,
  getSubaccounts,
};

export default connect(mapStateToProps, mapDispatchToProps)(HealthScoreDashboard);
