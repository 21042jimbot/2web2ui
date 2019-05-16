import React from 'react';
import Confirmation from '../Confirmation';
import { shallow } from 'enzyme';
import Brightback from 'src/components/brightback/Brightback';

describe('Confirmation: ', () => {
  let wrapper;
  let props;
  const getButton = (props = {}) => wrapper.find(Brightback).props().render(props);

  const current = {
    monthly: 100,
    volume: 1000,
    code: 'onehundred',
    includesIp: true
  };

  const olderPlan = {
    monthly: 100,
    volume: 1000,
    code: 'oldhundred',
    status: 'deprecated'
  };

  const upgrade = {
    monthly: 200,
    volume: 2000,
    code: 'twohundred'
  };

  const upgradeWithIP = {
    monthly: 200,
    volume: 2000,
    code: 'twohundred',
    includesIp: true
  };

  const downgrade = {
    monthly: 50,
    volume: 500,
    code: 'fifty',
    includesIp: false
  };

  const free = {
    monthly: 0,
    volume: 100,
    code: 'zero',
    isFree: true
  };

  beforeEach(() => {
    props = {
      current,
      selected: current,
      billingEnabled: true
    };

    wrapper = shallow(<Confirmation {...props} />);
  });

  it('should render with nothing selected', () => {
    expect(wrapper).toMatchSnapshot();
    expect(getButton()).toMatchSnapshot();
  });

  it('should render correctly with an upgrade', () => {
    wrapper.setProps({ selected: upgrade, billingEnabled: true });
    expect(wrapper).toMatchSnapshot();
    expect(getButton()).toMatchSnapshot();
  });

  it('should render correctly for an upgrade effectively immediately', () => {
    wrapper.setProps({ current: free, selected: upgrade, billingEnabled: true });
    expect(wrapper).toMatchSnapshot();
    expect(getButton()).toMatchSnapshot();
  });

  it('should render correctly with a downgrade', () => {
    wrapper.setProps({ selected: downgrade, billingEnabled: true });
    expect(wrapper).toMatchSnapshot();
    expect(getButton()).toMatchSnapshot();
  });

  it('should render correctly with a downgrade to free', () => {
    wrapper.setProps({ selected: free, billingEnabled: true });
    expect(wrapper).toMatchSnapshot();
    expect(getButton({ enabled: true, to: 'redirect' })).toMatchSnapshot();
  });

  it('should render correctly with an upgrade with IP', () => {
    wrapper.setProps({ current: free, selected: upgradeWithIP, billingEnabled: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly when billing not enabled', () => {
    wrapper.setProps({ billingEnabled: false });
    expect(wrapper).toMatchSnapshot();
  });

  describe('Deprecated Plan Warning', () => {
    it('should render null if selected plan is the same as current', () => {
      expect(wrapper.find({ name: 'deprecated-warning' })).not.toExist();
    });

    it('should render null if current plan is not deprecated', () => {
      wrapper.setProps({ current, selected: upgrade });
      expect(wrapper.find({ name: 'deprecated-warning' })).not.toExist();
    });

    it('should render warning if current plan has status deprecated', () => {
      wrapper.setProps({ current: olderPlan, selected: upgrade });
      expect(wrapper.find({ name: 'deprecated-warning' })).toExist();
    });
  });
});
