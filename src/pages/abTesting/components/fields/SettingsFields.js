import React from 'react';
import { Field } from 'redux-form';
import { OGOnlyWrapper, Panel } from 'src/components/matchbox';
import { TextFieldWrapper, RadioGroup } from 'src/components/reduxFormWrappers';
import { numberBetween, integer, minNumber } from 'src/helpers/validation';

const SettingsFields = ({ disabled, formValues = {} }) => (
  <div>
    <OGOnlyWrapper as={Panel}>
      <Panel.Section>
        <Field
          name="test_mode"
          component={RadioGroup}
          label="Select a Test Mode"
          disabled={disabled}
          options={[
            {
              label: 'Bayesian Mode',
              value: 'bayesian',
              helpText:
                'Once the test completes, the best performing template will be used in subsequent transmissions in place of the default.',
            },
            {
              label: 'Learning Mode',
              value: 'learning',
              helpText:
                'Once the test completes, the default template will be used in subsequent transmissions.',
            },
          ]}
        />
      </Panel.Section>
      {formValues.test_mode === 'bayesian' && (
        <Panel.Section>
          <Field
            name="confidence_level"
            component={TextFieldWrapper}
            label="At what confidence level should we pick and start sending a winner?"
            type="number"
            step="0.01"
            validate={numberBetween(0, 1)}
            disabled={disabled}
          />
        </Panel.Section>
      )}
    </OGOnlyWrapper>
    <OGOnlyWrapper as={Panel}>
      <Panel.Section>
        <Field
          name="metric"
          grid={{ xs: 6 }}
          component={RadioGroup}
          label="How should we determine a winning variant?"
          options={[
            { label: 'By Unique Click Rate', value: 'count_unique_clicked' },
            { label: 'By Unique Open Rate', value: 'count_unique_confirmed_opened' },
          ]}
          disabled={disabled}
        />
        <Field
          name="engagement_timeout"
          component={TextFieldWrapper}
          label="How long would you like to continue to collect engagement events after the last delivery?"
          helpText="By default, we continue to collect engagement events for 24 hours after the last delivery."
          suffix="hours"
          type="number"
          validate={[integer, minNumber(1)]}
          disabled={disabled}
        />
      </Panel.Section>
    </OGOnlyWrapper>
    <OGOnlyWrapper as={Panel}>
      <Panel.Section>
        <Field
          name="audience_selection"
          grid={{ xs: 6 }}
          component={RadioGroup}
          label={"How should we distribute this test's variants?"}
          options={[
            { label: 'By Percent', value: 'percent' },
            { label: 'By Number of Messages', value: 'sample_size' },
          ]}
          bottomError={true}
          disabled={disabled}
        />
      </Panel.Section>
    </OGOnlyWrapper>
  </div>
);

export default SettingsFields;
