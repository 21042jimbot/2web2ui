import React from 'react';
import { Bookmark } from '@sparkpost/matchbox-icons';
import { formatDate } from 'src/helpers/date';
import config from 'src/config';
import { Subaccount } from 'src/components';
import {
  Box,
  Inline,
  ScreenReaderOnly,
  Stack,
  Table,
  Tag,
  Text,
  Tooltip,
} from 'src/components/matchbox';
import { PageLink } from 'src/components/links';
import { TranslatableText } from 'src/components/text';
import { useUniqueId } from 'src/hooks';
import { DETAILS_BASE_URL } from '../constants';

export default function SendingDomainsTable({ rows }) {
  return (
    <Table title="Sending Domains">
      <ScreenReaderOnly as="thead">
        <Table.Row>
          <Table.HeaderCell>Domain</Table.HeaderCell>

          <Table.HeaderCell>Status</Table.HeaderCell>
        </Table.Row>
      </ScreenReaderOnly>

      <tbody>
        {rows?.map((domain, index) => {
          return (
            <Table.Row key={`table-row-${index}`}>
              <Table.Cell>
                <MainCell row={domain} />
              </Table.Cell>

              <Table.Cell>
                <StatusCell row={domain} />
              </Table.Cell>
            </Table.Row>
          );
        })}
      </tbody>
    </Table>
  );
}

function MainCell({ row }) {
  const { domainName, creationTime, sharedWithSubaccounts, subaccountId, subaccountName } = row;

  return (
    <Stack space="100">
      <PageLink to={`${DETAILS_BASE_URL}/${domainName}`}>{domainName}</PageLink>

      <Text fontSize="200" lineHeight="200">
        <TranslatableText>Assignment: </TranslatableText>

        {subaccountId ? (
          <Subaccount all={sharedWithSubaccounts} id={subaccountId} name={subaccountName} />
        ) : (
          'Primary Account'
        )}
      </Text>

      <Text fontSize="200" lineHeight="200">
        <TranslatableText>Added: </TranslatableText>

        {creationTime ? formatDate(creationTime, config.dateFormatWithComma) : 'Unknown'}
      </Text>
    </Stack>
  );
}

function StatusCell({ row }) {
  const {
    blocked,
    defaultBounceDomain,
    readyForBounce,
    readyForDKIM,
    readyForSending,
    validSPF,
    unverified,
    subaccountId,
  } = row;
  const tooltipId = useUniqueId('default-bounce-domain');
  const tooltipContent = `Default${subaccountId ? ' Subaccount ' : ''} Bounce Domain`;

  if (blocked) return <Tag color="red">Blocked</Tag>;

  if (unverified) return <Tag color="yellow">Unverified</Tag>;

  return (
    <Inline space="100">
      {readyForSending && <Tag>Sending</Tag>}

      {readyForBounce && (
        <Tag>
          <Inline space="100">
            <TranslatableText>Bounce</TranslatableText>

            {defaultBounceDomain && (
              <Box color="green.700">
                <Tooltip content={tooltipContent} id={tooltipId}>
                  <div tabIndex="0" data-id="default-bounce-domain-tooltip">
                    <Bookmark />
                  </div>
                </Tooltip>
              </Box>
            )}
          </Inline>
        </Tag>
      )}

      {readyForDKIM && <Tag color="green">DKIM Signing</Tag>}

      {validSPF && <Tag color="green">SPF Valid</Tag>}
    </Inline>
  );
}