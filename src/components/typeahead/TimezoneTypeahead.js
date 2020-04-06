import React, { useState, useEffect, useCallback } from 'react';
import { Typeahead } from './Typeahead';
import moment from 'moment-timezone';
import styles from './Typeahead.module.scss';

const Item = ({ label }) => (
  <div className={styles.Item}>
    <span className={styles.Value}>{label}</span>
  </div>
);

const UTC_OPTION = {
  value: 'UTC',
  label: 'UTC',
};

const options = moment.tz
  .names()
  // Filter out non-standard timezones, inverse timezones (ETC/UTC-7 is equivalent to UTC+7)
  .filter(
    tz => tz.indexOf('/') >= 0 && tz.indexOf('Etc/') === -1 && moment.tz(tz).utcOffset() !== 0,
  )
  .map(tz => ({
    name: tz,
    offset: moment.tz(tz).utcOffset(),
  }))
  .sort((a, b) => a.offset - b.offset)
  .map(tz => ({
    value: tz.name,
    label: `(UTC${tz.offset ? moment.tz(tz.name).format('Z') : ''}) ${tz.name.replace(/_/g, ' ')}`,
  }));

options.unshift(UTC_OPTION);

export const TimezoneTypeahead = props => {
  const { initialValue, onChange: parentOnChange, isForcedUTC, ...rest } = props;
  const [selected, setSelected] = useState(options[0]);

  const findOptionInList = useCallback(value => options.find(option => option.value === value), []);

  // initialValue may change if it's coming from redux on parent
  useEffect(() => {
    if (initialValue) {
      setSelected(findOptionInList(initialValue));
    }
  }, [initialValue, findOptionInList]);

  useEffect(() => {
    if (isForcedUTC) {
      setSelected(UTC_OPTION);
      parentOnChange(UTC_OPTION);
    }
  }, [isForcedUTC, parentOnChange]);

  const onChange = item => {
    setSelected(item);
    if (item) {
      parentOnChange(item);
    }
  };

  return (
    <Typeahead
      renderItem={item => <Item label={item.label} />}
      itemToString={item => (item ? item.label : '')}
      placeholder="Select a Timezone"
      label="Time Zone"
      errorInLabel={false}
      error={false}
      name="timezone-typeahead"
      results={options}
      selectedItem={selected}
      onChange={onChange}
      maxNumberOfResults={options.length}
      {...rest}
    />
  );
};
