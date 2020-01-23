import {
  getDayLines,
  getTimeTickFormatter,
  getTooltipLabelFormatter,
  getLineChartFormatters,
  formatYAxisPercent,
} from '../chart';
import * as metrics from '../metrics';
import moment from 'moment';

jest.mock('../metrics');

function getDate(hours, date = '2017-06-15T12:00') {
  const d = moment(date);
  d.hours(hours);
  return d;
}

function getTimestampWithFixedHour(date, hour) {
  const d = getDate(hour, date);
  return d.valueOf();
}

describe('Helper: chart', () => {
  let data;

  beforeEach(() => {
    data = [
      { ts: getTimestampWithFixedHour('2017-01-01T12:00', 12) },
      { ts: getTimestampWithFixedHour('2017-01-02T00:00', 0) },
      { ts: getTimestampWithFixedHour('2017-01-02T12:00', 12) },
      { ts: getTimestampWithFixedHour('2017-01-03T00:00', 0) },
      { ts: getTimestampWithFixedHour('2017-01-03T00:15', 0) },
      { ts: getTimestampWithFixedHour('2017-01-03T12:00', 12) },
    ];
  });

  describe('getDayLines', () => {
    it('should return an empty array if precision type is not "hours"', () => {
      metrics.getPrecisionType = jest.fn(() => 'not-hours');
      const lines = getDayLines(data);
      expect(lines).toHaveLength(0);
    });

    it('should return an item for every 0-hour date', () => {
      metrics.getPrecisionType = jest.fn(() => 'hour');
      const lines = getDayLines(data);
      expect(lines).toHaveLength(3);
    });

    it('should ignore 0-hour dates in the first and last position', () => {
      metrics.getPrecisionType = jest.fn(() => 'hour');
      data[0] = getTimestampWithFixedHour('2017-01-01', 0);
      data[data.length - 1] = getTimestampWithFixedHour('2017-01-01', 0);
      const lines = getDayLines(data);
      expect(lines).toHaveLength(3);
    });
  });

  describe('getTimeTickFormatter', () => {
    it('should format an "hourly" tick', () => {
      const format = getTimeTickFormatter('hour');
      const formatted = format(getDate(12));
      expect(formatted).toEqual('12:00pm');
    });

    it('should format a "daily" tick for day precision', () => {
      const format = getTimeTickFormatter('day');
      const formatted = format(getDate(12));
      expect(formatted).toEqual('Jun 15th');
    });

    it('should format a "daily" tick for week precision', () => {
      const format = getTimeTickFormatter('week');
      const formatted = format(getDate(12));
      expect(formatted).toEqual('Jun 15th');
    });

    it('should format a "monthly" tick for month precision', () => {
      const format = getTimeTickFormatter('month');
      const formatted = format(getDate(12));
      expect(formatted).toEqual('Jun');
    });

    it('should return the same function for the same precision (memoized)', () => {
      const a = getTimeTickFormatter('hours');
      const b = getTimeTickFormatter('hours');
      const c = getTimeTickFormatter('days');

      expect(a).toBe(b);
      expect(a).not.toBe(c);
    });
  });

  describe('getTooltipLabelFormatter', () => {
    it('should format an "hourly" label', () => {
      const format = getTooltipLabelFormatter('hours');
      const formatted = format(getDate(16));
      expect(formatted).toEqual('Jun 15th at 4:00 PM');
    });

    it('should format a "non-hourly" label', () => {
      const format = getTooltipLabelFormatter('day');
      const formatted = format(getDate(16));
      expect(formatted).toEqual('June 15th');
    });

    it('should format a "weekly" label', () => {
      const format = getTooltipLabelFormatter('week');
      const formatted = format(getDate(16));
      expect(formatted).toEqual('Jun 15th - Jun 21st');
    });

    it('should format a "monthly" label', () => {
      const format = getTooltipLabelFormatter('month');
      const formatted = format(getDate(16));
      expect(formatted).toEqual('June 2017');
    });

    it('should memoize', () => {
      const a = getTooltipLabelFormatter('hours');
      const b = getTooltipLabelFormatter('hours');
      const c = getTooltipLabelFormatter('days');

      expect(a).toBe(b);
      expect(a).not.toBe(c);
    });
  });

  describe('getLineChartFormatters', () => {
    metrics.getPrecisionType = jest.fn(() => 'hours');
    expect(getLineChartFormatters()).toEqual({
      xTickFormatter: expect.any(Function),
      tooltipLabelFormatter: expect.any(Function),
    });
  });

  describe('formatYAxisPercent', () => {
    it('should format y axis percent labels correctly', () => {
      expect(formatYAxisPercent(12)).toEqual('12%');
      expect(formatYAxisPercent(1)).toEqual('1%');
      expect(formatYAxisPercent(0.051)).toEqual('0.051%');
      expect(formatYAxisPercent(0.0051)).toEqual('0.005%');
      expect(formatYAxisPercent(0.00051)).toEqual('0.001%');
    });
  });
});
