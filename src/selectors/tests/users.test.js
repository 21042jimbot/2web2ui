import { selectUsers, selectUserById } from '../users';

describe('Users Selectors', () => {
  const state = {
    currentUser: { username: 'zebra' },
    users: {
      entities: {
        ape: { name: 'Ape', username: 'ape', access: 'access' },
        zebra: { name: 'Zebra', username: 'zebra', access: 'templates' }
      },
      sortKey: 'name'
    }
  };

  it('returns enriched and sorted list', () => {
    expect(selectUsers(state)).toMatchSnapshot();
  });

  it('returns user from user list', () => {
    expect(selectUserById(state, 'ape')).toMatchSnapshot();
  });

  it('returns if user not found', () => {
    expect(selectUserById(state, 'missingUser')).toMatchSnapshot();
  });
});
