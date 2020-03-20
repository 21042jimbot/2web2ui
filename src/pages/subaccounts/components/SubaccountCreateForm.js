import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';

import { Panel } from '@sparkpost/matchbox';
import { Button } from 'src/components/matchbox';
import { getSubaccountGrants, getInitialSubaccountGrants } from 'src/selectors/api-keys';
import { getIpPools, selectFirstIpPoolId } from 'src/selectors/ipPools';

import { NameField, ApiKeyCheckBox, ApiKeyFields } from './formFields';
import IpPoolSelect from './IpPoolSelect';
import RestrictToIpPoolCheckbox from './RestrictToIpPoolCheckbox';

export class SubaccountCreateForm extends Component {
  render() {
    const {
      handleSubmit,
      pristine,
      showGrants,
      grants,
      submitting,
      createApiKey,
      ipPools,
      restrictedToIpPool,
    } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Panel.Section>
          <NameField disabled={submitting} />
        </Panel.Section>
        <Panel.Section>
          <ApiKeyCheckBox disabled={submitting} createApiKey={createApiKey} />
          <ApiKeyFields
            show={createApiKey}
            showGrants={showGrants}
            grants={grants}
            submitting={submitting}
          />
        </Panel.Section>
        {Boolean(ipPools.length) && (
          <Panel.Section>
            <RestrictToIpPoolCheckbox disabled={submitting} />
            {restrictedToIpPool && <IpPoolSelect disabled={submitting} options={ipPools} />}
          </Panel.Section>
        )}
        <Panel.Section>
          <Button submit primary disabled={submitting || pristine}>
            {submitting ? 'Loading...' : 'Create Subaccount'}
          </Button>
        </Panel.Section>
      </form>
    );
  }
}

const formName = 'SubaccountCreateForm';
const valueSelector = formValueSelector(formName);

const mapStateToProps = state => ({
  grants: getSubaccountGrants(state),
  createApiKey: valueSelector(state, 'createApiKey'),
  showGrants: valueSelector(state, 'grantsRadio') === 'select',
  ipPools: getIpPools(state),
  restrictedToIpPool: valueSelector(state, 'restrictedToIpPool'),
  initialValues: {
    grants: getInitialSubaccountGrants(state),
    grantsRadio: 'all',
    createApiKey: true,
    restrictedToIpPool: false,
    ipPool: selectFirstIpPoolId(state),
  },
});

const SubaccountReduxForm = reduxForm({ form: formName })(SubaccountCreateForm);
export default connect(mapStateToProps, {})(SubaccountReduxForm);
