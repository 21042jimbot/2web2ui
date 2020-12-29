import React, { useEffect, useRef, useReducer } from 'react';
import { useFilters, usePagination, useSortBy, useTable } from 'react-table';
import { ApiErrorBanner, Empty, Loading } from 'src/components';
import { Pagination } from 'src/components/collection';
import { Panel } from 'src/components/matchbox';
import { DEFAULT_CURRENT_PAGE, DEFAULT_PER_PAGE } from 'src/constants';
import { usePageFilters } from 'src/hooks';
import { API_ERROR_MESSAGE } from '../constants';
import useDomains from '../hooks/useDomains';
import TableFilters, { reducer as tableFiltersReducer } from './TableFilters';
import TrackingDomainsTable from './TrackingDomainsTable';
import {
  getReactTableFilters,
  customDomainStatusFilter,
  getActiveStatusFilters,
  filterStateToParams,
} from '../helpers';

import _ from 'lodash';

const filtersInitialState = {
  domainName: undefined,
  checkboxes: [
    {
      label: 'Select All',
      name: 'selectAll',
      isChecked: true,
    },
    {
      label: 'Verified',
      name: 'verified',
      isChecked: true,
    },
    {
      label: 'Unverified',
      name: 'unverified',
      isChecked: true,
    },
    {
      label: 'Blocked',
      name: 'blocked',
      isChecked: true,
    },
  ],
};

const initFiltersForTracking = {
  domainName: { defaultValue: undefined },
  verified: {
    defaultValue: undefined,
    validate: val => {
      return val === 'true' || val === 'false' || typeof val === 'boolean';
    },
  },
  unverified: {
    defaultValue: undefined,
    validate: val => {
      return val === 'true' || val === 'false' || typeof val === 'boolean';
    },
  },
  blocked: {
    defaultValue: undefined,
    validate: val => {
      return val === 'true' || val === 'false' || typeof val === 'boolean';
    },
  },
  selectAll: {
    defaultValue: undefined,
    validate: val => {
      return val === 'true' || val === 'false' || typeof val === 'boolean';
    },
  },
};

const options = [
  {
    label: 'Domain Name (A - Z)',
    value: 'domainNameAsc',
    'data-sort-direction': 'asc',
  },
  {
    label: 'Domain Name (Z - A)',
    value: 'domainNameDesc',
    'data-sort-direction': 'desc',
  },
];

