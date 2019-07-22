import * as alertsSelectors from '../alertsV1';
import cases from 'jest-in-case';


describe('Alerts Selectors: ', () => {
  let alertsV1;
  let formattedAlerts;

  beforeEach(() => {
    const list = [
      {
        id: 'id-1',
        muted: true,
        name: 'my alert 1',
        metric: 'monthly_sending_limit',
        last_triggered: null
      },
      {
        id: 'id-2',
        muted: false,
        name: 'my alert 2',
        metric: 'monthly_sending_limit',
        last_triggered: '2019-06-05T14:48:00.000Z'
      },
      {
        id: 'id-3',
        muted: true,
        name: 'my alert 3',
        metric: 'health_score',
        last_triggered: '2019-06-15T14:48:00.000Z'
      }
    ];

    formattedAlerts = [
      {
        ...list[0],
        last_triggered_formatted: null,
        last_triggered_timestamp: 0
      },
      {
        ...list[1],
        last_triggered_formatted: 'Jun 5 2019, 10:48am',
        last_triggered_timestamp: 1559746080000
      },
      {
        ...list[2],
        last_triggered_formatted: 'Jun 15 2019, 10:48am',
        last_triggered_timestamp: 1560610080000
      }
    ];

    alertsV1 = { list };
  });

  it('selectAlertsList returns formatted alerts data', () => {
    expect(alertsSelectors.selectAlertsList({ alertsV1 })).toEqual(formattedAlerts);
  });

  it('selectRecentlyTriggeredAlerts returns triggered alerts in order descending ', () => {
    expect(alertsSelectors.selectRecentlyTriggeredAlerts({ alertsV1 })).toEqual([formattedAlerts[2],formattedAlerts[1]]);
  });

  describe('getInitialValues', () => {

    const formData = {
      name: 'foo',
      metric: 'health_score',
      subaccounts: [-1],
      sending_ip: [],
      mailbox_provider: [],
      sending_domain: [],
      single_filter: { filter_type: 'none', filter_values: []},
      email_addresses: 'sparky@sparkpost.com, test@foo.com',
      source: 'raw',
      operator: 'lt',
      value: 80,
      muted: false
    };

    const apiData = {
      name: 'foo',
      metric: 'health_score',
      subaccounts: [-1],
      filters: [],
      channels: { emails: ['sparky@sparkpost.com', 'test@foo.com']},
      threshold_evaluator: {
        source: 'raw',
        operator: 'lt',
        value: 80
      },
      muted: false
    };

    const testCases =
    {
      'master and all subaccounts': {
        formData: { ...formData },
        apiData: { ...apiData }
      },
      'any subaccount': {
        formData: { ...formData, subaccounts: [-2]},
        apiData: { ...apiData, subaccounts: undefined, any_subaccount: true }
      },
      'select subaccounts': {
        formData: { ...formData, subaccounts: [0,1]},
        apiData: { ...apiData, subaccounts: [0,1]}
      },
      'single filter': {
        formData: { ...formData, single_filter: { filter_type: 'mailbox_provider', filter_values: ['a']}},
        apiData: { ...apiData, filters: [{ filter_type: 'mailbox_provider', filter_values: ['a']}]}
      },
      'single filter with no facet selected': {
        formData: { ...formData, single_filter: { filter_type: 'none', filter_values: []}},
        apiData: { ...apiData }
      },
      'only sending Ip': {
        formData: { ...formData, metric: 'block_bounce_rate', sending_ip: ['a','b']},
        apiData: {
          ...apiData,
          metric: 'block_bounce_rate',
          filters: [{ filter_type: 'sending_ip', filter_values: ['a','b']}]}
      },
      'sending Ip, mailbox provider, and sending domain': {
        formData: { ...formData, metric: 'block_bounce_rate', sending_ip: ['a'], mailbox_provider: ['b'], sending_domain: ['c']},
        apiData: {
          ...apiData,
          metric: 'block_bounce_rate',
          filters: [
            { filter_type: 'sending_ip', filter_values: ['a']},
            { filter_type: 'mailbox_provider', filter_values: ['b']},
            { filter_type: 'sending_domain', filter_values: ['c']}
          ]
        }
      }
    };

    cases('should correctly transform the data for', ({ formData, apiData }) => {
      expect(alertsSelectors.getInitialValues(apiData, false)).toEqual(formData);
    }, testCases);

    it('append (Duplicate) for duplicate alerts', () => {
      expect(alertsSelectors.getInitialValues({ ...apiData, name: 'OG alert' }, true)).
        toEqual({ ...formData, name: 'OG alert (Duplicate)' });
    });
  });
});
