import React from 'react';
import BackupCodesList from './BackupCodesList';
import DownloadCodes from './DownloadCodes';
import CopyCodes from './CopyCodes'; //todo use CopyToClipboard component
import PrintCodes from './PrintCodes';
import { Button } from 'src/components/matchbox';

const BackupCodes = ({ codes }) => (
  <div>
    <p><strong>Your shiny new backup codes:</strong></p>
    <Button.Group>
      <BackupCodesList codes={codes} />
      <DownloadCodes codes={codes} />
      <CopyCodes codes={codes} />
      <PrintCodes codes={codes} />
    </Button.Group>
  </div>
);

export default BackupCodes;
