import React from 'react';
import { Table } from '../Table';
import { shallow } from 'enzyme';
import _ from 'lodash';

describe('Summary Table', () => {

  let wrapper;

  const props = {
    addFilters: jest.fn(),
    _getTableData: jest.fn(),
    refresh: jest.fn(),
    metrics: [
      { key: 'metric_1' },
      { key: 'metric_2', unit: 'millisecond' }
    ],
    groupBy: 'domain',
    typeaheadCache: [
      { type: 'Subaccount', id: 555, value: 'sub 1 name' }
    ],
    tableData: [],
    tableLoading: false,
    hasSubaccounts: false,
    searchOptions: {
      filters: []
    }
  };

  const data = [
    { subaccount_id: 0, metric_1: 123, metric_2: 12345 },
    { subaccount_id: 555, metric_1: 123, metric_2: 12345 },
    { subaccount_id: 1010, metric_1: 123, metric_2: 12345 }
  ];

  beforeEach(() => {
    wrapper = shallow(<Table {...props} />);
  });

  it('should render with no data', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render with data', () => {
    wrapper.setProps({ tableData: data });
    expect(wrapper.find('TableCollection')).toMatchSnapshot();
  });

  it('should render loading', () => {
    wrapper.setProps({ tableLoading: true });
    expect(wrapper.find('Loading')).toHaveLength(1);
  });

  it('should render row data', () => {
    const snaps = [];
    wrapper.setProps({ groupBy: 'subaccount' });
    const func = wrapper.instance().getRowData();
    const results = _.flatten(data.map(func));

    _.each(results, (item, i) => {
      snaps.push(shallow(item));
    });

    expect(snaps).toMatchSnapshot();
  });

  it('should render with aggregate data', () => {
    const aggData = [
      { metric_1: 987, metric_2: 654, metric_3: 321 }
    ];
    const metrics = [
      { key: 'metric_1' },
      { key: 'metric_2', unit: 'millisecond' },
      { key: 'metric_3' }
    ];

    wrapper.setProps({ metrics, groupBy: 'aggregate', tableData: aggData });
    expect(wrapper.find('TableCollection')).toMatchSnapshot();
  });
});
