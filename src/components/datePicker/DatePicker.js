/* eslint-disable max-lines */
import React, { Component } from 'react';
import { subMonths, format } from 'date-fns';
import {
  getStartOfDay,
  getEndOfDay,
  getRelativeDateOptions,
  getNextHour,
  isSameDate,
} from 'src/helpers/date';
import { roundBoundaries, getRollupPrecision, getPrecision } from 'src/helpers/metrics';
import { Button, Error, Popover, Select, TextField, WindowEvent } from 'src/components/matchbox';
import DateSelector from 'src/components/dateSelector/DateSelector';
import ManualEntryForm from './ManualEntryForm';
import { FORMATS } from 'src/constants';
import styles from './DatePicker.module.scss';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class DatePicker extends Component {
  DATE_FORMAT = FORMATS.LONG_DATETIME;
  state = {
    showDatePicker: false,
    selecting: false,
    selected: {},
    validationError: null,
    selectedPrecision: undefined,
  };

  componentDidMount() {
    this.syncTimeToState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.from !== this.props.from ||
      nextProps.to !== this.props.to ||
      nextProps.precision !== this.props.precision
    ) {
      this.syncTimeToState(nextProps);
    }
  }

  //For metrics rollup, update the precision display when precision changes
  componentDidUpdate(prevProps, prevState) {
    const { selectedPrecision, showDatePicker } = this.state;
    const { updateShownPrecision } = this.props;
    if (updateShownPrecision) {
      //closing datepicker resets to the actual precision
      if (prevState.showDatePicker && !showDatePicker) {
        return updateShownPrecision('');
      }
      if (prevState.selectedPrecision !== selectedPrecision && showDatePicker) {
        return updateShownPrecision(selectedPrecision);
      }
    }
  }

  // Sets local state from reportOptions redux state - need to separate to handle pre-apply state
  syncTimeToState = ({ from, to, precision }) => {
    if (from && to) {
      const selectedPrecision = this.props.selectPrecision && precision;
      this.setState({ selected: { from, to }, selectedPrecision });
    }
  };

  // Closes popover on escape, submits on enter
  handleKeyDown = e => {
    if (!this.state.showDatePicker) {
      return;
    }

    if (e.key === 'Escape') {
      this.cancelDatePicker();
    }

    if (!this.state.selecting && e.key === 'Enter') {
      this.handleSubmit();
    }
  };

  handleDayKeyDown = (day, modifiers, e) => {
    this.handleKeyDown(e);
    e.stopPropagation();
  };

  cancelDatePicker = () => {
    this.syncTimeToState(this.props);
    this.setState({ showDatePicker: false });
  };

  showDatePicker = () => {
    this.setState({ showDatePicker: true });
  };

  handleDayClick = clicked => {
    const { selecting, selected } = this.state;
    const { validate, selectPrecision } = this.props;

    const dates = selecting
      ? selected
      : {
          from: this.fromFormatter(clicked),
          to: getEndOfDay(clicked, { preventFuture: this.props.preventFuture }),
        };

    const validationError = validate && validate(dates);

    if (selecting && validationError) {
      this.setState({ validationError });
      return;
    }

    this.setState({
      selected: dates,
      beforeSelected: dates,
      selecting: !selecting,
      validationError: null,
      selectedPrecision:
        selectPrecision &&
        getRollupPrecision({ from: dates.from, to: dates.to, precision: this.props.precision }),
    });
  };

  handleDayHover = hovered => {
    const { selecting } = this.state;

    if (selecting) {
      const { from, to, precision } = this.getOrderedRange(hovered);
      this.setState({ selected: { from, to }, selectedPrecision: precision });
    }
  };

  getOrderedRange(newDate) {
    let { from, to } = this.state.beforeSelected;
    const { preventFuture, selectPrecision, precision: oldPrecision } = this.props;
    if (from.getTime() <= newDate.getTime()) {
      to = getEndOfDay(newDate, { preventFuture });
    } else {
      from = this.fromFormatter(newDate);
    }
    //Changes datepicker precision if the current set precision is not available
    const precision = getRollupPrecision({
      from,
      to,
      precision: selectPrecision && oldPrecision,
    });
    if (this.props.roundToPrecision) {
      const rounded = roundBoundaries({ from, to, precision });
      from = rounded.from.toDate();
      to = rounded.to.toDate();
    }
    return { from, to, precision };
  }

  handleSelectRange = e => {
    const value = e.currentTarget.value;

    if (value === 'custom') {
      this.setState({ showDatePicker: true });
    } else {
      this.setState({ showDatePicker: false });
      this.props.onChange({ relativeRange: value });
    }
  };

  handleFormDates = ({ from, to, precision }, callback) => {
    const selectedPrecision = this.props.selectPrecision ? precision : undefined;

    this.setState({ selected: { from, to }, selectedPrecision }, () => callback());
  };

  handleSubmit = () => {
    const { validate } = this.props;
    const selectedDates = this.state.selected;
    const validationError = validate && validate(selectedDates);
    if (validationError) {
      this.setState({ validationError });
      return;
    }

    this.setState({ showDatePicker: false, selecting: false, validationError: null });
    this.props.onChange({
      ...selectedDates,
      relativeRange: 'custom',
      precision:
        this.state.selectedPrecision ||
        getPrecision(moment(selectedDates.from), moment(selectedDates.to)),
    });
  };

  handleTextUpdate = () => {
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  };

  fromFormatter = fromDate => {
    const isDateToday = isSameDate(getStartOfDay(fromDate), getStartOfDay(new Date()));
    const formatter = this.props.fromSelectsNextHour && isDateToday ? getNextHour : getStartOfDay;
    return formatter(fromDate);
  };

  render() {
    const {
      selected: { from, to },
      showDatePicker,
      validationError,
      selectedPrecision,
    } = this.state;
    const selectedRange = showDatePicker ? 'custom' : this.props.relativeRange;

    // allow for prop-level override of "now" (DI, etc.)
    const {
      now = new Date(),
      relativeDateOptions = [],
      disabled,
      datePickerProps = {},
      textFieldProps = {},
      dateFieldFormat,
      roundToPrecision,
      preventFuture,
      showPresets = true,
      error,
      left,
      hideManualEntry,
      precision,
      selectPrecision,
      id = 'date-picker', // When multiple <DatePicker/> components are present, each one will need a unique `id`. This is a safe default.
    } = this.props;

    const dateFormat = dateFieldFormat || this.DATE_FORMAT;
    const rangeSelect = showPresets ? (
      <>
        <label className={styles.Label} htmlFor={`range-select-${id}`}>
          Broad Date Range
        </label>

        <Select
          id={`range-select-${id}`}
          options={getRelativeDateOptions(relativeDateOptions)}
          onChange={this.handleSelectRange}
          value={selectedRange}
          disabled={disabled}
        />
      </>
    ) : null;

    const dateField = (
      <>
        <label className={styles.Label} htmlFor={`date-field-${id}`}>
          Narrow Date Range
        </label>

        <TextField
          id={`date-field-${id}`}
          onClick={this.showDatePicker}
          connectLeft={rangeSelect}
          value={`${format(from, dateFormat)} – ${format(to, dateFormat)}`}
          readOnly
          onBlur={this.handleTextUpdate}
          error={error}
          disabled={disabled}
          {...textFieldProps}
        />
      </>
    );

    return (
      <Popover
        wrapper="div"
        className={styles.Popover}
        trigger={dateField}
        onClose={this.cancelDatePicker}
        open={this.state.showDatePicker}
        left={left}
      >
        <DateSelector
          numberOfMonths={2}
          fixedWeeks
          enableOutsideDays={false}
          initialMonth={subMonths(now, 1)}
          toMonth={now}
          disabledDays={{ after: now }}
          onDayClick={this.handleDayClick}
          onDayMouseEnter={this.handleDayHover}
          onDayFocus={this.handleDayHover}
          onKeyDown={this.handleKeyDown}
          onDayKeyDown={this.handleDayKeyDown}
          selectedDays={this.state.selected}
          {...datePickerProps}
        />

        {!hideManualEntry && (
          <ManualEntryForm
            selectDates={this.handleFormDates}
            onEnter={this.handleKeyDown}
            to={to}
            from={from}
            roundToPrecision={roundToPrecision}
            preventFuture={preventFuture}
            selectedPrecision={selectedPrecision}
            defaultPrecision={selectPrecision && precision}
          />
        )}
        <Button
          primary
          onClick={this.handleSubmit}
          className={styles.Apply}
          data-id="date-picker-custom-apply"
        >
          Apply
        </Button>
        <Button onClick={this.cancelDatePicker}>Cancel</Button>
        {validationError && (
          <span className={styles.Error}>
            <Error wrapper="span" error={validationError}></Error>
          </span>
        )}

        <WindowEvent event="keydown" handler={this.handleKeyDown} />
      </Popover>
    );
  }
}

DatePicker.propTypes = {
  now: PropTypes.instanceOf(Date),
  from: PropTypes.instanceOf(Date),
  to: PropTypes.instanceOf(Date),
  relativeRange: PropTypes.string,
  relativeDateOptions: PropTypes.arrayOf(PropTypes.string),
  roundToPrecision: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  datePickerProps: PropTypes.object,
  dateFieldFormat: PropTypes.string,
  disabled: PropTypes.bool,
  showPresets: PropTypes.bool,
  hideManualEntry: PropTypes.bool,
  selectPrecision: PropTypes.bool,
};

DatePicker.defaultProps = {
  preventFuture: true,
  roundToPrecision: false,
};
