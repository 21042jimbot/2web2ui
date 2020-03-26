import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { updateMessageEventsSearchOptions, getDocumentation } from 'src/actions/messageEvents';
import { Modal } from '@sparkpost/matchbox';
import { Button, WindowEvent } from 'src/components/matchbox';
import { onEscape } from 'src/helpers/keyEvents';
import { getFiltersFromSearchQueries } from '../helpers/transformData.js';
import SearchForm from './SearchForm';
import _ from 'lodash';

export class AdvancedFiltersModal extends Component {
  state = {
    modalOpen: false,
  };

  componentDidMount() {
    this.props.getDocumentation();
  }

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  handleApply = values => {
    const { searchQuery, ...events } = values;
    const filteredSearchQuery = searchQuery.filter(({ value }) => Boolean(value));
    const filters = getFiltersFromSearchQueries(filteredSearchQuery);
    const enabledEventsArray = Object.keys(events).filter(key => Boolean(events[key]));
    this.props.updateMessageEventsSearchOptions({ events: enabledEventsArray, ...filters });
    this.toggleModal();
  };

  handleKeyDown = e => {
    const { modalOpen } = this.state;
    if (!modalOpen) {
      return;
    }
    onEscape(this.toggleModal)(e);
  };

  render() {
    const { modalOpen } = this.state;
    return (
      <Fragment>
        <Button onClick={this.toggleModal}>Add Filters</Button>
        <Modal open={modalOpen} onClose={this.toggleModal}>
          <WindowEvent event="keydown" handler={this.handleKeyDown} />
          <SearchForm handleApply={this.handleApply} handleCancel={this.toggleModal} />
        </Modal>
      </Fragment>
    );
  }
}

export default connect(null, { updateMessageEventsSearchOptions, getDocumentation })(
  AdvancedFiltersModal,
);
