import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import authCookie from 'src/helpers/authCookie';
import { login } from 'src/actions/auth';
import { getGrantsFromCookie } from 'src/actions/currentUser';
import { logout } from 'src/actions/auth';

export class AuthenticationGate extends Component {
  componentWillMount () {
    const { auth } = this.props;
    if (auth.loggedIn && auth.token) {
      return;
    }

    const foundCookie = authCookie.get();
    if (foundCookie) {
      this.props.login({ authData: foundCookie });
      this.props.getGrantsFromCookie(foundCookie);
    }
  }

  componentDidUpdate (oldProps) {
    const { account, auth, history, location = {}, logout } = this.props;
    // if logging out
    if (location.pathname !== '/auth' && oldProps.auth.loggedIn && !auth.loggedIn) {
      history.push('/auth');
    }

    if (oldProps.account.status !== 'terminated' && account.status === 'terminated') {
      logout();
    }
  }

  render () {
    return null;
  }
}

export default withRouter(connect(({ auth, account }) => ({ auth, account }), { login, logout, getGrantsFromCookie })(AuthenticationGate));
