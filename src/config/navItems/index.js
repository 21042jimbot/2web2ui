/* eslint-disable max-lines */
import {
  Home,
  People,
  Code,
  List,
  NotificationsActive,
  Settings,
  BarChart,
  GridOff
} from '@sparkpost/matchbox-icons';
import { hasGrants } from 'src/helpers/conditions';
import { hasAccountOptionEnabled, isAccountUiOptionSet } from 'src/helpers/conditions/account';
import inboxPlacementNavItems from './inboxPlacement';

export default [
  {
    label: 'Dashboard',
    to: '/dashboard',
    icon: Home
  },
  {
    label: 'Signals Analytics',
    to: '/reports',
    icon: BarChart,
    children: [
      {
        label: 'Summary',
        to: '/reports/summary'
      },
      {
        label: 'Bounce',
        to: '/reports/bounce'
      },
      {
        label: 'Rejections',
        to: '/reports/rejections'
      },
      {
        label: 'Accepted',
        to: '/reports/accepted'
      },
      {
        label: 'Delayed',
        to: '/reports/delayed'
      },
      {
        label: 'Health Score',
        to: '/signals/health-score',
        divider: true
      },
      {
        label: 'Spam Traps',
        to: '/signals/spam-traps'
      },
      {
        label: 'Engagement Recency',
        to: '/signals/engagement',
        divider: true
      },
      {
        label: 'Engagement',
        to: '/reports/engagement'
      }
    ]
  },
  {
    label: 'Events',
    to: '/reports/message-events',
    icon: List
  },
  {
    label: 'Content',
    to: '/',
    icon: Code,
    tag: 'new',
    children: [
      {
        label: 'Templates',
        to: '/templates'
      },
      {
        label: 'Templates',
        to: '/templatesV2',
        condition: isAccountUiOptionSet('templatesV2'),
        tag: 'new'
      },
      {
        label: 'A/B Testing',
        to: '/ab-testing'
      },
      {
        label: 'Snippets',
        to: '/snippets',
        tag: 'labs'
      }
    ]
  },
  {
    label: 'Recipients',
    to: '/lists',
    icon: People,
    children: [
      {
        label: 'Recipient Validation',
        to: '/recipient-validation/list',
        condition: hasGrants('recipient-validation/manage')
      },
      {
        label: 'Recipient Lists',
        to: '/lists/recipient-lists'
      },
      {
        label: 'Suppressions',
        to: '/lists/suppressions'
      }
    ]
  },
  {
    label: 'Alerts',
    to: '/alerts',
    tag: 'new',
    icon: NotificationsActive
  },
  inboxPlacementNavItems,
  {
    label: 'Blacklist',
    to: '/blacklist',
    tag: 'labs',
    icon: GridOff,
    condition: hasAccountOptionEnabled('blacklist_monitors')
  },
  {
    label: 'Configuration',
    to: '/account',
    icon: Settings,
    children: [
      {
        label: 'Webhooks',
        to: '/webhooks'
      },
      {
        label: 'IP Pools',
        to: '/account/ip-pools'
      },
      {
        label: 'API Keys',
        to: '/account/api-keys'
      },
      {
        label: 'SMTP Settings',
        to: '/account/smtp'
      },
      {
        label: 'Signals Integration',
        to: '/signals/integration',
        divider: true
      },
      {
        label: 'Sending Domains',
        to: '/account/sending-domains',
        divider: true
      },
      {
        label: 'Tracking Domains',
        to: '/account/tracking-domains'
      },
      {
        label: 'Subaccounts',
        to: '/account/subaccounts',
        divider: true
      }
    ]
  }
];
