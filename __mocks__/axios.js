import qs from 'query-string';
import lookup from 'src/__integration__/http-responses';

export const singleton = jest.fn((request) => Promise.resolve(lookup(request)));

singleton.interceptors = {
  response: {
    use: jest.fn()
  }
};

const mock = {
  create: () => singleton
};

export default mock;
