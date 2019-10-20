import selectAccessCondtionState, {
  selectCondition,
  selectDefaultTemplateOptions
} from '../accessConditionState';

jest.mock('src/helpers/conditions/account');

describe('Selector: Access Condition State', () => {

  let testState;
  let testAccessConditionState;

  beforeEach(() => {
    testState = {
      account: {
        options: {
          click_tracking: true,
          rest_tracking_default: true,
          transactional_default: false
        },
        subscription: {
          code: 'plan2'
        }
      },
      billing: {
        plans: [
          { code: 'plan1', name: 'Plan 1' },
          { code: 'plan2', name: 'Plan 2' },
          { code: 'plan3', name: 'Plan 3' }
        ]
      },
      currentUser: {},
      accessControlReady: false
    };

    testAccessConditionState = {
      account: testState.account,
      currentUser: testState.currentUser,
      accountPlan: testState.billing.plans[1],
      plans: testState.billing.plans,
      ready: false
    };
  });

  test('default selector should return the correct state', () => {
    expect(selectAccessCondtionState(testState)).toEqual(testAccessConditionState);
  });

  test('selectCondition should provide correct state to passed in condition', () => {
    const testCondition = jest.fn(() => true);
    expect(selectCondition(testCondition)(testState)).toEqual(true);
    expect(testCondition).toHaveBeenCalledWith(testAccessConditionState);
  });

  test('returns default template options', () => {
    expect(selectDefaultTemplateOptions(testState)).toEqual({
      click_tracking: true,
      open_tracking: true,
      transactional: false
    });
  });
});
