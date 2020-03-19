import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { getBatches } from 'src/actions/webhooks';
import PanelLoading from 'src/components/panelLoading/PanelLoading';

import { Panel } from '@sparkpost/matchbox';
import { Button } from 'src/components/matchbox';
import { TableCollection, Empty } from 'src/components';
import { selectWebhookBatches } from 'src/selectors/webhooks';

const columns = [
  { label: 'Delivery Time', sortKey: 'ts' }, //This is timestamp
  { label: 'Batch ID', sortKey: 'batch_id' },
  { label: 'Status', sortKey: 'status' },
  { label: 'Attempt #', sortKey: 'attempts' },
  { label: 'Response', sortKey: 'response_code' },
];

const getRowData = batch => [
  batch.formatted_time,
  batch.batch_id,
  batch.status,
  batch.attempts,
  batch.response_code,
];

export class BatchTab extends Component {
  componentDidMount() {
    this.refreshBatches();
  }

  refreshBatches = () => {
    const { webhook, getBatches } = this.props;
    const { id, subaccount } = webhook;

    return getBatches({ id, subaccount });
  };

  renderBatches() {
    const { batches, batchesLoading } = this.props;

    if (batchesLoading) {
      return <PanelLoading />;
    }

    if (_.isEmpty(batches)) {
      return <Empty message="There are no batches for your webhook" />;
    }

    return (
      <TableCollection
        columns={columns}
        rows={batches}
        getRowData={getRowData}
        pagination={true}
        defaultSortColumn="ts"
        defaultSortDirection="desc"
      />
    );
  }

  render() {
    const { batchesLoading } = this.props;
    const buttonText = batchesLoading ? 'Refreshing...' : 'Refresh Batches';

    return (
      <Panel>
        <Panel.Section>
          <Button primary size="small" disabled={batchesLoading} onClick={this.refreshBatches}>
            {buttonText}
          </Button>
        </Panel.Section>
        {this.renderBatches()}
      </Panel>
    );
  }
}

const mapStateToProps = state => ({
  batches: selectWebhookBatches(state),
  batchesLoading: state.webhooks.batchesLoading,
});

export default connect(mapStateToProps, { getBatches })(BatchTab);
