import _ from 'lodash';
import React, { Component } from 'react';
import { Field, Form } from 'redux-form';
// Components
import { Panel, Grid, Button, Expandable, Error } from '@sparkpost/matchbox';
import { TextFieldWrapper, SelectWrapper } from 'src/components';
import FilterFields from './fields/FilterFields';
import EvaluatorFields from './fields/EvaluatorFields';
import SubaccountField from './fields/SubaccountsField';
import { getFormSpec } from '../helpers/alertForm';
import {
  METRICS,
  REALTIME_FILTERS,
  NOTIFICATION_CHANNELS,
  NOTIFICATION_CHANNEL_DATA,
} from '../constants/formConstants';
import styles from './AlertForm.module.scss';
import withAlertForm from './AlertForm.container';
// Helpers & Validation
import { maxLength, required } from 'src/helpers/validation';

const metricOptions = [
  { value: '', label: 'Select Metric', disabled: true },
  ...Object.keys(METRICS).map(key => ({ label: METRICS[key], value: key })),
];

export class AlertForm extends Component {
  resetFormValues = event => {
    const { change, isNewAlert, isDuplicate } = this.props;
    const formSpec = getFormSpec(event.target.value);
    const { defaultFieldValues, defaultRecommendedValue } = formSpec;
    REALTIME_FILTERS.forEach(filter => {
      change(filter, []);
    });
    change('single_filter', { filter_type: 'none', filter_values: [] });
    defaultFieldValues.forEach(({ fieldName, fieldValue }) => {
      change(fieldName, fieldValue);
    });

    if (defaultRecommendedValue && isNewAlert && !isDuplicate) {
      change('value', defaultRecommendedValue);
    }
  };

  renderNotificationChannels = () =>
    NOTIFICATION_CHANNELS.map(channel => (
      <Expandable
        icon={NOTIFICATION_CHANNEL_DATA[channel].icon}
        title={_.upperFirst(channel)}
        id={channel}
        subtitle={NOTIFICATION_CHANNEL_DATA[channel].subtitle}
        key={channel}
      >
        <Field
          name={channel}
          component={TextFieldWrapper}
          disabled={this.props.submitting}
          {...NOTIFICATION_CHANNEL_DATA[channel].fieldProps}
        />
      </Expandable>
    ));

  isNotificationChannelsEmpty = (formMeta, formErrors) =>
    NOTIFICATION_CHANNELS.some(
      channel =>
        formMeta[channel] &&
        formMeta[channel].touched &&
        formErrors[channel] === 'At least one notification channel must not be empty',
    );

  render() {
    const {
      featureFlaggedAlerts,
      pristine,
      submitting,
      metric,
      handleSubmit,
      hasSubaccounts,
      formErrors,
      formMeta,
      isNewAlert,
      isDuplicate,
      initialValues,
    } = this.props;

    const submitText = submitting ? 'Submitting...' : isNewAlert ? 'Create Alert' : 'Update Alert';
    const isSubmitDisabled = (pristine && !isDuplicate) || submitting; //Allows user to create the same alert if if's a duplicate
    const formSpec = getFormSpec(metric);
    const channelsError = this.isNotificationChannelsEmpty(formMeta, formErrors);

    const visibleMetricOptions = metricOptions.filter(option => {
      // show all metrics when feature flag is not defined
      if (!featureFlaggedAlerts.hasOwnProperty(option.value)) {
        return true;
      }

      // hide metric on create form when flag is disabled
      if (isNewAlert && !isDuplicate && !featureFlaggedAlerts[option.value]) {
        return false;
      }

      // hide metric on edit and duplicate forms when metric is a flagged metric or flag is disabled
      if (
        (!isNewAlert || isDuplicate) &&
        initialValues.metric !== option.value &&
        !featureFlaggedAlerts[option.value]
      ) {
        return false;
      }

      return true;
    });

    return (
      <Form onSubmit={handleSubmit}>
        <Panel className={styles.Form}>
          <Grid>
            <Grid.Column sm={12} md={11} lg={9}>
              <Panel.Section>
                <label>Alert Name</label>
                <Field
                  name="name"
                  component={TextFieldWrapper}
                  disabled={submitting}
                  validate={[required, maxLength(50)]}
                />
                <div className={styles.MetricSelector}>
                  <label>Alert Metric</label>
                  <Field
                    name="metric"
                    component={SelectWrapper}
                    options={visibleMetricOptions}
                    onChange={this.resetFormValues}
                    validate={required}
                    disabled={submitting || !isNewAlert}
                  />
                </div>
                {metric !== '' && !formSpec.hideEvaluator && (
                  <div className={styles.Evaluator}>
                    <EvaluatorFields
                      key={metric}
                      disabled={submitting}
                      shouldUpdateRecommendation={isNewAlert && !isDuplicate}
                      isNewAlert={isNewAlert}
                    />
                  </div>
                )}
                {formSpec.hasFilters && (
                  <div className={styles.Filters}>
                    <label>
                      <h5>
                        Filtered by{' '}
                        <small className={styles.OptionalText}>
                          Add up to 10 filters to your alert.
                        </small>
                      </h5>
                    </label>
                    {!formSpec.hideSubaccountFilter && hasSubaccounts && (
                      <SubaccountField disabled={submitting} />
                    )}
                    <FilterFields disabled={submitting} />
                  </div>
                )}
                <div className={styles.Notifications}>
                  <label> Notify Me</label>
                  {channelsError && (
                    <Error
                      wrapper="div"
                      error="At least one notification channel must be not empty"
                    />
                  )}
                  {this.renderNotificationChannels()}
                </div>
                <Button submit primary disabled={isSubmitDisabled} className={styles.SubmitButton}>
                  {submitText}
                </Button>
              </Panel.Section>
            </Grid.Column>
          </Grid>
        </Panel>
      </Form>
    );
  }
}

AlertForm.defaultProps = { metric: '' };

export default withAlertForm(AlertForm);
