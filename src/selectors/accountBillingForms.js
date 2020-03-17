import _ from 'lodash';
import { createSelector } from 'reselect';
import {
  currentBundleSelector,
  selectVisibleBundles,
  selectAvailableBundles,
} from './accountBillingInfo';

export const getCountries = state => _.get(state, 'billing.countries');
export const getFirstCountry = state => _.get(state, 'billing.countries[0].value');
export const getCountry = (state, country) => country;

export const getFirstStateForCountry = createSelector(
  [getCountries, getCountry],
  (countries, country) =>
    _.get(
      _.find(countries, ({ value }) => value === country),
      'states[0].value',
    ),
);

/**
 * Selects initial values for all the forms on account/billing/plan
 */
export function changePlanInitialValues(state, { planCode, promoCode } = {}) {
  const overridePlan = _.find(selectAvailableBundles(state), { bundle: planCode }); // typically from query string
  const currentPlan = currentBundleSelector(state);
  const firstVisiblePlan = _.head(selectVisibleBundles(state));
  const firstCountry = getFirstCountry(state);
  const firstState = getFirstStateForCountry(state, firstCountry);

  return {
    email: state.currentUser.email, // This sets the email value even though the field does not exist
    planpicker: overridePlan || currentPlan || firstVisiblePlan,
    billingAddress: {
      firstName: state.currentUser.first_name,
      lastName: state.currentUser.last_name,
      country: firstCountry,
      state: firstState,
    },
    promoCode,
  };
}

/**
 * Selects initial values for all the update payment form on the summary page
 */
export function updatePaymentInitialValues(state) {
  const firstCountry = getFirstCountry(state);
  const firstState = getFirstStateForCountry(state, firstCountry);

  return {
    billingAddress: {
      firstName: state.currentUser.first_name,
      lastName: state.currentUser.last_name,
      country: firstCountry,
      state: firstState,
    },
  };
}

/**
 * Selects initial values for the update contact form on the summary page
 */
export function updateContactInitialValues(state) {
  const { billing = {} } = state.account;
  return {
    billingContact: {
      email: billing.email,
      firstName: billing.first_name,
      lastName: billing.last_name,
      country: billing.country_code,
      state: billing.state,
      zip: billing.zip_code,
    },
  };
}
