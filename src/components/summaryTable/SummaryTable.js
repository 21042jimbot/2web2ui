import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'src/components/matchbox';
import { Pagination } from 'src/components/pagination';
import { DEFAULT_PAGE_RANGE as PAGE_RANGE } from 'src/constants';
import Body from './Body';
import Column from './Column';
import Head from './Head';
import { getColumnProps, pickPageProps } from './utils';
import OGStyles from './SummaryTable.module.scss';

export class SummaryTableClassComponent extends React.Component {
  static defaultProps = {
    // refer to reducer for other default prop values
    data: [],
    onChange: () => {},
  };

  static propTypes = {
    children: PropTypes.arrayOf(Column).isRequired,
    currentPage: PropTypes.number.isRequired,
    data: PropTypes.arrayOf(PropTypes.object),
    empty: PropTypes.bool,
    error: PropTypes.node,
    loading: PropTypes.bool,
    onChange: PropTypes.func,
    order: PropTypes.shape({
      ascending: PropTypes.bool.isRequired,
      dataKey: PropTypes.string.isRequired,
    }),
    perPage: PropTypes.number.isRequired,
    tableName: PropTypes.string.isRequired,
    totalCount: PropTypes.number.isRequired,
  };

  componentDidMount() {
    const pageProps = pickPageProps(this.props);
    this.props.onChange(pageProps);
  }

  componentDidUpdate(prevProps) {
    const pageProps = pickPageProps(this.props);
    const prevPageProps = pickPageProps(prevProps);

    if (!_.isEqual(prevPageProps, pageProps)) {
      this.props.onChange(pageProps);
    }
  }

  handlePagination = pageIndex => {
    const { changeSummaryTable, currentPage, tableName } = this.props;
    const nextPage = pageIndex + 1;

    // Guard against Pagination triggering this handler twice, first on the click event and then
    // again on the when currentPage prop is set
    if (currentPage !== nextPage) {
      changeSummaryTable(tableName, { currentPage: nextPage });
    }
  };

  handlePerPageChange = perPage => {
    const { changeSummaryTable, tableName } = this.props;
    changeSummaryTable(tableName, { currentPage: 1, perPage });
  };

  handleSort = order => {
    const { changeSummaryTable, tableName } = this.props;
    changeSummaryTable(tableName, { currentPage: 1, order });
  };

  render() {
    const {
      children,
      currentPage,
      data,
      empty,
      error,
      loading,
      order,
      perPage,
      totalCount,
    } = this.props;
    const columnProps = getColumnProps(children);
    const pages = Math.ceil(totalCount / perPage);

    return (
      <div className={OGStyles.SummaryTable}>
        <Table p="400">
          <Head columns={columnProps} onSort={this.handleSort} order={order} />
          <Body
            columns={columnProps}
            data={data}
            empty={empty}
            error={error}
            loading={loading}
            perPage={perPage}
          />
        </Table>
        <Pagination
          pages={pages}
          pageRange={PAGE_RANGE}
          currentPage={currentPage}
          perPage={perPage}
          totalCount={totalCount}
          handlePagination={this.handlePagination}
          handlePerPageChange={this.handlePerPageChange}
        />
      </div>
    );
  }
}

export default SummaryTableClassComponent;
