import { fetch as fetchAccount } from './account';
import { get as getCurrentUser, getGrants } from './currentUser';
import { getPlans, getBundles } from './billing';

// initialize some state used for access control
export function initializeAccessControl() {
  // These will fail if the auth token has expired
  // Hides global alerts when user is logged out and redirected to /auth
  const meta = { showErrorAlert: false };

  return dispatch =>
    Promise.all([
      dispatch(fetchAccount({ meta })),
      dispatch(getPlans({ meta })),
      dispatch(getBundles()),
      dispatch(getCurrentUser({ meta })).then(({ access_level }) =>
        dispatch(getGrants({ role: access_level, meta })),
      ),
    ]).then(() => dispatch({ type: 'ACCESS_CONTROL_READY' }));
}
