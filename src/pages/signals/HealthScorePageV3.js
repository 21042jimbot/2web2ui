import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { selectHealthScoreDetailsV3 } from 'src/selectors/signals';
import Page from './components/SignalsPage';
import { Grid, Panel } from '@sparkpost/matchbox';
import { Button } from 'src/components/matchbox';
import withDetails from './containers/withDetails';
import BarChart from './components/charts/barchart/BarChart';
import withDateSelection from './containers/withDateSelection';
import { getHealthScore } from 'src/actions/signals';
import TooltipMetric from 'src/components/charts/TooltipMetric';
import thresholds from './constants/healthScoreThresholds';
import { roundToPlaces } from 'src/helpers/units';
import moment from 'moment';
import HealthScoreMetric from './components/HealthScoreMetric';
import DateFilter from './components/filters/DateFilter';
import HealthScoreLegend from './components/HealthScoreLegend';
import Callout from 'src/components/callout/Callout';
import { Loading } from 'src/components';

export function HealthScorePageV3(props) {
  const {
    data = [],
    empty,
    error,
    facet,
    facetId,
    handleDateHover,
    handleDateSelect,
    hoveredDate,
    gap,
    loading,
    resetDateHover,
    selectedDate,
    subaccountId,
    xTicks,
  } = props;

  const getXAxisProps = useCallback(
    () => ({
      ticks: xTicks,
      tickFormatter: tick => moment(tick).format('M/D'),
    }),
    [xTicks],
  );

  const renderChart = () => {
    if (empty) {
      return <Callout title="No Data Available">Insufficient data to populate this chart</Callout>;
    }

    if (error) {
      return <Callout title="Unable to Load Data">{error.message}</Callout>;
    }

    if (loading) {
      return (
        <div style={{ height: '220px', position: 'relative' }}>
          <Loading />
        </div>
      );
    }
    return (
      <BarChart
        gap={gap}
        onClick={handleDateSelect}
        onMouseOver={handleDateHover}
        onMouseOut={resetDateHover}
        disableHover={false}
        selected={selectedDate}
        hovered={hoveredDate}
        timeSeries={data}
        tooltipContent={({ payload = {} }) =>
          payload.ranking && (
            <TooltipMetric
              label="Health Score"
              color={thresholds[payload.ranking].color}
              value={`${roundToPlaces(payload.health_score * 100, 1)}`}
            />
          )
        }
        yAxisRefLines={[
          { y: 0.8, stroke: thresholds.good.color, strokeWidth: 1 },
          { y: 0.55, stroke: thresholds.danger.color, strokeWidth: 1 },
        ]}
        yKey="health_score"
        yAxisProps={{
          ticks: [0, 0.55, 0.8, 1],
          tickFormatter: tick => parseInt(tick * 100),
        }}
        xAxisProps={getXAxisProps()}
      />
    );
  };

  const scoreMetricDate = hoveredDate || selectedDate;
  const { injections, health_score = 0 } =
    data.find(dataPoint => dataPoint.date === scoreMetricDate) || {};
  return (
    <Page
      breadcrumbAction={{
        content: 'Back to Health Score Overview',
        to: '/signals/health-score',
        component: Link,
      }}
      title="Health Score"
      facet={facet}
      facetId={facetId}
      subaccountId={subaccountId}
      primaryArea={
        <Button primary component={Link} to="/alerts/create">
          Create Alert
        </Button>
      }
    >
      <Panel>
        <Panel.Section>
          <Grid>
            <Grid.Column xs={8}>
              {!loading && !empty && !error && (
                <HealthScoreMetric
                  date={scoreMetricDate}
                  injections={injections}
                  score={health_score * 100}
                />
              )}
            </Grid.Column>
            <Grid.Column xs={4}>
              <DateFilter left />
              <HealthScoreLegend />
            </Grid.Column>
          </Grid>
          {renderChart()}
        </Panel.Section>
      </Panel>
    </Page>
  );
}

export default withDetails(
  withDateSelection(HealthScorePageV3),
  { getHealthScore },
  selectHealthScoreDetailsV3,
);
