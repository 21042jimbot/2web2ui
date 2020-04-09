import React from 'react';
import { Grid } from 'src/components/matchbox';
import { ExternalLink } from 'src/components/links';
import styles from './OverviewHelpCopy.module.scss';

const OverviewHelpCopy = () => (
  <Grid>
    <Grid.Column xs={12} lg={5}>
      <p className={styles.Paragraph}>
        Compare your email health to the rest of the SparkPost network. Drill down into any issues
        you find to improve your email performance. Contact us if you have any questions!{' '}
        <ExternalLink to="https://www.sparkpost.com/docs/signals/overview/#health-score">
          Learn More
        </ExternalLink>
      </p>
    </Grid.Column>
  </Grid>
);

export default OverviewHelpCopy;
