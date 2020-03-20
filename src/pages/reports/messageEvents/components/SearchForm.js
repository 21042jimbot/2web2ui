import React, { Component } from 'react';
import { Button, Panel } from 'src/components/matchbox';
import { FieldArray, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import styles from './SearchForm.module.scss';
import { FORMS } from 'src/constants';
import EventTypeFilters from './EventTypeFilters';
import { getSearchQueriesFromFilters, getBooleanEventsObject } from '../helpers/transformData.js';
import { selectMessageEventListing } from 'src/selectors/eventListing';
import { getDocumentation, updateMessageEventsSearchOptions } from 'src/actions/messageEvents';
import SearchQuery from './SearchQuery';

const defaultFilters = [
  { key: 'recipient_domains' },
  { key: 'from_addresses' },
  { key: 'subjects' },
];

export class SearchForm extends Component {
  render() {
    const { handleSubmit, handleApply, handleCancel, eventListing } = this.props;
    return (
      <form onSubmit={handleSubmit(handleApply)}>
        <Panel title="Advanced Filters">
          <Panel.Section>
            <EventTypeFilters eventTypeDocs={eventListing} />
          </Panel.Section>
          <Panel.Section>
            <FieldArray component={SearchQuery} name="searchQuery" />
            <p>All filters accept comma-separated values.</p>
          </Panel.Section>
          <Panel.Section>
            <Button primary submit>
              Apply Filters
            </Button>
            <Button className={styles.Cancel} onClick={handleCancel}>
              Cancel
            </Button>
          </Panel.Section>
        </Panel>
      </form>
    );
  }
}

const mapStateToProps = state => {
  const queryFilters = getSearchQueriesFromFilters(state.messageEvents.search);
  const initialFilters = queryFilters.length ? queryFilters : defaultFilters;

  return {
    initialValues: {
      searchQuery: [...initialFilters, {}],
      ...getBooleanEventsObject(state.messageEvents.search.events),
    },
    eventListing: selectMessageEventListing(state),
  };
};
export default connect(mapStateToProps, { updateMessageEventsSearchOptions, getDocumentation })(
  reduxForm({ form: FORMS.EVENTS_SEARCH, touchOnChange: true })(SearchForm),
);
