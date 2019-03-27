import { shallow } from 'enzyme';
import React from 'react';
import BarChart from '../BarChart';

describe('BarChart Component', () => {
  let wrapper;
  let props;
  const normal = [{ value: 2, date: '2011-01-01' }];
  const stacked = [
    { ab: 2, cd: 3, date: '2011-01-01' },
    { ab: 5, cd: 8, date: '2011-01-02' }
  ];
  const yKeys = [
    { key: 'ab', fill: 'blue' },
    { key: 'cd', fill: 'red' }
  ];

  beforeEach(() => {
    props = {
      timeSeries: normal,
      xKey: 'date',
      yRange: [0,100],
      height: 50,
      width: 100,
      onClick: jest.fn(),
      tooltipContent: jest.fn(),
      fill: '#fill',
      activeFill: '#activeFill'
    };
    wrapper = shallow(<BarChart {...props}/>);
  });

  it('renders a normal bar chart correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a normal bar chart with correct fill for selected/hovered threshold events', () => {
    wrapper.setProps({ selected: '2011-01-01', yKey: 'health_score', timeSeries: [{ health_score: 75, ranking: 'warning', date: '2011-01-01' }]});
    const payload = { fill: '#fill', health_score: 75, ranking: 'warning', date: '2011-01-01' };
    expect(wrapper.find('Bar').at(0).props().shape(payload).props).toMatchSnapshot();
  });

  it('renders a normal bar chart with correct fill for non-selected/hovered threshold events', () => {
    wrapper.setProps({ selected: undefined, yKey: 'health_score', timeSeries: [{ health_score: 75, ranking: 'warning', date: '2011-01-01' }]});
    const payload = { fill: '#fill', health_score: 75, ranking: 'warning', date: '2011-01-01' };
    expect(wrapper.find('Bar').at(0).props().shape(payload).props).toMatchSnapshot();
  });

  it('renders a normal bar chart with correct fill for selected/hovered non-threshold events', () => {
    wrapper.setProps({ selected: '2011-01-01', yKey: 'injections', timeSeries: [{ injections: 75, date: '2011-01-01' }]});
    const payload = { fill: '#fill', injections: 75, ranking: 'warning', date: '2011-01-01' };
    expect(wrapper.find('Bar').at(0).props().shape(payload).props).toMatchSnapshot();
  });

  it('renders a normal bar chart with correct fill for non-selected/hovered non-threshold events', () => {
    wrapper.setProps({ selected: undefined, yKey: 'injections', timeSeries: [{ injections: 75, date: '2011-01-01' }]});
    const payload = { fill: '#fill', injections: 75, ranking: 'warning', date: '2011-01-01' };
    expect(wrapper.find('Bar').at(0).props().shape(payload).props.fill).toEqual('#fill');
  });

  it('renders a stacked bar chart correctly', () => {
    wrapper.setProps({ timeSeries: stacked, yKeys });
    const bars = wrapper.find('Bar').slice(1);
    expect(bars).toMatchSnapshot();
  });

  it('renders background bars with no opacity if unselected', () => {
    const payload = { payload: { date: '2011-01-01' }, test: 'test' };
    expect(wrapper.find('Bar').at(0).props().shape(payload)).toMatchSnapshot();
  });

  it('renders background bars with opacity if selected', () => {
    wrapper.setProps({ selected: '2011-01-01' });
    const payload = { payload: { date: '2011-01-01' }, test: 'test' };
    expect(wrapper.find('Bar').at(0).props().shape(payload)).toMatchSnapshot();
  });

  it('should handle click on all bars', () => {
    wrapper.setProps({ timeSeries: stacked, yKeys });
    wrapper.find('Bar').forEach((n) => n.simulate('click'));
    expect(props.onClick).toHaveBeenCalledTimes(3);
  });

  it('should display x reference lines', () => {
    wrapper.setProps({ xAxisRefLines: [{ x: '2011-01-01', stroke: 'green', strokeWidth: 2 }, { x: '2011-01-03', stroke: 'red', strokeWidth: 2 }]});
    expect(wrapper).toMatchSnapshot();
  });

  it('should display y reference lines', () => {
    wrapper.setProps({ yAxisRefLines: [{ y: 80, stroke: 'green', strokeWidth: 2 }, { y: 55, stroke: 'red', strokeWidth: 2 }]});
    expect(wrapper).toMatchSnapshot();
  });
});
