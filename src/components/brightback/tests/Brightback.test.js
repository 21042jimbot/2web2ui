import React from 'react';
import { Brightback } from '../Brightback';
import { shallow } from 'enzyme';

describe('Brightback Component', () => {
  const props = {
    render: jest.fn((renderProps) => (
      <div {...renderProps}>test</div>
    )),
    condition: true,
    enabled: true,
    prepBrightback: jest.fn((a) => a),
    data: {
      test: 'data'
    },
    valid: true,
    url: 'http://redirect-to-brightback.com'
  };

  it('should render correctly when enabled and with valid account data', () => {
    const wrapper = shallow(<Brightback {...props}/>);
    expect(wrapper).toMatchSnapshot();
    expect(props.prepBrightback).toHaveBeenCalledWith(props.data);
  });

  it('should pass correct props without valid account data', () => {
    const wrapper = shallow(<Brightback {...props} valid={false} />);
    expect(wrapper).toMatchSnapshot();
    expect(props.prepBrightback).toHaveBeenCalledWith(props.data);
  });

  it('should pass correct props when passed condition is false', () => {
    const wrapper = shallow(<Brightback {...props} condition={false} />);
    expect(wrapper).toMatchSnapshot();
    expect(props.prepBrightback).toHaveBeenCalledWith(props.data);
  });

  it('should not run prep brightback if it is disabled', () => {
    shallow(<Brightback {...props} enabled={false}/>);
    expect(props.prepBrightback).not.toHaveBeenCalled();
  });
});
