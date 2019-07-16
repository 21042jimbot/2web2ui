import * as authActions from '../auth';
import authCookie from 'src/helpers/authCookie';
import * as websiteAuth from 'src/actions/websiteAuth';
import { initializeAccessControl } from 'src/actions/accessControl';
import { sparkpostLogin } from 'src/helpers/http';
import { getTfaStatusBeforeLoggedIn } from 'src/actions/tfa';

jest.mock('src/helpers/authCookie');
jest.mock('src/actions/websiteAuth');
jest.mock('src/actions/accessControl');
jest.mock('src/helpers/http');
jest.mock('src/actions/tfa');

describe('Action Creator: Auth', () => {
  let dispatchMock;
  let getStateMock;
  let stateMock;
  let authData;

  function mockGetTfaStatus(enabled, required) {
    getTfaStatusBeforeLoggedIn.mockResolvedValue({
      data: {
        results: {
          enabled,
          required
        }
      }
    });
  }

  beforeEach(() => {
    authData = {
      username: 'ron-burgundy',
      token: '245234523423',
      refreshToken: 'adfa012342342'
    };

    dispatchMock = jest.fn((a) => Promise.resolve(a));
    stateMock = {
      auth: {
        loggedIn: false,
        token: '245234523423',
        refreshToken: 'adfa012342342'
      },
      token: 'superToken'
    };

    getStateMock = jest.fn(() => stateMock);
    sparkpostLogin.mockImplementation(() => Promise.resolve({
      data: {
        access_token: 'foo',
        username: 'bar'
      }
    }));

    websiteAuth.authenticate.mockReturnValue({ type: 'WEBSITE_AUTH' });

  });

  describe('login tests', () => {
    it('should not save cookie on default login call', async () => {
      const thunk = authActions.login({ authData });
      await thunk(dispatchMock);
      expect(authCookie.save).toHaveBeenCalledTimes(0);
      expect(initializeAccessControl).toHaveBeenCalledTimes(1);
      expect(dispatchMock).toHaveBeenCalledWith({
        type: 'LOGIN_SUCCESS',
        payload: authData
      });
      expect(dispatchMock).toHaveBeenCalledTimes(3);
    });

    it('should create cookie when flag is passed', async () => {
      const thunk = authActions.login({ authData, saveCookie: true });
      await thunk(dispatchMock);
      expect(authCookie.save).toHaveBeenCalledTimes(1);
      expect(dispatchMock).toHaveBeenCalledTimes(3);
    });

    it('should dispatch website auth login', async () => {
      const thunk = authActions.login({ authData, saveCookie: true });
      await thunk(dispatchMock);
      expect(websiteAuth.login).toHaveBeenCalledTimes(1);
      expect(websiteAuth.login).toHaveBeenCalledWith(true);
    });
  });

  describe('authenticate tests', () => {

    it('should return if you are already logged in', async () => {
      stateMock.auth.loggedIn = true ;
      const thunk = authActions.authenticate('foo', 'pw');
      await thunk(dispatchMock, getStateMock);
      expect(dispatchMock).toHaveBeenCalledTimes(0);
    });

    it('should update TFA to enabled if user is TFA', async () => {
      mockGetTfaStatus(true, false);

      const thunk = authActions.authenticate('bar', 'pw', true);
      await thunk(dispatchMock, getStateMock);
      expect(dispatchMock.mock.calls).toMatchSnapshot();
    });

    it('should return auth status on login success', async () => {
      const thunk = authActions.authenticate('bar', 'pw', true);
      const result = await thunk(dispatchMock, getStateMock);
      expect(result).toMatchObject({ auth: true, tfaRequired: false });
    });

    it('should update TFA to required', async () => {
      mockGetTfaStatus(false, true);
      const thunk = authActions.authenticate('bar', 'pw', true);
      await thunk(dispatchMock, getStateMock);
      expect(dispatchMock.mock.calls).toMatchSnapshot();
    });

    it('should return tfa required status', async () => {
      mockGetTfaStatus(false, true);
      const thunk = authActions.authenticate('bar', 'pw', true);
      const result = await thunk(dispatchMock, getStateMock);
      expect(result).toMatchObject({ tfaRequired: true });
    });

    it('should login if user is not TFA', async () => {
      mockGetTfaStatus(false, false);

      const thunk = authActions.authenticate('bar', 'pw', true);
      await thunk(dispatchMock, getStateMock);
      expect(dispatchMock.mock.calls).toMatchSnapshot();
    });

    it('should dispatch a failed login if login fails', async () => {
      sparkpostLogin.mockRejectedValue({
        response: {
          data: {
            error_description: 'login failed'
          }
        }
      });

      const thunk = authActions.authenticate('bar', 'pw', true);
      await thunk(dispatchMock, getStateMock);
      expect(dispatchMock.mock.calls).toMatchSnapshot();

    });

    it('should return auth status on login failure', async () => {
      sparkpostLogin.mockRejectedValue({
        response: {
          data: {
            error_description: 'login failed'
          }
        }
      });

      const thunk = authActions.authenticate('bar', 'pw', true);
      const result = await thunk(dispatchMock, getStateMock);
      expect(result).toMatchObject({ auth: false });
    });
  });

  describe('confirm password tests', () => {
    it('should dispatch a confirm password success when login succeeds', async () => {
      const thunk = authActions.confirmPassword('bar', 'pw');
      await thunk(dispatchMock, getStateMock);
      expect(dispatchMock.mock.calls).toMatchSnapshot();
    });

    it('should dispatch a confirm password fail when login fails', async () => {
      sparkpostLogin.mockImplementation(() => Promise.reject({
        response: {
          data: {
            error_description: 'login failed'
          }
        }
      }));

      const thunk = authActions.confirmPassword('bar', 'pw');
      await thunk(dispatchMock, getStateMock).catch(() => {
        expect(dispatchMock.mock.calls).toMatchSnapshot();
      });
    });
  });

  describe('refresh', () => {
    const newToken = 'new access token';
    const newRefreshToken = 'new refresh token';

    it('should merge new tokens into the cookie', async () => {
      const thunk = authActions.refresh(newToken, newRefreshToken);
      await thunk(dispatchMock, getStateMock);
      expect(authCookie.merge).toHaveBeenCalledWith({
        access_token: newToken,
        refresh_token: newRefreshToken
      });
    });

    it('should dispatch follow-on actions', async () => {
      const thunk = authActions.refresh(newToken, newRefreshToken);
      await thunk(dispatchMock, getStateMock);
      expect(dispatchMock.mock.calls).toMatchSnapshot();
    });
  });

  describe('logout', () => {
    it('should dispatch a logout when user is logged in', async () => {
      stateMock.auth.loggedIn = true;
      const thunk = authActions.logout();
      await thunk(dispatchMock, getStateMock);
      expect(authCookie.remove).toHaveBeenCalledTimes(1);
      expect(dispatchMock).toHaveBeenCalledTimes(4);
      expect(dispatchMock.mock.calls).toMatchSnapshot();
    });

    it('should NOT dispatch a logout when user is already logged out', async () => {
      stateMock.auth.loggedIn = false;
      const thunk = authActions.logout();
      await thunk(dispatchMock, getStateMock);
      expect(authCookie.remove).not.toHaveBeenCalled();
      expect(dispatchMock).not.toHaveBeenCalled();
    });

    it('should skip invalidating the refreshToken if one does not exist', async () => {
      stateMock.auth.refreshToken = null;
      stateMock.auth.loggedIn = true;
      const thunk = authActions.logout();
      await thunk(dispatchMock, getStateMock);
      expect(authCookie.remove).toHaveBeenCalledTimes(1);
      expect(dispatchMock).toHaveBeenCalledTimes(3);
      expect(dispatchMock.mock.calls).toMatchSnapshot();
    });
  });
});
