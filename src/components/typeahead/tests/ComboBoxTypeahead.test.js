import React, { useCallback } from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { useDebouncedCallback } from 'use-debounce';
import TestApp from 'src/__testHelpers__/TestApp';
import { ComboBoxTypeahead } from '../ComboBoxTypeahead';

jest.mock('use-debounce');

describe('ComboBoxTypeahead', () => {
  const subject = (props = {}) =>
    mount(
      <TestApp>
        <ComboBoxTypeahead
          value={[]}
          onChange={() => {}}
          results={[
            'apple',
            'banana',
            'blue ',
            'cauliflower',
            'grape',
            'grapefruit',
            'orange',
            'pineapple',
          ]}
          {...props}
        />
      </TestApp>,
    );

  const changeInputValue = (wrapper, nextValue) => {
    const fakeEvent = { target: { value: nextValue } };

    act(() => {
      // simulate a input value change
      // todo, `simulate('change', fakeEvent)` doesn't work
      wrapper.find('ComboBoxTextField').prop('onChange')(fakeEvent);
    });

    wrapper.update(); // ugh
  };

  const selectMenuItem = (wrapper, itemIndex) => {
    const fakeEvent = jest.fn();
    const menuItem = wrapper.find('ComboBoxMenu').prop('items')[itemIndex];

    act(() => {
      // click menu item to simulate selection
      menuItem.onClick(fakeEvent, menuItem.content);
    });

    wrapper.update(); // ugh
  };

  beforeEach(() => {
    // need to memoize with useCallback
    useDebouncedCallback.mockImplementation(fn => [useCallback(fn, [])]);
  });

  it('renders max number of menu items', () => {
    const wrapper = subject({ maxNumberOfResults: 5 });
    expect(wrapper.find('ComboBoxMenu').prop('items')).toHaveLength(5);
  });

  it('renders filtered menu items', () => {
    const wrapper = subject();
    changeInputValue(wrapper, 'grape');
    expect(wrapper.find('ComboBoxMenu').prop('items')).toHaveLength(2);
  });

  it('renders filtered menu items without selected items', () => {
    const wrapper = subject({ value: ['grape'] });
    changeInputValue(wrapper, 'grape');
    expect(wrapper.find('ComboBoxMenu').prop('items')).toHaveLength(1);
  });

  it('renders filtered menu items without exclusive items', () => {
    const wrapper = subject({
      value: ['B'],
      results: ['A', 'B', 'C'],
      isExclusiveItem: item => item === 'A',
    });

    expect(wrapper.find('ComboBoxMenu').prop('items')).toHaveLength(1);
  });

  it('does not render a menu when no matches', () => {
    const wrapper = subject();
    changeInputValue(wrapper, 'xyz');
    expect(wrapper.find('ComboBoxMenu')).toHaveProp('isOpen', false);
  });

  it('leaves menu open after a selection', () => {
    const wrapper = subject();
    selectMenuItem(wrapper, 0);
    expect(wrapper.find('ComboBoxMenu')).toHaveProp('isOpen', true);
  });

  it('closes menu when exclusive item is selected', () => {
    const wrapper = subject({
      results: ['My Example'],
      isExclusiveItem: item => item === 'My Example',
    });
    selectMenuItem(wrapper, 0);
    expect(wrapper.find('ComboBoxMenu')).toHaveProp('isOpen', false);
  });

  it('resets input value after a selection', () => {
    const wrapper = subject();
    changeInputValue(wrapper, 'app');
    expect(wrapper.find('ComboBoxTextField')).toHaveProp('value', 'app');
    selectMenuItem(wrapper, 0);
    expect(wrapper.find('ComboBoxTextField')).toHaveProp('value', '');
  });

  it('opens menu on focus', () => {
    const wrapper = subject();

    act(() => {
      // todo, `simulate('focus')` doesn't work
      wrapper.find('ComboBoxTextField').prop('onFocus')();
    });

    wrapper.update();

    expect(wrapper.find('ComboBoxMenu')).toHaveProp('isOpen', true);
  });

  it('disables text field', () => {
    const wrapper = subject({ disabled: true });
    expect(wrapper.find('ComboBoxTextField')).toHaveProp('disabled', true);
  });

  it('enabled read only mode for text field', () => {
    const wrapper = subject({ readOnly: true });
    expect(wrapper.find('ComboBoxTextField')).toHaveProp('readOnly', true);
  });

  it('enabled read only mode for text field when an exclusive item is selected', () => {
    const wrapper = subject({
      results: ['My Example'],
      isExclusiveItem: item => item === 'My Example',
    });
    selectMenuItem(wrapper, 0);
    expect(wrapper.find('ComboBoxTextField')).toHaveProp('readOnly', true);
  });

  it('renders placeholder message when no items have been selected', () => {
    const wrapper = subject({ placeholder: 'Do something!' });
    expect(wrapper.find('ComboBoxTextField')).toHaveProp('placeholder', 'Do something!');
  });

  it('does not render placeholder message when items have been selected', () => {
    const wrapper = subject({ value: ['apple'], placeholder: 'Do something!' });
    expect(wrapper.find('ComboBoxTextField')).toHaveProp('placeholder', '');
  });

  it('controls selected items from parent component', () => {
    const wrapper = subject();
    const selectedItems = ['apple', 'banana'];

    wrapper.setProps({ value: selectedItems });
    wrapper.update();

    expect(wrapper.find('ComboBoxTextField')).toHaveProp('selectedItems', selectedItems);
  });

  it('calls onChange on mount', () => {
    const onChange = jest.fn();
    subject({ value: ['pineapple'], onChange });
    expect(onChange).toHaveBeenCalledWith(['pineapple']);
  });

  it('calls onChange when selected item is added', () => {
    const onChange = jest.fn();
    const wrapper = subject({ onChange });

    selectMenuItem(wrapper, 0);

    expect(onChange).toHaveBeenCalledWith(['apple']);
  });

  it('calls onChange when selected item is removed', () => {
    const onChange = jest.fn();
    const wrapper = subject({ value: ['apple', 'pineapple'], onChange });

    act(() => {
      wrapper.find('ComboBoxTextField').prop('removeItem')('pineapple');
    });

    expect(onChange).toHaveBeenCalledWith(['apple']);
  });
});
