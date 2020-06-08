import * as scimTokenRequests from '../scimToken';
jest.mock('src/helpers/axiosInstances');
jest.mock('../helpers/sparkpostApiRequest', () => jest.fn(a => a));

describe('Action Creator: scimToken', () => {
  it('generateScimToken should make the appropriate request', () => {
    const thunk = scimTokenRequests.generateScimToken();
    expect(thunk).toMatchSnapshot();
  });

  it('listScimToken should make the appropriate request', () => {
    const thunk = scimTokenRequests.listScimToken();
    expect(thunk).toMatchSnapshot();
  });
});
