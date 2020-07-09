import React, { useReducer, useEffect, useCallback } from 'react';
import moment from 'moment';
import _ from 'lodash';
import { Grid, TextField } from 'src/components/matchbox';
import { formatInputDate, formatInputTime, parseDatetime } from 'src/helpers/date';
import {
  getValidDateRange,
  getPrecision,
  getRollupPrecision,
  getMomentPrecisionByDate,
} from 'src/helpers/metrics';
import styles from './ManualEntryForm.module.scss';

const DATE_PLACEHOLDER = '1970-01-20';
const TIME_PLACEHOLDER = '12:00am';
const DEBOUNCE = 500;

const initialState = {
  toDate: '',
  toTime: '',
  fromDate: '',
  fromTime: '',
};

const actionTypes = {
  fieldChange: 'FIELD_CHANGE',
  syncProps: 'SYNC',
};

export function ManualEntryForm(props) {
  const [state, dispatch] = useReducer((state, { type, payload }) => {
    switch (type) {
      case actionTypes.syncProps: {
        const { to, from } = payload;
        return {
          ...state,
          toDate: formatInputDate(to),
          toTime: formatInputTime(to),
          fromDate: formatInputDate(from),
          fromTime: formatInputTime(from),
        };
      }
      case actionTypes.fieldChange: {
        return { ...state, ...payload };
      }
      default:
        return state;
    }
  }, initialState);

  const syncPropsToState = useCallback(({ to, from }) => {
    dispatch({
      type: actionTypes.syncProps,
      payload: { to, from },
    });
  }, []);

  useEffect(() => {
    syncPropsToState({ to: props.to, from: props.from });
  }, [syncPropsToState, props.to, props.from]);

  const handleFieldChange = e => {
    dispatch({ type: actionTypes.fieldChange, payload: { [e.target.id]: e.target.value } });
    debounceChanges();
  };

  const debounceChanges = _.debounce(() => {
    validate();
  }, DEBOUNCE);

  const handleEnter = e => {
    if (e.key === 'Enter') {
      validate(e, true);
    }
  };

  const handleBlur = e => {
    validate(e, true);
  };

  function validate(e, shouldReset) {
    const from = parseDatetime(state.fromDate, state.fromTime);
    const to = parseDatetime(state.toDate, state.toTime);
    // allow for prop-level override of "now" (DI, etc.)
    const { now, roundToPrecision, preventFuture, defaultPrecision } = props;
    try {
      const precision = getRollupPrecision({ from, to, precision: defaultPrecision });
      const { to: roundedTo, from: roundedFrom } = getValidDateRange({
        from,
        to,
        now,
        roundToPrecision,
        preventFuture,
        precision,
      });
      return props.selectDates(
        { to: roundedTo.toDate(), from: roundedFrom.toDate(), precision },
        () => {
          if (e && e.key === 'Enter') {
            props.onEnter(e);
          }
        },
      );
    } catch (e) {
      if (shouldReset) {
        syncPropsToState(props); // Resets fields if dates are not valid
      }
    }
  }

  const { toDate, toTime, fromDate, fromTime } = state;
  const { roundToPrecision, selectedPrecision } = props;

  let precisionLabel = null;
  let precisionLabelValue;
  let shouldDisableTime;
  const from = parseDatetime(fromDate, fromTime);
  const to = parseDatetime(toDate, toTime);

  if (roundToPrecision) {
    try {
      // allow for prop-level override of "now" (DI, etc.)
      const { now = moment() } = props;
      const { from: validatedFrom, to: validatedTo } = getValidDateRange({
        from,
        to,
        now,
        roundToPrecision,
        precision: selectedPrecision,
      });

      precisionLabelValue = getPrecision(validatedFrom, validatedTo);
      shouldDisableTime = selectedPrecision
        ? ['day', 'week', 'month'].includes(selectedPrecision)
        : getMomentPrecisionByDate(validatedFrom, validatedTo) === 'days';
    } catch (e) {
      precisionLabelValue = '';
    }

    precisionLabel = !selectedPrecision && (
      <div className={styles.PrecisionLabel}>
        Precision: {_.startCase(_.words(precisionLabelValue).join(' '))}
      </div>
    );
  }

  return (
    <form onKeyDown={handleEnter} className={styles.DateFields}>
      <Grid middle="xs">
        <Grid.Column>
          <TextField
            id="fromDate"
            label="From Date"
            labelHidden
            placeholder={DATE_PLACEHOLDER}
            onChange={handleFieldChange}
            onBlur={handleBlur}
            value={fromDate}
          />
        </Grid.Column>
        <Grid.Column>
          <TextField
            id="fromTime"
            label="From Time"
            labelHidden
            placeholder={TIME_PLACEHOLDER}
            onChange={handleFieldChange}
            onBlur={handleBlur}
            value={fromTime}
            disabled={shouldDisableTime}
          />
        </Grid.Column>
        <Grid.Column>
          <TextField
            id="toDate"
            label="To Date"
            labelHidden
            placeholder={DATE_PLACEHOLDER}
            onChange={handleFieldChange}
            onBlur={handleBlur}
            value={toDate}
          />
        </Grid.Column>
        <Grid.Column>
          <TextField
            id="toTime"
            label="To Time"
            labelHidden
            placeholder={TIME_PLACEHOLDER}
            onChange={handleFieldChange}
            onBlur={handleBlur}
            value={toTime}
            disabled={shouldDisableTime}
          />
        </Grid.Column>
      </Grid>
      {precisionLabel}
    </form>
  );
}

export default ManualEntryForm;
