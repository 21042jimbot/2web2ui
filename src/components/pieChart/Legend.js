import React from 'react';
import PropTypes from 'prop-types';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import { Grid } from 'src/components/matchbox';
import LegendItem from './LegendItem';
import OGStyles from './Legend.module.scss';
import hibanaStyles from './LegendHibana.module.scss';

const Legend = ({
  headerData,
  primaryData,
  secondaryData,
  onMouseOver,
  onMouseOut,
  onClick,
  hoveredItem,
}) => {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);
  const hoveredDataSet = hoveredItem && hoveredItem.dataSet;

  const primaryLegend = primaryData.map((item, i) => (
    <LegendItem
      key={i}
      onMouseOver={() => onMouseOver(item, 'primary')}
      onMouseOut={onMouseOut}
      onClick={() => onClick(item)}
      hovered={hoveredDataSet === 'primary' && hoveredItem.index === i}
      otherHovered={
        hoveredItem &&
        ((hoveredDataSet === 'primary' && hoveredItem.index !== i) || hoveredDataSet !== 'primary')
      }
      {...item}
    />
  ));

  const secondaryLegend = secondaryData ? (
    <Grid.Column>
      {secondaryData.map((item, i) => (
        <LegendItem
          key={i}
          onMouseOver={() => onMouseOver(item, 'secondary')}
          onMouseOut={onMouseOut}
          onClick={() => onClick(item)}
          hovered={hoveredDataSet === 'secondary' && hoveredItem.index === i}
          otherHovered={
            hoveredItem &&
            ((hoveredDataSet === 'secondary' && hoveredItem.index !== i) ||
              hoveredDataSet !== 'secondary')
          }
          {...item}
        />
      ))}
    </Grid.Column>
  ) : null;

  const header = headerData ? headerData.map((item, i) => <LegendItem key={i} {...item} />) : null;

  return (
    <div>
      <div className={styles.LegendHeader}>{header}</div>
      <Grid>
        <Grid.Column>{primaryLegend}</Grid.Column>
        {secondaryLegend}
      </Grid>
    </div>
  );
};

Legend.propTypes = {
  headerData: PropTypes.array,
  primaryData: PropTypes.array,
  secondaryData: PropTypes.array,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func,
  onClick: PropTypes.func,
  hoveredItem: PropTypes.object,
};

Legend.defaultProps = {
  primaryData: [],
};

Legend.displayName = 'PieChart.Legend';
export default Legend;
