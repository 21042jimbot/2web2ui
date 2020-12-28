import React from 'react';
import { shallow, mount } from 'enzyme';
import { DefaultRedirect } from '../DefaultRedirect';
import { useHibana } from 'src/context/HibanaContext';
import routeData from 'react-router-dom';

jest.mock('src/context/HibanaContext');
useHibana.mockImplementation(() => [{ isHibanaEnabled: false }]);
const mockHistoryPush = jest.fn();
const mockHistoryReplace = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useRouteMatch: () => ({ params: {} }),
  useHistory: () => ({ push: mockHistoryPush, replace: mockHistoryReplace }),
}));

describe('DefaultRedirect', () => {
  let defaultProps;
  let subject;

  beforeEach(() => {
    defaultProps = {
      currentUser: {
        access_level: 'admin',
      },
      ready: false,
    };
  });

  it('should render correctly by default', () => {
    jest.spyOn(routeData, 'useLocation').mockReturnValue({
      state: {},
      search: '?test=one',
    });
    expect(shallow(<DefaultRedirect {...defaultProps} />)).toMatchSnapshot();
  });

  it('should redirect after login', () => {
    const redirectAfterLogin = {
      pathname: '/test/redirect/after/login',
      search: '?query-muh-thangs',
      hash: '#cornbeef',
    };
    jest.spyOn(routeData, 'useLocation').mockReturnValue({
      search: '?test=one',
      state: {
        redirectAfterLogin: redirectAfterLogin,
      },
    });
    subject = props => mount(<DefaultRedirect {...props} />);
    subject({ ...defaultProps });
    expect(mockHistoryReplace).toHaveBeenCalledTimes(1);
    expect(mockHistoryReplace).toHaveBeenCalledWith(redirectAfterLogin);
  });

  it('should do nothing if no redirect after login and not ready', () => {
    jest.spyOn(routeData, 'useLocation').mockReturnValue({
      state: {},
      search: '?test=one',
    });
    mount(<DefaultRedirect {...defaultProps} />);
    expect(mockHistoryReplace).not.toHaveBeenCalled();
  });
});
