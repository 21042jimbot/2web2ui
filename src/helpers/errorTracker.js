import _ from 'lodash';
import Raven from 'raven-js';
import createRavenMiddleware from 'raven-for-redux';
import bowser from 'bowser';
import supportedBrowsers from 'src/config/__auto/browsers';

/**
 * List of breadcrumbs to ignore to reduce noise
 * @note Sentry has a 100 breadcrumb per event/error maximum
 */
const BLACKLIST = new Set([
  '@@redux/INIT',
  '@@redux-form/BLUR',
  '@@redux-form/CHANGE',
  '@@redux-form/DESTROY',
  '@@redux-form/FOCUS',
  '@@redux-form/REGISTER_FIELD',
  '@@redux-form/TOUCH',
  '@@redux-form/UNREGISTER_FIELD',
  '@@redux-form/UPDATE_SYNC_ERRORS',
  '@@redux-form/INITIALIZE',
  '@@redux-form/STOP_SUBMIT',
  '@@redux-form/SET_SUBMIT_FAILED'
]);

/**
 * Filter out blacklisted breadcrumbs
 *
 * @param {object} crumb
 * @param {string} crumb.category - console, http, redux-action, xhr, etc.
 * @param {string} crumb.message - error message, redux action type, etc.
 * @param {number} crumb.timestamp - created at
 * @see https://docs.sentry.io/clients/javascript/config
 */
export function breadcrumbCallback(crumb) {
  if (BLACKLIST.has(crumb.message)) {
    return false;
  }

  return crumb;
}

// Closure to safely enrich events with data from Redux store
export function getEnricherOrDieTryin(store, currentWindow) {
  return function enrich(data) {
    const { currentUser } = store.getState();
    const user = _.pick(currentUser, ['access_level', 'customer', 'username']);
    const fromOurBundle = isErrorFromOurBundle(data);
    const apiError = isApiError(data);
    const chunkFailure = isChunkFailure(data);
    const isSupportedBrowser = isErrorInSupportedBrowser(data);
    // console.log('isSupportedBrowser', isSupportedBrowser);

    return {
      ...data,
      level: !fromOurBundle || apiError || chunkFailure  || !isSupportedBrowser? 'warning' : 'error',
      tags: { // all tags can be easily searched and sent in Slack notifications
        ...data.tags,
        customer: _.get(user, 'customer'),
        // This <html> property should be set by us and updated when page is translated
        documentLanguage: _.get(currentWindow, 'document.documentElement.lang', 'unknown'),
        navigatorLanguage: _.get(currentWindow, 'navigator.language', 'unknown'),
        source: fromOurBundle ? '2web2ui' : 'unknown'
      },
      user
    };
  };
}

// Check if error event was thrown from our bundle or from something else (i.e. browser extension)
export function isErrorFromOurBundle(data) {
  // The local environment match is looser to allow for hot module replacement (i.e. http://app.sparkpost.test/4.a0803f8355f692de1382.hot-update.js)
  const looksLikeOurBundle = /sparkpost\.test|sparkpost\.com\/static\/js\//;
  // There should never be multiple exception values
  let frames = _.get(data, 'exception.values[0].stacktrace.frames', []);
  const firstFunction = _.get(frames, '[0].function');

  // A Sentry function may be included in the stacktrace and needs to be ignored (i.e. HTMLDocument.wrapped or wrapped)
  if (/wrapped/.test(firstFunction)) {
    frames = frames.slice(1); // safely reassign frames without Sentry function
  }

  // if any frame is from our bundle
  return Boolean(frames.find(({ filename }) => looksLikeOurBundle.test(filename)));
}

export function isApiError(data) {
  const looksLikeApiErrorType = /SparkpostApiError|ZuoraApiError/;
  const type = _.get(data, 'exception.values[0].type');

  return looksLikeApiErrorType.test(type);
}

export function isChunkFailure(data) {
  const looksLikeChunkFailure = /Loading chunk/;
  const value = _.get(data, 'exception.values[0].value');

  return looksLikeChunkFailure.test(value);
}

export function isErrorInSupportedBrowser(data) {
  const browser = bowser.getParser(window.navigator.userAgent);

  // console.log('browers', supportedBrowsers);
  // debugger;
  // console.log('is browser satisfied', browser.satisfies(supportedBrowser));
  // debugger;
  return browser.satisfies(supportedBrowsers);

}

// The purpose of this helper is to provide a common interface for reporting errors
// with the expectation that the current service will change in the future.
class ErrorTracker {

  /**
   * The service must be configured before it can be used
   * @param {object} store - the Redux store for additional context
   * @param {object}
   */
  install(config, store) {
    const { release, sentry, tenant } = config;

    // Silently ignore installation if Sentry configuration is not provided
    if (!sentry) { return; }

    const dsn = `https://${sentry.publicKey}@sentry.io/${sentry.projectId}`;
    const options = {
      breadcrumbCallback,
      dataCallback: getEnricherOrDieTryin(store, window),
      release,
      tags: { tenant }
    };

    Raven.config(dsn, options).install();
  }

  // Record redux actions as breadcrumbs
  get middleware() {
    return createRavenMiddleware(Raven);
  }

  /**
   * Report an error
   *
   * @param {string} logger - simple description of where the error was caught
   * @param {Error} error
   * @example
   *   try {
   *     throw new Error('Oh no, save me!');
   *   } catch(error) {
   *     ErrorTracker.report('where-am-i', error);
   *   }
   */
  report(logger, error, extra = {}) {
    // Silently ignore if Sentry is not setup
    if (!Raven.isSetup()) { return; }
    Raven.captureException(error, { logger, extra });
  }
}

// Export a constructed instance to avoid the need to call `new` everywhere
export default new ErrorTracker();
