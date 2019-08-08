import { mount, shallow } from 'enzyme';
import React from 'react';
import { TestDetailsPage } from '../TestDetailsPage';

describe('Page: Single Inbox Placement Test', () => {
  const subject = ({ ...props }) => {
    const defaults = {
      getInboxPlacementTest: jest.fn(),
      getInboxPlacementByProviders: jest.fn(),
      tabIndex: 0,
      id: 0,
      loading: false,
      error: false,
      history: {
        replace: jest.fn()
      }
    };

    return shallow(<TestDetailsPage {...defaults} {...props} />);
  };

  it('renders page correctly with defaults', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('calls getInboxPlacementTest on load', () => {
    const getInboxPlacementTest = jest.fn().mockReturnValue({});
    mount(<TestDetailsPage getInboxPlacementTest={getInboxPlacementTest}
      getInboxPlacementByProviders={jest.fn()}
      id={101}
      tabIndex={1} //not working nicely with tabIndex=0; TestDetails component
      history={{ replace: jest.fn() }}/>);

    expect(getInboxPlacementTest).toHaveBeenCalled();
  });

  it('renders loading', () => {
    const wrapper = subject();
    wrapper.setProps({ loading: true });
    expect(wrapper.find('Loading')).toExist();
    expect(wrapper.find('Page')).not.toExist();
  });

  it('handles errors', () => {
    const wrapper = subject();
    wrapper.setProps({
      error: {
        message: 'You dun goofed'
      }
    });
    expect(wrapper.find('RedirectAndAlert')).toExist();
    expect(wrapper.find('Page')).not.toExist();
  });

  it('renders details when tab is set to details', () => {
    const wrapper = subject();
    expect(wrapper.find('TestDetails')).toExist();
    expect(wrapper.find('TestContent')).not.toExist();
  });

  it('renders content when tab is set to content', () => {
    const wrapper = subject();
    wrapper.setProps({ tabIndex: 1 });
    expect(wrapper.find('TestContent')).toExist();
    expect(wrapper.find('TestDetails')).not.toExist();
  });

  it('updates URL when tabs change', () => {
    const mockHistory = { replace: jest.fn() };
    const wrapper = mount(<TestDetailsPage tabIndex={1}
      history={mockHistory}
      getInboxPlacementTest={jest.fn()}
      getInboxPlacementByProviders={jest.fn()}/>);
    wrapper.find('Tab').last().simulate('click');
    expect(mockHistory.replace).toHaveBeenCalled();
  });
});

