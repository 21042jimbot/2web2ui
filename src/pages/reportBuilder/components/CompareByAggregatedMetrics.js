import React, { useMemo } from 'react';
import { getDeliverabilityMetrics } from 'src/helpers/api';
import {
  getMetricsFromKeys,
  getQueryFromOptionsV2 as getQueryFromOptions,
} from 'src/helpers/metrics';
import { LegendCircle, Unit } from 'src/components';
import Divider from 'src/components/divider';
import { Box, Column, Columns, Inline, LabelValue, Stack } from 'src/components/matchbox';
import { useSparkPostQuery } from 'src/hooks';
import { useReportBuilderContext } from '../context/ReportBuilderContext';
import { FILTER_TYPES } from '../constants';

export default function CompareByAggregatedMetrics({ date }) {
  const { state } = useReportBuilderContext();
  const { comparisons } = state;

  return (
    <Box padding="400" backgroundColor="gray.1000" data-id="compare-by-aggregated-metrics">
      <Columns>
        <Column width={1 / 5}>
          <LabelValue dark>
            <LabelValue.Label>Date</LabelValue.Label>

            <LabelValue.Value>
              <Unit value={date} />
            </LabelValue.Value>
          </LabelValue>
        </Column>

        <Column>
          <Stack space="300">
            {comparisons.map((comparison, comparisonIndex) => {
              return (
                <ComparisonRow
                  key={`comparison-${comparisonIndex}`}
                  comparison={comparison}
                  hasDivider={comparisonIndex < comparisons.length - 1}
                />
              );
            })}
          </Stack>
        </Column>
      </Columns>
    </Box>
  );
}

function ComparisonRow({ comparison, hasDivider }) {
  const { state: reportOptions } = useReportBuilderContext();
  const { metrics } = reportOptions;
  const comparisonObj = FILTER_TYPES.find(
    comparisonConfig => comparisonConfig.label === comparison.type,
  );
  // Prepares params for request
  const formattedMetrics = useMemo(() => {
    return getMetricsFromKeys(metrics, true);
  }, [metrics]);
  const formattedOptions = useMemo(() => {
    return getQueryFromOptions({
      ...reportOptions,
      metrics: formattedMetrics,
      [comparisonObj.value]:
        comparisonObj.value === 'subaccounts' ? comparison.id : comparison.value, // Subaccount formatting means different data must be passed to the request
    });
  }, [reportOptions, formattedMetrics, comparisonObj, comparison]);
  const { data, status } = useSparkPostQuery(() => getDeliverabilityMetrics(formattedOptions), {
    refetchOnWindowFocus: false,
  });

  if (status === 'loading' || status === 'error') return null;

  const aggregatedMetricsObj = data[0] || {};
  const aggregatedMetricsKeys = Object.keys(aggregatedMetricsObj);
  const aggregatedMetrics = getMetricsFromKeys(aggregatedMetricsKeys, true).map(metric => {
    return {
      value: aggregatedMetricsObj[metric.key],
      ...metric,
    };
  });
  const hasMetrics = Boolean(formattedMetrics.length);

  return (
    <Stack>
      <Inline>
        <LabelValue dark>
          <LabelValue.Label>{comparison.type}</LabelValue.Label>

          <LabelValue.Value>{comparison.value}</LabelValue.Value>
        </LabelValue>

        {hasMetrics
          ? aggregatedMetrics.map((metric, metricIndex) => {
              const { label, key, stroke, unit, value } = metric;

              return (
                <Stack key={`aggregated-metric-${key}-${metricIndex}`}>
                  <LabelValue dark>
                    <LabelValue.Label>{label}</LabelValue.Label>

                    <LabelValue.Value>
                      <Box display="flex" alignItems="center">
                        {stroke ? <LegendCircle marginRight="200" color={stroke} /> : null}
                        <Unit value={value} unit={unit} />
                      </Box>
                    </LabelValue.Value>
                  </LabelValue>
                </Stack>
              );
            })
          : null}
      </Inline>

      {hasDivider ? <Divider /> : null}
    </Stack>
  );
}
