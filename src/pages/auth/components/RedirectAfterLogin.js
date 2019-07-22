import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { DEFAULT_REDIRECT_ROUTE } from 'src/constants';

/*
 * Redirect to the default route.
 * This is meant for use immediately after authentication completes.
 */
export const RedirectAfterLogin = ({ location: { state } = {}}) => {
  const route = { state, pathname: DEFAULT_REDIRECT_ROUTE };
  return <Redirect to={route} />;
};

export default withRouter(RedirectAfterLogin);
