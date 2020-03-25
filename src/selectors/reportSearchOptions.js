import { createSelector } from 'reselect';
import moment from 'moment';
import { stringifyTypeaheadfilter } from 'src/helpers/string';
import _ from 'lodash';

const selectDateOptions = state => ({
  from: moment(state.reportOptions.from).format(),
  to: moment(state.reportOptions.to).format(),
  precision: state.reportOptions.precision,
  timezone: state.reportOptions.timezone,
  range: state.reportOptions.relativeRange,
});

const selectTypeaheadFilters = state => ({
  filters: _.get(state, 'reportOptions.filters', []).map(stringifyTypeaheadfilter),
});

const selectSummaryMetrics = state => ({
  metrics: _.get(state, 'reportOptions.metrics', []).map(metric =>
    typeof metric === 'string' ? metric : metric.key,
  ),
});

/**
 * Converts reportOptions for url sharing
 */
export const selectReportSearchOptions = createSelector(
  [selectDateOptions, selectTypeaheadFilters],
  (dates, filters) => ({ ...dates, ...filters }),
);

/**
 * Converts reportOptions for url sharing for the summary chart
 */
export const selectSummaryChartSearchOptions = createSelector(
  [selectDateOptions, selectTypeaheadFilters, selectSummaryMetrics],
  (dates, filters, metrics) => ({ ...dates, ...filters, ...metrics }),
);
