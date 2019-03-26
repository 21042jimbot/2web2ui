import { shallow } from 'enzyme';
import React from 'react';
import SubaccountSection from 'src/components/subaccountSection';

import Form from '../Form';

describe('Template Form', () => {
  let wrapper;

  beforeEach(() => {
    const props = {
      domains: [
        { domain: 'test.com' },
        { domain: 'verified.com' }
      ],
      listDomains: jest.fn(),
      change: jest.fn(),
      newTemplate: false,
      readOnly: false,
      hasSubaccounts: true,
      canViewSubaccount: true
    };

    wrapper = shallow(<Form {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.instance().props.listDomains).toHaveBeenCalled();
    expect(wrapper.find(SubaccountSection)).toExist();
  });

  it('should not render subaccount fields if has subaccounts', () => {
    wrapper.setProps({ hasSubaccounts: false });
    expect(wrapper.find(SubaccountSection)).not.toExist();
  });

  it('should not render subaccount fields if subaccount user', () => {
    wrapper.setProps({ canViewSubaccount: false });
    expect(wrapper.find(SubaccountSection)).not.toExist();
  });

  it('should disable fields for read-only users', () => {
    wrapper.setProps({ readOnly: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('should not handle ID fill on edit', () => {
    wrapper.find('Field').at(0).simulate('change', { target: { value: 'test 1 2!' }});
    expect(wrapper.instance().props.change).not.toHaveBeenCalled();
  });

  it('should handle ID fill', () => {
    wrapper.setProps({ newTemplate: true });
    wrapper.find('Field').at(0).simulate('change', { target: { value: 'test 1 2!' }});
    expect(wrapper.find('Field').at(1).props().helpText).toEqual('A Unique ID for your template, we\'ll fill this in for you.');
    expect(wrapper.instance().props.change).toHaveBeenCalledWith(wrapper.instance().props.name, 'id', 'test-1-2');
  });

  it('should produce the right help text values for the email typeahead', () => {
    // Domains are available
    expect(wrapper.find('Field').at(3).props().helpText).toEqual(null);

    // No domains available
    wrapper.setProps({ domains: []});
    expect(wrapper.find('Field[name="content.from.email"]'))
      .toHaveProp('helpText', 'You do not have any verified sending domains to use.');

    // No domains available for subaccount
    wrapper.setProps({ domains: [], subaccountId: 101 });
    expect(wrapper.find('Field[name="content.from.email"]'))
      .toHaveProp('helpText', 'The selected subaccount does not have any verified sending domains.');

    wrapper.setProps({ domainsLoading: true });
    expect(wrapper.find('Field[name="content.from.email"]')).toHaveProp('helpText', null);
  });

  it('should handle id validating correctly', () => {
    // Should not validate on edit/published
    expect(wrapper.find('Field').at(1).props().validate).toEqual(null);

    // Should validate on create
    wrapper.setProps({ newTemplate: true });
    expect(wrapper.find('Field').at(1).props().validate).toMatchSnapshot();
  });

  it('correctly parses toggle value into boolean', () => {
    const parse = wrapper.instance().parseToggle;
    expect(parse('')).toEqual(false);
    expect(parse(false)).toEqual(false);
    expect(parse('true')).toEqual(true);
    expect(parse(true)).toEqual(true);
  });
});
