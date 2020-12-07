import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Grid, Inline, LabelValue } from 'src/components/matchbox';
import { Unit, LegendCircle } from 'src/components';
import { useReportBuilderContext } from '../context/ReportBuilderContext';

export default function AggregatedMetrics({ date }) {
  const chart = useSelector(state => state.summaryChart);
  const { selectors } = useReportBuilderContext();
  const processedMetrics = selectors.selectSummaryMetricsProcessed;

  return (
    <Box padding="400" backgroundColor="gray.1000">
      <Grid>
        <Grid.Column sm={3}>
          <LabelValue dark>
            <LabelValue.Label>Date</LabelValue.Label>

            <LabelValue.Value>
              <Unit value={date} />
            </LabelValue.Value>
          </LabelValue>
        </Grid.Column>

        <Grid.Column sm={9}>
          <Inline space="600">
            {chart.aggregateData.map(({ key, label, value, unit }) => {
              const stroke = processedMetrics.find(({ key: newKey }) => {
                return newKey === key;
              })?.stroke;

              return (
                <Box marginRight="600" key={key}>
                  <LabelValue dark>
                    <LabelValue.Label>{label}</LabelValue.Label>

                    <LabelValue.Value>
                      <Box display="flex" alignItems="center">
                        {stroke && <LegendCircle marginRight="200" color={stroke} />}
                        <Unit value={value} unit={unit} />
                      </Box>
                    </LabelValue.Value>
                  </LabelValue>
                </Box>
              );
            })}
          </Inline>
        </Grid.Column>
      </Grid>
    </Box>
  );
}
