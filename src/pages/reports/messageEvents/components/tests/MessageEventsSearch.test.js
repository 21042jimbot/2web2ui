import { shallow } from 'enzyme';
import React from 'react';
import { MessageEventsSearchComponent as MessageEventsSearch } from '../MessageEventsSearch';
import styles from '../MessageEventsSearch.module.scss';

describe('Component: MessageEventsSearch', () => {
  let props;
  let wrapper;
  let instance;

  beforeEach(() => {
    const testDate = new Date('2018-02-15T12:00:00Z');
    props = {
      getMessageEvents: jest.fn(),
      search: {
        dateOptions: { from: testDate, to: testDate },
        recipients: [],
      },
      loading: false,
      refreshMessageEventsDateRange: jest.fn(),
      addFilters: jest.fn(),
      updateMessageEventsSearchOptions: jest.fn(),
      now: testDate,
      searchOptions: {},
      location: {},
      styles: styles,
    };
    wrapper = shallow(<MessageEventsSearch {...props} />);
    instance = wrapper.instance();
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('getInvalidAddresses', () => {
    it('detect invalid email addresses correctly', () => {
      expect(instance.getInvalidAddresses(['email@domain.com', 'email2m'])).toEqual(['email2m']);
      expect(instance.getInvalidAddresses(['abc'])).toEqual(['abc']);
      expect(instance.getInvalidAddresses([''])).toEqual([]);
      expect(instance.getInvalidAddresses(['email@domain.com'])).toEqual([]);
    });
  });

  describe('recipients field', () => {
    it('should update recipients on blur', () => {
      const event = {
        target: {
          value: '',
        },
      };

      event.target.value = 'email@domain.com';
      wrapper.find('TextField').simulate('blur', event);
      expect(props.addFilters).toHaveBeenLastCalledWith({
        recipients: ['email@domain.com'],
      });

      event.target.value = 'email1@domain.com , email2@domain.com';
      wrapper.find('TextField').simulate('blur', event);
      expect(props.addFilters).toHaveBeenLastCalledWith({
        recipients: ['email1@domain.com', 'email2@domain.com'],
      });
      expect(event.target.value).toBe('');
    });

    it('does not refresh on invalid recipient', () => {
      const event = {
        target: {
          value: 'abc',
        },
      };

      // Single invalid
      expect(wrapper.find('TextField').props().error).toBe(null);
      wrapper.find('TextField').simulate('blur', event);
      expect(props.addFilters).not.toHaveBeenCalled();
      expect(event.target.value).toBe('abc');
      expect(wrapper.find('TextField').props().error).toBe('abc is not a valid email address');

      // Multiple invalid
      wrapper.find('TextField').simulate('blur', { target: { value: 'abc, 123' } });
      expect(props.addFilters).not.toHaveBeenCalled();
      expect(wrapper.find('TextField').props().error).toBe(
        'abc, 123 are not valid email addresses',
      );

      // Clears error
      wrapper.find('TextField').simulate('blur', { target: { value: 'abc@123.com' } });
      expect(wrapper.find('TextField').props().error).toBe(null);
    });

    it('should clear error on focus', () => {
      wrapper.setState({ recipientError: 'error' });
      expect(wrapper.find('TextField').props().error).toBe('error');
      wrapper.find('TextField').simulate('focus');
      expect(wrapper.find('TextField').props().error).toBe(null);
    });

    it('should update recipients on enter', () => {
      const event = {
        key: 'Enter',
        target: {
          value: 'email@domain.com',
        },
      };

      wrapper.find('TextField').simulate('keyDown', event);
      expect(props.addFilters).toHaveBeenLastCalledWith({
        recipients: ['email@domain.com'],
      });
      expect(event.target.value).toBe('');
    });
  });
});
