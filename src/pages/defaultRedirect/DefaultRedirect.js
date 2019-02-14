import React, { Component } from 'react';
import _ from 'lodash';
import { Loading } from 'src/components/loading/Loading';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import selectAccessConditionState from 'src/selectors/accessConditionState';
import config from 'src/config';

export class DefaultRedirect extends Component {

  componentDidMount() {
    this.handleRedirect();
  }

  componentDidUpdate() {
    this.handleRedirect();
  }

  handleRedirect() {
    const { location, history, currentUser, ready } = this.props;
    const { state: routerState = {}, ...locationWithoutState } = location;
    const allowedAccessLevels = ['subaccount_reporting', 'reporting', 'heroku', 'azure'];

    // if there is a redirect route set on state, we can
    // redirect there before access condition state is ready
    if (routerState.redirectAfterLogin) {
      history.replace({ ...locationWithoutState, ...routerState.redirectAfterLogin });
      return;
    }

    // if access condition state hasn't loaded, we can't
    // make a redirect decision yet
    if (!ready) {
      return;
    }

    // reporting users are all sent to the summary report
    if (_.includes(allowedAccessLevels, currentUser.access_level)) {
      history.replace({ ...location, pathname: '/reports/summary' });
      return;
    }

    // everyone else is sent to the config.splashPage route
    history.replace({ ...location, pathname: config.splashPage });
  }

  render() {
    return <Loading />;
  }
}

const mapStateToProps = (state) => selectAccessConditionState(state);
export default withRouter(connect(mapStateToProps)(DefaultRedirect));
