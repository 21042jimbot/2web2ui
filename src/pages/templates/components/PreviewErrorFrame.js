import React from 'react';
import { Warning } from '@sparkpost/matchbox-icons';
import styles from './PreviewErrorFrame.module.scss';

const PreviewErrorFrame = () => (
  <div className={styles.PreviewErrorFrame}>
    <Warning size={72} />
    <h1>Oh no! An Error Occurred</h1>
    <p>
      We are unable to load your template preview due to an error.
    </p>
    <p>
      If you notice this happens often, check your substitution data or code syntax as
      these are frequent causes of preview errors.
    </p>
  </div>
);

export default PreviewErrorFrame;
