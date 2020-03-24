import React from 'react';
import { Table } from '@sparkpost/matchbox';
import cx from 'classnames';
import _ from 'lodash';
import { TableCollection } from 'src/components/collection';
import { PageLink } from 'src/components/links';
import { formatPercent } from 'src/helpers/units';
import styles from './PlacementBreakdown.module.scss';
import { PLACEMENT_FILTER_TYPES } from '../constants/types';
import formatFilterName, { formatRegion } from '../helpers/formatFilterName.js';

export const GroupPercentage = ({ value }) => (
  <span className={styles.GroupValue}>{formatPercent(value * 100)}</span>
);

export const HeaderComponent = ({ type }) => (
  <thead>
    <Table.Row className={styles.HeaderRow}>
      <Table.HeaderCell className={styles.PlacementNameCell}></Table.HeaderCell>
      {type === PLACEMENT_FILTER_TYPES.MAILBOX_PROVIDER && (
        <Table.HeaderCell className={styles.RegionCell}>Region</Table.HeaderCell>
      )}
      <Table.HeaderCell className={styles.Placement}>Inbox</Table.HeaderCell>
      <Table.HeaderCell className={styles.Placement}>Spam</Table.HeaderCell>
      <Table.HeaderCell className={styles.Placement}>Missing</Table.HeaderCell>
      <Table.HeaderCell className={cx(styles.Authentication, styles.divider)}>SPF</Table.HeaderCell>
      <Table.HeaderCell className={styles.Authentication}>DKIM</Table.HeaderCell>
      <Table.HeaderCell className={styles.Authentication}>DMARC</Table.HeaderCell>
    </Table.Row>
  </thead>
);

const getHeaderWrapper = _.memoize(type => props => <HeaderComponent {...props} type={type} />);

const WrapperComponent = ({ children }) => (
  <div>
    <Table>{children}</Table>
  </div>
);

const getPlacementNameByType = (type, { mailbox_provider, region, sending_ip }) => {
  switch (type) {
    case PLACEMENT_FILTER_TYPES.REGION:
      return region;
    case PLACEMENT_FILTER_TYPES.SENDING_IP:
      return sending_ip;
    case PLACEMENT_FILTER_TYPES.MAILBOX_PROVIDER:
      return mailbox_provider;
    default:
      return '';
  }
};

export const RowComponent = ({
  id,
  mailbox_provider,
  placement,
  authentication,
  type,
  region,
  sending_ip,
}) => {
  const name = getPlacementNameByType(type, { mailbox_provider, region, sending_ip });
  return (
    <Table.Row className={styles.DataRow}>
      <Table.Cell className={styles.PlacementNameCell}>
        <PageLink to={`/inbox-placement/details/${id}/${type}/${name}`}>
          <strong>{formatFilterName(type, name)}</strong>
        </PageLink>
      </Table.Cell>
      {type === PLACEMENT_FILTER_TYPES.MAILBOX_PROVIDER && (
        <Table.Cell className={styles.RegionCell}>{formatRegion(region)}</Table.Cell>
      )}
      <Table.Cell className={styles.Placement}>
        <GroupPercentage value={placement.inbox_pct} />
      </Table.Cell>
      <Table.Cell className={styles.Placement}>
        <GroupPercentage value={placement.spam_pct} />
      </Table.Cell>
      <Table.Cell className={styles.Placement}>
        <GroupPercentage value={placement.missing_pct} />
      </Table.Cell>
      <Table.Cell className={cx(styles.Authentication, styles.divider)}>
        <GroupPercentage value={authentication.spf_pct} />
      </Table.Cell>
      <Table.Cell className={styles.Authentication}>
        <GroupPercentage value={authentication.dkim_pct} />
      </Table.Cell>
      <Table.Cell className={styles.Authentication}>
        <GroupPercentage value={authentication.dmarc_pct} />
      </Table.Cell>
    </Table.Row>
  );
};

const getRowWrapper = _.memoize(type => props => <RowComponent {...props} type={type} />);

const PlacementBreakdown = ({ data = [], type }) => (
  <TableCollection
    rows={data}
    wrapperComponent={WrapperComponent}
    headerComponent={getHeaderWrapper(type)}
    rowComponent={getRowWrapper(type)}
    pagination={true}
    defaultSortColumn="placement.inbox_pct"
    defaultSortDirection="desc"
    saveCsv={false}
  />
);

export default PlacementBreakdown;
