import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { tokens } from '@sparkpost/design-tokens-hibana';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Rectangle,
  Text,
} from 'recharts';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import TooltipWrapper from 'src/components/charts/Tooltip';
import OGStyles from './DivergingBar.module.scss';
import hibanaStyles from './DivergingBarHibana.module.scss';

function DivergingBar(props) {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);

  const getData = () => {
    const { data, xKey, positiveFill, negativeFill } = props;
    return (
      data && data.map(item => ({ ...item, fill: item[xKey] > 0 ? positiveFill : negativeFill }))
    );
  };

  const getHeight = () => {
    const { data, barHeight } = props;
    return data && data.length * barHeight;
  };

  const renderBar = ({ key, background, payload, ...props }) => {
    const { selected, yKey } = props;
    const width = background.x + background.width;
    return (
      <g>
        <rect
          {...props}
          key={`${key}-bg`}
          x={0}
          x1={0}
          x2={width}
          width={width}
          fill={tokens.color_blue_400}
          opacity={selected && selected === payload[yKey] ? 0.3 : 0}
        />
        <Rectangle key={key} {...props} />
      </g>
    );
  };

  const renderYTick = ({ payload, ...props }) => {
    const { data, selected, yKey, yLabel } = props;
    const match = _.find(data, [yKey, selected]) || {};
    const label = yLabel ? yLabel(payload) : payload.value;

    if (payload.value === match[yKey]) {
      return (
        <Text {...props} fill={tokens.colors_gray_800}>
          {label}
        </Text>
      );
    }

    return <Text {...props}>{label}</Text>;
  };

  const { tooltipContent, onClick, width, xDomain, xKey, yKey } = props;

  return (
    <ResponsiveContainer height={getHeight()} width={width} className={styles.DivergingBar}>
      <BarChart data={getData()} layout="vertical" barCategoryGap={2}>
        <CartesianGrid
          horizontal={false}
          shapeRendering="crispEdges"
          stroke={tokens.color_gray_400}
        />
        <Bar
          cursor="pointer"
          dataKey={xKey}
          onClick={onClick}
          isAnimationActive={false}
          shape={renderBar}
          minPointSize={1}
        />
        <YAxis
          type="category"
          tickLine={false}
          axisLine={false}
          interval={0}
          dataKey={yKey}
          padding={{ bottom: 5 }}
          tick={renderYTick}
          width={160}
        />
        <XAxis
          hide
          type="number"
          tickLine={false}
          domain={xDomain}
          dataKey={xKey}
          shapeRendering="crispEdges"
          ticks={[0]}
        />
        <Tooltip
          cursor={false}
          isAnimationActive={false}
          content={<TooltipWrapper children={tooltipContent} />}
          position={{ x: 0, y: 0 }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

DivergingBar.propTypes = {
  negativeFill: PropTypes.string,
  onClick: PropTypes.func,
  positiveFill: PropTypes.string,
  tooltipContent: PropTypes.func,
  xDomain: PropTypes.array,
  xKey: PropTypes.string,
  yKey: PropTypes.string,
  yLabel: PropTypes.func,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

DivergingBar.defaultProps = {
  barHeight: 35,
  xDomain: ['dataMin', 'dataMax'],
  xKey: 'value',
  yKey: 'label',
  width: '99%',
  negativeFill: tokens.color_red_700,
  positiveFill: tokens.color_green_700,
};

export default DivergingBar;
