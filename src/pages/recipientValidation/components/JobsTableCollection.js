import React from 'react';
import { Table } from '@sparkpost/matchbox';
import { TableCollection, NewCollectionBody } from 'src/components/collection';
import { formatDateTime } from 'src/helpers/date';
import withJobs from '../containers/withJobs';
import JobFileName from './JobFileName';
import JobAddressCount from './JobAddressCount';
import JobActionLink from './JobActionLink';
import JobStatusTag from './JobStatusTag';

export const JobsTableCollection = ({ jobs }) => {
  const columns = [
    {
      dataCellComponent: ({ filename }) => <JobFileName filename={filename} />,
      header: {
        label: 'File Name',
        sortKey: 'filename',
      },
    },
    {
      dataCellComponent: ({ uploadedAt }) => formatDateTime(uploadedAt),
      header: {
        label: 'Date Uploaded',
        sortKey: 'uploadedAt',
      },
    },
    {
      dataCellComponent: ({ status }) => <JobStatusTag status={status} />,
      header: {
        label: 'Status',
        sortKey: 'status',
      },
    },
    {
      dataCellComponent: ({ addressCount, status }) => (
        <JobAddressCount count={addressCount} status={status} />
      ),
      header: {
        label: 'Total',
        sortKey: 'addressCount',
      },
    },
    {
      dataCellComponent: ({ rejectedUrl, status, jobId }) => (
        <JobActionLink fileHref={rejectedUrl} status={status} jobId={jobId} />
      ),
      header: {
        label: 'Actions',
      },
    },
  ];

  const TableWrapper = props => (
        <Table>{props.children}</Table>
  );

  const renderRow = columns => props =>
    columns.map(({ dataCellComponent: DataCellComponent }) => <DataCellComponent {...props} />);

  return (
    <TableCollection
      columns={columns.map(({ header }) => header)}
      defaultSortColumn="uploadedAt"
      defaultSortDirection="desc"
      getRowData={renderRow(columns)}
      rows={jobs}
      pagination
      title="Recent Validations"
      wrapperComponent={TableWrapper}
    >
      {props => <NewCollectionBody {...props} />}
    </TableCollection>
  );
};

export default withJobs(JobsTableCollection);
