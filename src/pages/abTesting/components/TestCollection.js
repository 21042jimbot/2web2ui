import React, { Component, Fragment } from 'react';
import { setSubaccountQuery } from 'src/helpers/subaccounts';

// Components
import { PageLink } from 'src/components/links';
import { ActionList, Button, Popover } from 'src/components/matchbox';
import { TableCollection } from 'src/components';
import { MoreHoriz } from '@sparkpost/matchbox-icons';
import StatusTag from './StatusTag';
import { formatDateTime } from 'src/helpers/date';

import styles from '../ListPage.module.scss';

const filterBoxConfig = {
  show: true,
  itemToStringKeys: ['name', 'id', 'status', 'test_mode'],
  exampleModifiers: ['id', 'status', 'test_mode'],
};

export class TestCollection extends Component {
  getDetailsLink = ({ id, version, subaccount_id }) =>
    `/ab-testing/${id}/${version}${setSubaccountQuery(subaccount_id)}`;

  getColumns() {
    const columns = [
      { label: 'Name', sortKey: 'name' },
      { label: 'Status', sortKey: 'status' },
      { label: 'Template', sortKey: i => i.winning_template_id || i.default_template.template_id },
      { label: 'Last Modified', sortKey: 'updated_at' },
      null,
    ];

    return columns;
  }

  getRowData = ({
    id,
    version,
    subaccount_id,
    name,
    status,
    updated_at,
    default_template,
    winning_template_id,
  }) => {
    const actions = [
      {
        content: 'Edit Test',
        to: this.getDetailsLink({ id, version, subaccount_id }),
        component: PageLink,
        visible: status === 'scheduled' || status === 'draft',
        section: 1,
      },
      {
        content: 'View Test',
        to: this.getDetailsLink({ id, version, subaccount_id }),
        component: PageLink,
        visible: status === 'running' || status === 'cancelled' || status === 'completed',
        section: 1,
      },
      {
        content: 'Reschedule Test',
        to: {
          pathname: this.getDetailsLink({ id, version }),
          search: setSubaccountQuery(subaccount_id),
          state: {
            rescheduling: true,
          },
        },
        component: PageLink,
        visible: status === 'completed' || status === 'cancelled',
        section: 1,
      },
      {
        content: 'Cancel Test',
        visible: status === 'scheduled' || status === 'running',
        section: 2,
        onClick: () => this.props.toggleCancel(id, subaccount_id),
      },
      {
        content: 'Delete Test',
        section: 2,
        onClick: () => this.props.toggleDelete(id, subaccount_id),
      },
    ];

    const template = winning_template_id ? (
      <Fragment>
        <span className={styles.Winner}>Winner:</span> {winning_template_id}
      </Fragment>
    ) : (
      default_template.template_id
    );

    return [
      <Fragment>
        <p className={styles.Name}>
          <strong>
            <PageLink to={this.getDetailsLink({ id, version, subaccount_id })}>{name}</PageLink>
          </strong>
        </p>
        <p className={styles.Id}>ID: {id}</p>
      </Fragment>,
      <StatusTag status={status} />,
      <p className={styles.Template}>{template}</p>,
      <p className={styles.LastUpdated}>{formatDateTime(updated_at)}</p>,
      <div style={{ textAlign: 'right' }}>
        <Popover
          id={`popover-actions-for-${id}`}
          left
          trigger={
            <Button aria-describedby={`popover-actions-for-${id}`} flat size="large">
              <MoreHoriz size={21} />
            </Button>
          }
        >
          <ActionList actions={actions} />
        </Popover>
      </div>,
    ];
  };

  render() {
    const { abTests } = this.props;
    return (
      <TableCollection
        columns={this.getColumns()}
        rows={abTests}
        getRowData={this.getRowData}
        pagination={true}
        filterBox={filterBoxConfig}
        defaultSortColumn="updated_at"
        defaultSortDirection="desc"
      />
    );
  }
}

export default TestCollection;
