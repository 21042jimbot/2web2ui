import React, { Component } from 'react';

import { TableCollection } from 'src/components';
import { Panel } from 'src/components/matchbox';
import { Header, Row, TableWrapper } from './TableElements';
import RefreshAction from './RefreshAction';

import _ from 'lodash';

class HistoryTable extends Component {
  static defaultProps = {
    messageHistory: [],
  };

  createRows = () => {
    const { messageHistory, selectedId, handleEventClick } = this.props;

    return messageHistory.map(row => {
      const selected = row.event_id === selectedId;
      return {
        ...row,
        selected,
        onClick: !selected ? () => handleEventClick(row.event_id) : null,
      };
    });
  };

  render() {
    const rows = this.createRows();

    const disclaimer =
      _.get(rows[rows.length - 1], 'type') !== 'injection' ? (
        <small>Previous events may be outside our 10 day storage range.</small>
      ) : null;

    return (
      <div>
        <Panel
          title="Message History"
          actions={[
            { content: <RefreshAction />, onClick: this.props.handleRefresh, color: 'orange' },
          ]}
        >
          <TableCollection
            outerWrapper={TableWrapper}
            headerComponent={Header}
            rowComponent={Row}
            rows={rows}
            pagination={false}
          />
        </Panel>
        {disclaimer}
      </div>
    );
  }
}

export default HistoryTable;
