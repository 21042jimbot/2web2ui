import React from 'react';
import { shallow } from 'enzyme';
import PlanPrice from '../PlanPrice';
import styles from './PlanPrice.module.scss';
import useHibanaOverride from 'src/hooks/useHibanaOverride';

jest.mock('src/hooks/useHibanaOverride');
useHibanaOverride.mockReturnValue(styles);
describe('PlanPrice', () => {
  let wrapper;
  let plan;

  beforeEach(() => {
    plan = {
      monthly: 9,
      volume: 50000,
      overage: 0.75,
    };

    const props = {
      plan,
    };

    wrapper = shallow(<PlanPrice {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with overage', () => {
    wrapper.setProps({ showOverage: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('allows class name overriding', () => {
    wrapper.setProps({ className: 'abcd-class' });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with hourly plans', () => {
    delete plan.monthly;
    plan.hourly = 0.012;

    wrapper.setProps({ plan });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders free ip', () => {
    plan.includesIp = true;
    wrapper.setProps({ plan, showIp: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders free ip and overage correct', () => {
    plan.includesIp = true;
    wrapper.setProps({ plan, showIp: true, showOverage: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders nothing when no plan', () => {
    wrapper.setProps({ plan: {} });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly for 30 day free plan', () => {
    const free15kPlan = {
      ...plan,
      monthly: 0,
      isFree: true,
      code: 'free15K-banana',
    };

    wrapper.setProps({ plan: free15kPlan });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly for eternal free plan', () => {
    const eternalFree = {
      ...plan,
      monthly: 0,
      isFree: true,
      code: 'free500-banana',
    };

    wrapper.setProps({ plan: eternalFree });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly for CSM inclusion', () => {
    plan.includesCsm = true;
    wrapper.setProps({ plan, showCsm: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders flat discount', () => {
    wrapper.setProps({ selectedPromo: { discount_amount: 5 } });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as 0 if flat discount is greater than price', () => {
    wrapper.setProps({ selectedPromo: { discount_amount: 15 } });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders percent discount', () => {
    wrapper.setProps({ selectedPromo: { discount_percentage: 25 } });
    expect(wrapper).toMatchSnapshot();
  });
});
