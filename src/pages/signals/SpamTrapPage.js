/* eslint-disable max-lines */
import React, { Component } from 'react';
import { getSpamHits } from 'src/actions/signals';
import { selectSpamHitsDetails } from 'src/selectors/signals';
import { Grid } from '@sparkpost/matchbox';
import { PageLink } from 'src/components/links';
import { Panel } from 'src/components/matchbox';
import Page from './components/SignalsPage';
import BarChart from './components/charts/barchart/BarChart';
import SpamTrapActions from './components/actionContent/SpamTrapActions';
import TooltipMetric from 'src/components/charts/TooltipMetric';
import DateFilter from './components/filters/DateFilter';
import { SPAM_TRAP_INFO } from './constants/info';
import withDetails from './containers/withDetails';
import withDateSelection from './containers/withDateSelection';
import { Loading } from 'src/components';
import Callout from 'src/components/callout';
import Legend from './components/charts/legend/Legend';
import Divider from './components/Divider';
import Calculation from './components/viewControls/Calculation';
import ChartHeader from './components/ChartHeader';
import { formatFullNumber, formatNumber, roundToPlaces } from 'src/helpers/units';
import moment from 'moment';
import _ from 'lodash';
import { spamTrapHitTypesCollection, spamTrapHitTypesByLabel } from './constants/spamTrapHitTypes';

import EngagementRecencyPreview from './components/previews/EngagementRecencyPreview';
import HealthScorePreview from './components/previews/HealthScorePreview';
import styles from './DetailsPages.module.scss';

export class SpamTrapPage extends Component {
  state = {
    calculation: 'relative',
  };

  handleCalculationToggle = value => {
    this.setState({ calculation: value });
  };

  getYAxisProps = () => {
    const { data } = this.props;
    const { calculation } = this.state;

    return {
      tickFormatter:
        calculation === 'relative'
          ? tick => `${roundToPlaces(tick * 100, 3)}%`
          : tick => formatNumber(tick),
      domain:
        data.every(({ relative_trap_hits }) => !relative_trap_hits) && calculation === 'relative'
          ? [0, 1]
          : ['auto', 'auto'],
    };
  };

  getXAxisProps = () => {
    const { xTicks } = this.props;
    return {
      ticks: xTicks,
      tickFormatter: tick => moment(tick).format('M/D'),
    };
  };

  getTooltipContent = ({ payload = {} }) => (
    <>
      {this.state.calculation === 'absolute' ? (
        <TooltipMetric label="Spam Trap Hits" value={formatFullNumber(payload.trap_hits)} />
      ) : (
        <TooltipMetric
          label="Spam Trap Rate"
          value={`${roundToPlaces(payload.relative_trap_hits * 100, 4)}%`}
        />
      )}
      {spamTrapHitTypesCollection.map(({ fill, key, label }) => (
        <TooltipMetric
          color={fill}
          key={key}
          label={label}
          value={
            this.state.calculation === 'absolute'
              ? `${formatFullNumber(payload[key])}`
              : `${roundToPlaces(payload[`relative_${key}`] * 100, 4)}%`
          }
        />
      ))}
      <TooltipMetric label="Injections" value={formatFullNumber(payload.injections)} />
    </>
  );

  renderContent = () => {
    const {
      data = [],
      handleDateSelect,
      loading,
      gap,
      empty,
      error,
      selectedDate,
      handleDateHover,
      resetDateHover,
      hoveredDate,
      shouldHighlightSelected,
    } = this.props;
    const { calculation } = this.state;
    const selectedSpamTrapHits = _.find(data, ['date', selectedDate]) || {};
    let chartPanel;

    if (empty) {
      chartPanel = (
        <Callout title="No Data Available">Insufficient data to populate this chart</Callout>
      );
    }

    if (error) {
      chartPanel = <Callout title="Unable to Load Data">{error.message}</Callout>;
    }

    if (loading) {
      chartPanel = (
        <div style={{ height: '220px', position: 'relative' }}>
          <Loading />
        </div>
      );
    }

    return (
      <Grid>
        <Grid.Column sm={12} md={7}>
          <Panel sectioned>
            <ChartHeader
              title="Spam Trap Monitoring"
              primaryArea={
                <Calculation
                  initialSelected={calculation}
                  onChange={this.handleCalculationToggle}
                />
              }
              tooltipContent={SPAM_TRAP_INFO}
            />
            {chartPanel || (
              <div className="LiftTooltip">
                <BarChart
                  gap={gap}
                  onClick={handleDateSelect}
                  selected={selectedDate}
                  timeSeries={data}
                  onMouseOver={handleDateHover}
                  onMouseOut={resetDateHover}
                  hovered={hoveredDate}
                  shouldHighlightSelected={shouldHighlightSelected}
                  tooltipContent={this.getTooltipContent}
                  yKeys={spamTrapHitTypesCollection
                    .map(({ fill, key }) => ({
                      key: calculation === 'relative' ? `relative_${key}` : key,
                      fill,
                    }))
                    .reverse()}
                  yAxisProps={this.getYAxisProps()}
                  xAxisProps={this.getXAxisProps()}
                />
                <Legend
                  items={spamTrapHitTypesCollection}
                  tooltipContent={label => spamTrapHitTypesByLabel[label].description}
                />
              </div>
            )}
          </Panel>
        </Grid.Column>
        <Grid.Column sm={12} md={5} mdOffset={0}>
          <div className={styles.OffsetCol}>
            {!chartPanel && (
              <SpamTrapActions
                percent={selectedSpamTrapHits.relative_trap_hits}
                date={selectedDate}
              />
            )}
          </div>
        </Grid.Column>
      </Grid>
    );
  };

  render() {
    const { facet, facetId, subaccountId } = this.props;

    return (
      <Page
        breadcrumbAction={{
          content: 'Back to Spam Trap Overview',
          to: '/signals/spam-traps',
          component: PageLink,
        }}
        title="Spam Traps"
        facet={facet}
        facetId={facetId}
        subaccountId={subaccountId}
        primaryArea={<DateFilter left />}
      >
        {this.renderContent()}
        <Divider />
        <Grid>
          <Grid.Column xs={12} sm={6}>
            <EngagementRecencyPreview />
          </Grid.Column>
          <Grid.Column xs={12} sm={6}>
            <HealthScorePreview />
          </Grid.Column>
        </Grid>
      </Page>
    );
  }
}

export default withDetails(withDateSelection(SpamTrapPage), { getSpamHits }, selectSpamHitsDetails);
