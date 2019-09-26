
export const HEALTH_SCORE_INFO = `
  This is a predictive score that monitors your email health to identify problems before
  they negatively impact email delivery. This score is informed by message events,
  including bounces, spam trap hits, and engagement across our entire network.
`;

export const HEALTH_SCORE_COMPONENT_INFO = `
  Your email Health Score is comprised of several signals, including bounces, spam trap hits, user
  engagement, and others.
`;

export const HEALTH_SCORE_COMPONENTS = {
  'Block Bounces': {
    label: 'Block Bounces',
    chartTitle: 'Block Bounces Percent',
    info: `
      Block Bounces are defined as the share of attempted email injections that are undelivered for
      various policy reasons.
    `
  },
  Complaints: {
    label: 'Complaints',
    chartTitle: 'Complaints Percent',
    info: `
      Complaints are defined as the shared of attempted email injections that are flagged by
      recipients as spam.
    `
  },
  'Hard Bounces': {
    label: 'Hard Bounces',
    chartTitle: 'Hard Bounces Percent',
    info: `
      Hard Bounces are calcuated as the share of attempted email injections that is sent to
      non-existent or undeliverable addresses.
    `
  },
  'List Quality': {
    label: 'Subscriber Quality',
    chartTitle: 'Percent of Subscriber Quality Issues',
    info: `
      Subscriber Quality is determined by the share of attempted email injections that match address
      patterns associated with problematic list procurement and hygiene practices.
    `
  },
  'Other bounces': {
    label: 'Other Bounces',
    chartTitle: 'Other Bounces Percent',
    info: `
      Other Bounces are defined as the share of attempted email injections that bounce for a variety
      of miscellaneous technical reasons.
    `
  },
  'Transient Failures': {
    label: 'Transient Failures',
    chartTitle: 'Transient Failure Percent',
    info: `
      Transient Failures are calculated as the share of attempted email injections that exhibit
      temporary delivery problems.
    `
  },
  'Spam Trap Hits': {
    label: 'Spam Trap Hits',
    chartTitle: 'Spam Trap Hits Percent',
    info: `
      Spam traps hits are calculated as the percent of your injections that are sent to spam traps. 
    `
  },
  'Suppression Hits': {
    label: 'Suppression Hits',
    chartTitle: 'Suppression Hits Percent',
    info: `
      Percent of the injections that were sent to addresses on your suppression list.
    `
  },
  'Historical Engagement': {
    label: 'Historical Engagement',
    chartTitle: 'Historical Engagement Percent',
    info: `
      The engagement rate calculated for the previous 3 days of emails sent.
    `
  },
  'Unsubscribes': {
    label: 'Unsubscribes',
    chartTitle: 'Unsubscribes Percent',
    info: `
      Unsubscribes are the share of emails injected that led to the recipient unsubscribing.
    `
  },
  'eng cohorts: unengaged': {
    label: 'Unengaged Recipients',
    chartTitle: 'Percent of Unengaged Recipients',
    info: `
      Percent of injections that were sent to recipients who haven't engaged in over 365 days or never engaged.
    `
  },
  'eng cohorts: new, 14-day': {
    label: 'Engaged Recipients',
    chartTitle: 'Percent of Engaged Recipients',
    info: `
      Percent of injections that were sent to new recipients or recipients who have engaged recently.
    `
  }
};

export const SPAM_TRAP_INFO = `
  The share over time of your total email that has been sent to known spam traps. An
  excessive rate of spam trap hits is an indicator of poor list procurement and hygiene practices.
`;

export const ENGAGEMENT_RECENCY_INFO = `
  The share over time of your email that has been sent to recipients who most recently
  opened messages or clicked links during several defined time periods.
`;

export const ENGAGEMENT_RECENCY_COHORTS = {
  'Never Engaged': `
    Never Engaged Recipients are the group of recipients who have received email but have not
    engaged with your messages in the past 365 days.
  `,
  New: `
    New Recipients are the group of recipients who have received their first email from you within
    the past 7 days and who have not yet engaged with your messages.
  `,
  'Not Recently Engaged': `
    Not Recently Engaged Recipients are the group of recipients who have engaged with your email
    in the past 365 days, but not in the past 90 days.
  `,
  'Recently Engaged': `
    Recently Engaged Recipients are the group of recipients who have engaged with your email in
    the past 14 days.
  `,
  'Semi Recently Engaged': `
    Semi-Recently Engaged Recipients are the group of recipients who have engaged with your email
    in the past 90 days, but not in the past 14 days.
  `
};

export const INJECTIONS_INFO = `
  Injections are defined as the total number of messages successfully generated or relayed to SparkPost for delivery.
`;