export default function TrackingDomainsTab() {
  const {
    listTrackingDomains,
    listPending,
    hasSubaccounts,
    listSubaccounts,
    subaccounts,
    trackingDomains,
    trackingDomainsListError,
  } = useDomains();

  const { filters, updateFilters } = usePageFilters(initFiltersForTracking);
  const [filtersState, filtersStateDispatch] = useReducer(tableFiltersReducer, filtersInitialState);

  const filter = React.useMemo(() => customDomainStatusFilter, []);
  const data = React.useMemo(() => trackingDomains, [trackingDomains]);
  const columns = React.useMemo(
    () => [
      {
        Header: 'Blocked',
        accessor: 'blocked',
        filter,
      },
      { Header: 'DefaultTrackingDomain', accessor: 'defaultTrackingDomain' },
      { Header: 'DomainName', accessor: 'domainName' },
      { Header: 'SharedWithSubaccounts', accessor: 'sharedWithSubaccounts' },
      { Header: 'SubaccountId', accessor: 'subaccountId' },
      { Header: 'SubaccountName', accessor: 'subaccountName' },
      {
        Header: 'Unverified',
        accessor: 'unverified',
        filter,
      },
      {
        Header: 'Verified',
        accessor: 'verified',
        filter,
      },
      {
        Header: 'SelectAll',
        accessor: 'selectAll',
      },
    ],
    [filter],
  );
  const sortBy = React.useMemo(() => [{ id: 'domainName', desc: false }], []);
  const tableInstance = useTable(
    {
      columns,
      data,
      sortBy,
      initialState: {
        pageIndex: DEFAULT_CURRENT_PAGE - 1, // react-table takes a 0 base pageIndex
        pageSize: DEFAULT_PER_PAGE,
        filters: [],
        sortBy: [
          {
            id: 'domainName',
            desc: false,
          },
        ],
      },
    },
    useFilters,
    useSortBy,
    usePagination,
  );
  const { rows, setAllFilters, toggleSortBy, state, gotoPage, setPageSize } = tableInstance;

  const isEmpty = !listPending && rows?.length === 0;

  // Make initial requests
  useEffect(() => {
    listTrackingDomains();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (hasSubaccounts && subaccounts?.length === 0) {
      listSubaccounts();
    }
  }, [hasSubaccounts, listSubaccounts, subaccounts]);

  // synce query params -> page state
  const firstLoad = useRef(true);
  useEffect(() => {
    if (rows && rows.length === 0 && listPending) {
      return;
    }

    if (firstLoad.current) {
      // NOTE: take what usePageFilters returns and dispatch back to usePageFilters, updateFilters, and setAllFilters
      const allStatusCheckboxNames = Object.keys(filters).filter(i => i !== 'domainName'); // remove the domainName
      const activeStatusFilters = getActiveStatusFilters(filters);
      const statusFiltersToApply = !activeStatusFilters.length
        ? allStatusCheckboxNames
        : activeStatusFilters.map(i => i.name);

      firstLoad.current = false;

      let newFiltersState = {
        ...filtersState,
        checkboxes: filtersState.checkboxes.map(checkbox => {
          return {
            ...checkbox,
            isChecked: statusFiltersToApply.indexOf(checkbox.name) >= 0,
          };
        }),
      };
      newFiltersState['domainName'] = filters['domainName'];

      filtersStateDispatch({
        type: 'LOAD',
        filtersState: newFiltersState,
      }); // NOTE: Sets the filters display

      updateFilters(filterStateToParams(newFiltersState)); // NOTE: Updates the URL query params, sets url if it's not set at all...

      // TODO: FIX - NOT WORKING!
      setAllFilters(getReactTableFilters(filterStateToParams(newFiltersState))); // NOTE: Updates the state/table filtering
      // TODO: FIX - NOT WORKING!

      /**
       * TODO: Cypress test - Page Load URL params sync -> UI state
       * URL Params Possible:
          0: {label: "Select All", name: "selectAll", isChecked: true}
          1: {label: "Verified", name: "verified", isChecked: true}
          2: {label: "Unverified", name: "unverified", isChecked: true}
          3: {label: "Blocked", name: "blocked", isChecked: true}

          http://localhost:3100/domains/list/tracking?verified=true&unverified=true&blocked=true&selectAll=true
          http://localhost:3100/domains/list/tracking?verified=true&unverified=true&blocked=true
          http://localhost:3100/domains/list/tracking?verified=true&unverified=true
          http://localhost:3100/domains/list/tracking?verified=true
          http://localhost:3100/domains/list/tracking
          http://localhost:3100/domains/list/tracking?selectAll=true
          http://localhost:3100/domains/list/tracking?selectAll=false

          Also assert the table rows are correctly filtered down...
       */

      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, listPending]);

  if (trackingDomainsListError) {
    return (
      <ApiErrorBanner
        errorDetails={trackingDomainsListError.message}
        message={API_ERROR_MESSAGE}
        reload={() => listTrackingDomains()}
      />
    );
  }

  return (
    <>
      <Panel mb="400">
        <Panel.Section>
          <TableFilters>
            <TableFilters.DomainField
              disabled={listPending}
              value={filtersState.domainName}
              onChange={e => {
                const newFiltersState = {
                  ...filtersState,
                  domainName: e.target.value,
                };
                filtersStateDispatch({ type: 'DOMAIN_FILTER_CHANGE', value: e.target.value }); // NOTE: Updates the text input
                updateFilters(filterStateToParams(newFiltersState)); // NOTE: Updates the URL query params
                setAllFilters(getReactTableFilters(filterStateToParams(newFiltersState))); // NOTE: Updates the state/table filtering
              }}
              placeholder={
                trackingDomains.length > 0 ? `e.g. ${trackingDomains[0]?.domainName}` : ''
              }
            />

            <TableFilters.StatusPopover
              disabled={listPending}
              checkboxes={filtersState.checkboxes}
              onCheckboxChange={e => {
                const newCheckboxes = filtersState.checkboxes.map(checkbox => {
                  if (e.target.name === 'selectAll') {
                    return {
                      ...checkbox,
                      isChecked: true,
                    };
                  }

                  if (checkbox.name === e.target.name) {
                    return {
                      ...checkbox,
                      isChecked: !checkbox.isChecked,
                    };
                  }

                  return checkbox;
                });

                const newFiltersState = {
                  ...filtersState,
                  checkboxes: newCheckboxes,
                };

                filtersStateDispatch({ type: 'TOGGLE', name: e.target.name }); // NOTE: updates checkbox state
                updateFilters(filterStateToParams(newFiltersState)); // NOTE: Updates the URL query params
                setAllFilters(getReactTableFilters(filterStateToParams(newFiltersState))); // NOTE: Updates the state/table filtering
              }}
            />

            <TableFilters.SortSelect
              disabled={listPending}
              defaultValue="domainName"
              options={options}
              onChange={e => {
                const { currentTarget } = e;
                const selectedOption = _.find(options, { value: currentTarget.value });
                const selectedDirection = selectedOption['data-sort-direction'];
                const desc = selectedDirection === 'desc' ? true : false;
                toggleSortBy('domainName', desc);
              }}
            />
          </TableFilters>
        </Panel.Section>

        {listPending && <Loading />}

        {isEmpty && <Empty message="There is no data to display" />}

        {!listPending && !isEmpty && <TrackingDomainsTable tableInstance={tableInstance} />}
      </Panel>

      <Pagination
        data={rows}
        currentPage={state.pageIndex + 1}
        perPage={state.pageSize}
        saveCsv={false}
        onPageChange={page => gotoPage(page)}
        onPerPageChange={perPage => setPageSize(perPage)}
      />
    </>
  );
}
