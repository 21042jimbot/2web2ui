import { shallow } from 'enzyme';
import React from 'react';
import cases from 'jest-in-case';
import { Grid } from 'src/components/matchbox';
import { EvaluatorFields } from '../EvaluatorFields';
import { FORM_NAME } from '../../../constants/formConstants';

describe('Evaluator Fields Component', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      metric: 'health_score',
      disabled: false,
      change: jest.fn(),
      value: 50,
      source: 'raw',
      operator: 'gt',
    };

    wrapper = shallow(<EvaluatorFields {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('does not render source if it is only 1 option', () => {
    wrapper.setProps({ metric: 'block_bounce_rate' });
    expect(wrapper.find({ name: 'source' })).not.toExist();
  });

  it('does not render operator if it is only 1 option', () => {
    wrapper.setProps({ source: 'week_over_week' });
    expect(wrapper.find({ name: 'operator' })).not.toExist();
  });

  it('does not render operator nor source if they each only have 1 option', () => {
    wrapper.setProps({ metric: 'monthly_sending_limit' });
    expect(wrapper.find({ name: 'source' })).not.toExist();
    expect(wrapper.find({ name: 'operator' })).not.toExist();
  });

  it('renders week over week metric without operator field and grows slider size', () => {
    wrapper.setProps({ source: 'week_over_week' });
    expect(wrapper).not.toHaveTextContent('Comparison');
    expect(wrapper.find(Grid.Column).at(1)).toHaveProp('md', 9);
  });

  it('renders monthly sending limit without source and operator fields and grows slider size', () => {
    wrapper.setProps({ metric: 'monthly_sending_limit' });
    expect(wrapper).not.toHaveTextContent('Evaluated');
    expect(wrapper).not.toHaveTextContent('Comparison');
    expect(wrapper.find(Grid.Column).at(0)).toHaveProp('md', 12);
  });

  it('changes operator to gt when selecting WOW or DOD', () => {
    wrapper.find({ name: 'source' }).simulate('change', { target: { value: 'week_over_week' } });
    expect(props.change).toHaveBeenCalledWith(FORM_NAME, 'operator', 'gt');
  });

  describe('slider recommended tick changes with', () => {
    const formCases = {
      'metric change': {
        prop: { metric: 'block_bounce_rate' },
        recommendedValue: 20,
      },
      'operator change': {
        prop: { metric: 'health_score', source: 'raw', operator: 'gt' },
        recommendedValue: 70,
      },
      'source change': {
        prop: { metric: 'health_score', source: 'week_over_week' },
        recommendedValue: 10,
      },
    };

    cases(
      'should be correct tick',
      ({ prop, recommendedValue }) => {
        wrapper.setProps(prop);
        expect(wrapper.find({ id: 'alertEvaluatorValue' }).prop('ticks')).toMatchObject({
          [recommendedValue]: 'Recommended',
        });
      },
      formCases,
    );
  });
});
