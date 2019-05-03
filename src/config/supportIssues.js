import _ from 'lodash';
import { hasOnlineSupport, hasStatus, hasStatusReasonCategory, isSuspendedForBilling, onPlanWithStatus, isSelfServeBilling } from 'src/helpers/conditions/account';
import { isEmailVerified } from 'src/helpers/conditions/user';
import { all, not, any } from 'src/helpers/conditions';
import { isAdmin } from 'src/helpers/conditions/user';

// types of support issues
// @note These values must be configured in Desk before being used and they are case-sensitive
const BILLING = 'Billing';
const COMPLIANCE = 'Compliance';
const ERRORS = 'Errors';
const LIMITS = 'DailyLimits';
const SUPPORT = 'Support';

const defaultMessageLabel = 'Tell us more about your issue';
const defaultCondition = all(hasOnlineSupport, hasStatus('active'));

/**
 * @example
 *   {
 *     // a snake cased string, used to reference a specific issue
 *     id: 'example_issue',
 *
 *     // the label for the support form dropdown
 *     label: 'This is an example',
 *
 *     // the follow-up question for the support form (optional; to override default)
 *     messageLabel: 'Tell us more about your issue',
 *
 *     type: 'Example',
 *
 *   }
 */
const supportIssues = [
  {
    id: 'ui_errors',
    label: 'UI errors',
    type: ERRORS
  },
  {
    id: 'sending_domain_block',
    label: 'Sending domain block',
    type: COMPLIANCE
  },
  {
    id: 'configuration_setup_support',
    label: 'Configuration support',
    type: SUPPORT
  },
  {
    id: 'dns',
    label: 'DNS help',
    type: SUPPORT
  },
  {
    id: 'placement_deliverability',
    label: 'Deliverability issues',
    type: SUPPORT
  },
  {
    id: 'reporting_and_event_issue',
    label: 'Reporting & event issues',
    type: SUPPORT
  },
  {
    id: 'blacklisting',
    label: 'IP blacklisting',
    type: COMPLIANCE
  },
  {
    id: 'product/support_feedback',
    label: 'Feedback',
    type: SUPPORT
  },
  {
    id: 'account_upgrade/downgrade_issue',
    label: 'Account upgrade/downgrade issues',
    type: SUPPORT,
    condition: isAdmin
  },
  {
    id: 'request_new_ip',
    label: 'Request new IP',
    type: SUPPORT,
    condition: all(
      isAdmin,
      not(isSelfServeBilling)
    )
  },
  {
    id: 'general_billing',
    label: 'Billing problems',
    messageLabel: 'Tell us more about your billing issue',
    type: BILLING,
    condition: all(
      isAdmin,
      any(isSuspendedForBilling, hasStatus('active'))
    )
  },
  {
    id: 'account_suspension',
    label: 'Account suspension',
    messageLabel: 'Why do you think your account should be unsuspended?',
    type: COMPLIANCE,
    condition: all(
      isAdmin,
      hasStatus('suspended'),
      not(hasStatusReasonCategory('100.01'))
    )
  },
  {
    id: 'daily_limits',
    label: 'Daily sending limit increase',
    messageLabel: 'What limit do you need and why?',
    type: LIMITS,
    condition: all(
      hasOnlineSupport,
      isAdmin,
      isEmailVerified,
      hasStatus('active'),
      not(onPlanWithStatus('deprecated'))
    )
  },
  {
    id: 'account_cancellation',
    label: 'Account cancellation',
    messageLabel: 'Tell us why you are leaving',
    type: BILLING,
    condition: isAdmin
  },
  {
    id: 'general_issue',
    label: 'Another issue',
    messageLabel: 'Tell us more about your issue',
    type: SUPPORT
  }
];


const augmentIssuesList = function () {
  return _.map(supportIssues, (supportIssue) => ({
    ...supportIssue,
    messageLabel: supportIssue.messageLabel || defaultMessageLabel,
    condition: supportIssue.condition || defaultCondition
  }));
};

export default augmentIssuesList();
