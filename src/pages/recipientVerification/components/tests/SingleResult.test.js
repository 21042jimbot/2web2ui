import React from 'react';
import { shallow } from 'enzyme';
import SingleResult from '../SingleResult';

describe('SingleResult', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      singleResults: {
        email: 'test@test.com',
        valid: true
      }
    };

    wrapper = shallow(<SingleResult {...props} />);
  });

  it('renders correctly when valid', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly when not valid', () => {
    wrapper.setProps({
      singleResults: {
        email: 'test@fail.com',
        valid: false,
        reason: 'invalid domain'
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
});
