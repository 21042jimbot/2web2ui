/* eslint-disable no-unused-vars, no-console */
import raf from './tempPolyfills';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from '@testing-library/react';
import * as matchers from './matchers';
import setupPortals from 'src/__testHelpers__/setupPortals';

// Provides enzyme assertions.
// See https://github.com/blainekasten/enzyme-matchers#assertions
import 'jest-enzyme';

expect.extend(matchers); // register custom matchers

Enzyme.configure({ adapter: new Adapter() });

// React testing library configuration
configure({
  testIdAttribute: 'data-id', // Overriding the default test ID used by `getByTestId` matcher - `data-testid` isn't used so we can also use these attributes for analytics tagging
});

// this is just a little hack to silence a warning that we'll get with React Testing Library get
//  until we upgrade to React 16.9. See:
// 1. https://github.com/facebook/react/pull/14853
// 2. and from the official React Testing Library docs https://github.com/testing-library/react-testing-library#suppressing-unnecessary-warnings-on-react-dom-168
const originalError = (console.error = message => {
  // Fail tests on any warning
  throw new Error(message);
});

beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }

    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

setupPortals();

beforeEach(() => {
  // Verifies that at least one assertion is called during a test
  // See https://facebook.github.io/jest/docs/en/expect.html#expecthasassertions
  expect.hasAssertions();
});

// Mock moment to set a default timezone
jest.mock('moment', () => {
  jest.unmock('moment'); // must unmock, so moment-timezone can require
  const momentTimezone = require.requireActual('moment-timezone');
  momentTimezone.tz.setDefault('America/New_York');
  return momentTimezone;
});

Object.defineProperty(global.navigator, 'userAgent', { value: 'node.js', configurable: true });
Object.defineProperty(global.navigator, 'language', { value: 'en-US', configurable: true });
Object.defineProperty(global.window, 'scrollTo', { value: jest.fn(), configurable: true });
Object.defineProperty(global.window.location, 'assign', { value: jest.fn(), configurable: true });

// Show a stack track for unhandled rejections to help
// track them down.
process.on('unhandledRejection', reason => {
  console.log(reason);
});

const mockLocalStorage = {
  clear: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  setItem: jest.fn(),
};

Object.defineProperty(global.window, 'localStorage', { value: mockLocalStorage });
