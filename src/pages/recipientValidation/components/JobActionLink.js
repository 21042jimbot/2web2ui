import React from 'react';
import { Button } from 'src/components/matchbox';
import { Cached, FileDownload, PlaylistAddCheck } from '@sparkpost/matchbox-icons';
import DownloadLink from 'src/components/downloadLink/DownloadLink';
import PageLink from 'src/components/pageLink/PageLink';

const JobActionLink = ({ jobId, fileHref, status }) => {
  if (status === 'error') {
    return null;
  }

  if (status === 'queued_for_batch') {
    return (
      <Button
        component={PageLink}
        to={`/recipient-validation/list/${jobId}`}
        flat
        color="orange"
        size="small"
      >
        <span>Review</span>&nbsp;
        <PlaylistAddCheck/>
      </Button>
    );
  }

  if (status === 'success') {
    return (
      <DownloadLink
        component={Button}
        to={fileHref}
        flat
        color="orange"
        size="small"
      >
        <span>Download</span>&nbsp;
        <FileDownload />
      </DownloadLink>
    );
  }

  return (
    <Button
      component={PageLink}
      to={`/recipient-validation/list/${jobId}`}
      flat
      color="orange"
      size="small"
    >
      <span>See Progress</span>&nbsp;
      <Cached />
    </Button>
  );
};

export default JobActionLink;
