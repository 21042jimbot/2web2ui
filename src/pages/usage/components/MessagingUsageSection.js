import React from 'react';
import { Box, Grid, Inline, Layout, Stack } from 'src/components/matchbox';
import { ExternalLink, PageLink } from 'src/components/links';
import { Heading, SubduedText } from 'src/components/text';
import { formatDate } from 'src/helpers/date';
import config from 'src/config';
import { LINKS } from 'src/constants';
import { LabelAndKeyPair } from './LabelAndKeyPair';

export const MessagingUsageSection = ({
  usage,
  subscription,
  endOfBillingPeriod,
  startOfBillingPeriod,
}) => {
  const remaining = usage && subscription && subscription.plan_volume - usage.month.used;
  const overage = remaining < 0 ? Math.abs(remaining) : 0;
  const hasDailyLimit = usage && usage.day.limit && usage.day.limit > 0;
  const hasMonthlyLimit = usage && usage.month.limit && usage.month.limit > 0;
  const isNearingMonthlyLimit =
    usage && subscription && remaining > 0 && remaining / subscription.plan_volume < 0.1;
  const isNearingDailyLimit =
    usage && usage.day.used - usage.day.limit > 0 && usage.day.used / usage.day.limit > 0.9;
  return (
    <>
      <Layout.Section annotated>
        <Layout.SectionTitle as="h2">Messaging Usage</Layout.SectionTitle>
        <Stack>
          <Stack space="100">
            <SubduedText>All message injections count toward messaging usage.</SubduedText>
            <ExternalLink to={LINKS.DAILY_USAGE}>Messaging Usage Definition</ExternalLink>
          </Stack>

          <Stack space="100">
            <Heading as="h3" looksLike="h6">
              Limits
            </Heading>
            <SubduedText>
              Each SparkPost account has a daily and monthly quota based on the current plan level
            </SubduedText>
            <ExternalLink to={LINKS.DAILY_MONTHLY_QUOTA_LIMIT_DOC}>Quota Limits</ExternalLink>
          </Stack>

          {(isNearingMonthlyLimit || isNearingDailyLimit) && (
            <Stack space="100">
              <Heading as="h3" looksLike="h6">
                Upgrade
              </Heading>
              <SubduedText>
                Your usage indicates that you're nearing your daily or monthly limits. Upgrade your
                plan in <PageLink to="account/billing/plan">Billing</PageLink>.
              </SubduedText>
            </Stack>
          )}
        </Stack>
      </Layout.Section>

      <Layout.Section>
        {usage && (
          <Box padding="400" backgroundColor="gray.1000">
            <Stack>
              <Grid>
                <Grid.Column sm={3}>
                  <Box id="date">
                    <LabelAndKeyPair
                      label="Billing Cycle"
                      value={`${formatDate(startOfBillingPeriod, config.dateFormat)} - ${formatDate(
                        endOfBillingPeriod,
                        config.dateFormat,
                      )}`}
                    ></LabelAndKeyPair>
                  </Box>
                </Grid.Column>
                <Grid.Column sm={9}>
                  <Inline space="400">
                    <Box>
                      <LabelAndKeyPair
                        label="Today's Usage"
                        value={usage.day.used.toLocaleString()}
                      ></LabelAndKeyPair>
                    </Box>
                    <Box>
                      {hasDailyLimit && (
                        <LabelAndKeyPair
                          label="Daily Limit"
                          value={usage.day.limit.toLocaleString()}
                        ></LabelAndKeyPair>
                      )}
                    </Box>
                  </Inline>
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column sm={3}>
                  <Box></Box>
                </Grid.Column>
                <Grid.Column sm={9}>
                  <Inline space="400">
                    <Box>
                      <LabelAndKeyPair
                        label="Month's Usage"
                        value={usage.month.used.toLocaleString()}
                      ></LabelAndKeyPair>
                    </Box>
                    <Box>
                      <LabelAndKeyPair
                        label="Monthly Allotment"
                        value={subscription.plan_volume.toLocaleString()}
                      ></LabelAndKeyPair>
                    </Box>
                    {overage > 0 && (
                      <Box>
                        <LabelAndKeyPair
                          label="Month's Overages"
                          value={overage.toLocaleString()}
                        ></LabelAndKeyPair>
                      </Box>
                    )}
                    {hasMonthlyLimit && (
                      <Box>
                        <LabelAndKeyPair
                          label="Monthly Limit"
                          value={usage.month.limit.toLocaleString()}
                        ></LabelAndKeyPair>
                      </Box>
                    )}
                  </Inline>
                </Grid.Column>
              </Grid>
            </Stack>
          </Box>
        )}
      </Layout.Section>
    </>
  );
};
