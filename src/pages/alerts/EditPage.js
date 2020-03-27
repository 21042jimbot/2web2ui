import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Page } from 'src/components/matchbox';
import withEditPage from './containers/EditPage.container';
import AlertForm from './components/AlertForm';
import formatFormValues from './helpers/formatFormValues';
import { Loading } from 'src/components';
import RedirectAndAlert from 'src/components/globalAlert/RedirectAndAlert';

export class EditPage extends Component {
  componentDidMount() {
    const { getAlert, id } = this.props;
    getAlert({ id });
  }

  handleUpdate = values => {
    const { updateAlert, showUIAlert, history, id } = this.props;
    return updateAlert({
      id,
      data: formatFormValues(values),
    }).then(() => {
      showUIAlert({ type: 'success', message: 'Alert updated' });
      history.push(`/alerts/details/${id}`);
    });
  };

  render() {
    const { loading, getError, getLoading, id } = this.props;

    if (getLoading) {
      return <Loading />;
    }

    if (getError) {
      return (
        <RedirectAndAlert
          to={`/alerts/details/${id}`}
          alert={{ type: 'error', message: getError.message }}
        />
      );
    }

    return (
      <Page
        title="Edit Alert"
        breadcrumbAction={{
          content: 'Back to Alert',
          to: `/alerts/details/${id}`,
          component: Link,
        }}
      >
        <AlertForm submitting={loading} onSubmit={this.handleUpdate} isNewAlert={false} />
      </Page>
    );
  }
}

export default withEditPage(EditPage);
