import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link, withRouter } from 'react-router-dom';

import { Page, Grid } from '@sparkpost/matchbox';

import {
  getRecipientList,
  updateRecipientList,
  deleteRecipientList,
  validateRecipientList
} from 'src/actions/recipientLists';

import { showAlert } from 'src/actions/globalAlert';
import { Loading, DeleteModal } from 'src/components';

import RecipientListForm from './components/RecipientListForm';

export class EditPage extends Component {
  state = {
    showDelete: false
  };

  startValidation = () => {
    const { validateRecipientList, current } = this.props;
    validateRecipientList(current.id);
  }

  toggleDelete = () => this.setState({ showDelete: !this.state.showDelete });

  secondaryActions = [
    {
      content: 'Delete',
      onClick: this.toggleDelete
    },
    {
      content: 'Validate List',
      onClick: this.startValidation
    }
  ];

  deleteRecipientList = () => {
    const { current, deleteRecipientList, showAlert, history } = this.props;

    return deleteRecipientList(current.id).then(() => {
      showAlert({
        type: 'success',
        message: 'Deleted recipient list'
      });
      history.push('/lists/recipient-lists');
    });
  };

  updateRecipientList = (values) => {
    const { updateRecipientList, showAlert, history } = this.props;

    return updateRecipientList(values).then(() => {
      showAlert({
        type: 'success',
        message: 'Updated recipient list'
      });
      history.push('/lists/recipient-lists');
    });
  };

  componentDidMount() {
    const {
      match: { params: { id }},
      getRecipientList,
      history
    } = this.props;

    return getRecipientList(id).catch((err) => {
      history.push('/lists/recipient-lists');
    });
  }

  render() {
    const { loading } = this.props;

    if (loading) {
      return <Loading />;
    }

    return <Page
      title='Update Recipient List'
      secondaryActions={this.secondaryActions}
      breadcrumbAction={{
        content: 'Recipient Lists',
        Component: Link,
        to: '/lists/recipient-lists' }}>
      <Grid>
        <Grid.Column xs={12} md={4} lg={4}>
          <RecipientListForm editMode={true} onSubmit={this.updateRecipientList} />
        </Grid.Column>
        <Grid.Column xs={12} md={4} lg={4}>
        </Grid.Column>
      </Grid>

      <DeleteModal
        open={this.state.showDelete}
        title='Are you sure you want to delete this recipient list?'
        content={<p>The recipient list will be immediately and permanently removed. This cannot be undone.</p>}
        onCancel={this.toggleDelete}
        onDelete={this.deleteRecipientList}
      />
    </Page>;
  }
}

const mapStateToProps = (state) => ({
  current: state.recipientLists.current,
  loading: state.recipientLists.currentLoading,
  list: state.recipientLists.list,
  error: state.recipientLists.error
});

const mapDispatchToProps = {
  getRecipientList,
  updateRecipientList,
  deleteRecipientList,
  showAlert,
  validateRecipientList
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditPage));
