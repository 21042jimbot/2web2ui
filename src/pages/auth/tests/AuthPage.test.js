import { shallow } from 'enzyme';
import React from 'react';

import { AuthPage } from '../AuthPage';
import config from 'src/config';

describe('AuthPage tests', () => {
  const baseProps = {
    loggedIn: false,
    tfaEnabled: false,
    tfaRequired: false,
    authenticate: jest.fn()
  };

  function subject(props) {
    return shallow(<AuthPage {...baseProps} {...props} />);
  }

  it('renders correctly', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('should show link to join when has_signup feature flag exists', () => {
    config.featureFlags = { has_signup: true };
    expect(subject()).toMatchSnapshot();
  });

  it('should call authenticate with correct fields when submitting', () => {
    const wrapper = subject();
    const instance = wrapper.instance();
    instance.loginSubmit({ username: 'foo', password: 'pw', rememberMe: true });
    expect(instance.props.authenticate).toHaveBeenCalledWith('foo', 'pw', true);
  });

  it('should redirect after login', () => {
    expect(subject({ loggedIn: true })).toMatchSnapshot();
  });

  it('should redirect to TFA iff enabled', () => {
    expect(subject({ tfaEnabled: true })).toMatchSnapshot();
  });

  it('should redirect to enable-tfa iff required', () => {
    expect(subject({ tfaRequired: true })).toMatchSnapshot();
  });

  it('should process authenticate if username/token passed in', () => {
    const wrapper = subject({ username: 'its-me', access_token: 'bigTOKEN' });
    expect(wrapper.instance().props.authenticate).toHaveBeenCalledWith('its-me', null, false, 'bigTOKEN');
  });
});
