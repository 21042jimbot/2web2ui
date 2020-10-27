import { shallow, mount } from 'enzyme';
import React from 'react';
import config from 'src/config';
import TestApp from 'src/__testHelpers__/TestApp';
import VerifyEmail from '../VerifyEmail';
import { SetupSending } from '../SetupSending';

// Snapshot note - Fragments that are not directly rendered will show 'UNDEFINED'
// Will be fixed in a future jest update (https://github.com/facebook/jest/pull/5816)

describe('Component: SetupSending', () => {
  let wrapper;
  let props;
  let status;

  beforeEach(() => {
    jest.resetModules();

    status = {
      ownership_verified: false,
      dkim_status: null,
    };
    props = {
      domain: {
        id: 'xyz.com',
        subaccount_id: 999,
        dkimHostname: 'scph0118._domainkey.xyz.com',
        dkimValue:
          'v=DKIM1; k=rsa; h=sha256; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC7J/mQAVP9pynvD79opV/GD495pJWTWmHaEMymBO55y52gu2D23/CHbLys0KXszTAPOVS9x3HdRByeE1jIx41sZkWwDzxcyZH2NP5Mw3zNQWO4CqSGqrVPuukjIy5N3jmZnJ/V3IOkKnC3A+j76iIG42cVOgzoekbM3ZXSfwag+wIDAQAB',
        status,
      },
      verifyDkimLoading: false,
      verifyDkim: jest.fn(() =>
        Promise.resolve({ ownership_verified: true, dkim_status: 'valid' }),
      ),
      showAlert: jest.fn(),
    };

    config.featureFlags.allow_mailbox_verification = true;
    wrapper = shallow(<SetupSending {...props} />);
  });

  it('renders correctly for unverified DKIM and invalid ownership with mailbox verification enabled', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly when ownership and DKIM are verified', () => {
    const testProps = (props.domain.status = { dkim_status: 'valid', ownership_verified: true });
    wrapper.setProps(testProps);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly for unverified DKIM and invalid ownership with mailbox verification disabled', () => {
    config.featureFlags.allow_mailbox_verification = false;
    const wrapper = shallow(<SetupSending {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly when ownership is valid and DKIM is unverified', () => {
    props.domain.status = { dkim_status: 'invalid', ownership_verified: true };
    wrapper.setProps(props);
    expect(wrapper).toMatchSnapshot();
  });

  it('disables the verification button while submitting', () => {
    wrapper.setProps({ verifyDkimLoading: true });
    expect(wrapper.find('SetupInstructionPanel')).toHaveProp('isVerifying', true);
  });

  it('should call verifyDkim on click', () => {
    const wrapper = mount(
      <TestApp>
        <SetupSending {...props} />
      </TestApp>,
    );
    wrapper.find('button#verify-dkim').simulate('click');
    expect(props.verifyDkim).toHaveBeenCalledTimes(1);
  });

  it('should open verify with email modal', () => {
    const wrapper = shallow(<SetupSending {...props} />);
    wrapper.find('#verify-with-email').simulate('click');
    expect(wrapper.state('open')).toEqual(true);
  });

  it('should close verify by email modal', () => {
    const wrapper = shallow(<SetupSending {...props} />);
    wrapper.setState({ open: true }); // open modal
    wrapper.find(VerifyEmail).simulate('cancel');
    expect(wrapper.state('open')).toEqual(false);
  });

  describe('verifyDomain', () => {
    let instance;
    beforeEach(() => {
      instance = wrapper.instance();
    });

    it('verifies domain and alerts when verification successful', async () => {
      props.verifyDkim.mockReturnValue(Promise.resolve({ dkim_status: 'valid' }));
      await instance.verifyDomain();
      expect(props.verifyDkim).toHaveBeenCalledTimes(1);
      expect(props.verifyDkim).toHaveBeenCalledWith({ id: 'xyz.com', subaccount: 999 });
      expect(props.showAlert).toHaveBeenCalledTimes(1);
      expect(props.showAlert).toHaveBeenCalledWith({
        type: 'success',
        message: 'You have successfully verified DKIM record of xyz.com',
      });
    });

    it('alerts error when verification req is successful but verification is failed', async () => {
      props.verifyDkim.mockReturnValue(
        Promise.resolve({ dkim_status: 'invalid', dns: { dkim_error: 'nope!' } }),
      );
      await instance.verifyDomain();
      expect(props.verifyDkim).toHaveBeenCalledTimes(1);
      expect(props.verifyDkim).toHaveBeenCalledWith({ id: 'xyz.com', subaccount: 999 });
      expect(props.showAlert).toHaveBeenCalledTimes(1);
      expect(props.showAlert).toHaveBeenCalledWith({
        type: 'error',
        message: 'Unable to verify DKIM record of xyz.com. nope!',
      });
    });
  });
});
