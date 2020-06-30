import React from 'react';
import { render } from '@testing-library/react';
import { LinksTable } from '../LinksTable';
import TestApp from 'src/__testHelpers__/TestApp';

describe('Links Table', () => {
  const mockGetData = jest.fn();
  const defaultProps = {
    loading: false,
    reportOptions: {
      relativeRange: 'hour',
      from: 'randomDate',
      to: 'randomDate',
    },
    refreshEngagementReport: mockGetData,
    links: [{ count_raw_clicked_approx: 2, count_clicked: 10, link_name: 'Raw URL' }],
    totalClicks: 200,
  };
  const subject = props =>
    render(
      <TestApp>
        <LinksTable {...defaultProps} {...props} />
      </TestApp>,
    );
  it('renders with the correct row information', () => {
    const { queryByText } = subject();

    expect(mockGetData).toHaveBeenCalled();
    expect(queryByText('Raw URL')).toBeInTheDocument();
    expect(queryByText('2')).toBeInTheDocument();
    expect(queryByText('10')).toBeInTheDocument();
    expect(queryByText('5%')).toBeInTheDocument();
  });

  it('does not make api request when report options is not valid', () => {
    const {} = subject({
      reportOptions: {
        relativeRange: 'hour',
      },
    });
    expect(mockGetData).not.toHaveBeenCalled();
  });

  it('shows empty message when there is no data', () => {
    const { queryByText } = subject({ links: [] });

    expect(queryByText('No links to report')).toBeInTheDocument();
  });
});
