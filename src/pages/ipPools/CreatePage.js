import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Page } from '@sparkpost/matchbox';
import { Loading } from 'src/components';
import PoolForm from './components/PoolForm';

import { showAlert } from 'src/actions/globalAlert';
import { createPool, listPools } from 'src/actions/ipPools';


const breadcrumbAction = {
  content: 'IP Pools',
  Component: Link,
  to: '/account/ip-pools'
};

export class CreatePage extends Component {
  loadDependentData = () => {
    this.props.listPools();
  };

  componentDidMount() {
    this.loadDependentData();
  }

  createPool = (values) => {
    const { createPool, showAlert, history } = this.props;

    return createPool(values).then(() => {
      showAlert({
        type: 'success',
        message: `Created IP pool ${values.name}.`
      });
      history.push('/account/ip-pools');
    });
  };

  render() {
    if (this.props.loading) {
      return <Loading />;
    }

    return (
      <Page title="Create IP Pool" breadcrumbAction={breadcrumbAction}>
        <PoolForm onSubmit={this.createPool} isNew={true} />
      </Page>
    );
  }
}

const mapStateToProps = (state, props) => ({});

export default connect(mapStateToProps, {
  createPool,
  listPools,
  showAlert
})(CreatePage);
