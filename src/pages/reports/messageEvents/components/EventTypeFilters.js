import React from 'react';
import { Checkbox } from '@sparkpost/matchbox';
import styles from './AdvancedFilters.module.scss';

const EventTypeFilters = ({ eventTypeDocs, checkedTypes, onChange }) => <Checkbox.Group label='Event Type'>
  <div className={styles.CheckBoxGrid}>
    {eventTypeDocs.map((evtDoc) => <Checkbox
      id={evtDoc.type}
      key={evtDoc.type}
      onChange={() => onChange(evtDoc.type)}
      label={evtDoc.displayName}
      helpText={evtDoc.description}
      checked={checkedTypes[evtDoc.type] || false}
    />
    )}
  </div>
</Checkbox.Group>;

export default EventTypeFilters;
