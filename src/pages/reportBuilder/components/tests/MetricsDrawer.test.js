import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import MetricsDrawer from '../MetricsDrawer';

//Even though Hibana will be enabled, there seems to be issues with using styled props.
//This should only affect formatting but not the actual content
jest.mock('src/context/HibanaContext', () => ({
  useHibana: jest.fn().mockReturnValue([{ isHibanaEnabled: false }]),
}));

// this uses the src/config/__mocks__/metrics.js file automatically
jest.mock('src/config/metrics');

describe('Component: Summary Chart Metrics Modal', () => {
  const mockDrawerFooter = (props = {}) => <div>{props.children}</div>;
  const defaultProps = {
    handleSubmit: jest.fn(),
    selectedMetrics: [],
    DrawerFooter: mockDrawerFooter,
  };

  const subject = props => render(<MetricsDrawer {...defaultProps} {...props} />);

  it('should render with no set metrics', () => {
    const { queryByLabelText } = subject();
    expect(queryByLabelText('Targeted').checked).toEqual(false);
    expect(queryByLabelText('Injected').checked).toEqual(false);
    expect(queryByLabelText('Accepted').checked).toEqual(false);
    expect(queryByLabelText('Sent').checked).toEqual(false);
  });

  it('should render with some set metrics', () => {
    const { queryByLabelText } = subject({ selectedMetrics: [{ key: 'count_targeted' }] });
    expect(queryByLabelText('Targeted').checked).toEqual(true);
    expect(queryByLabelText('Injected').checked).toEqual(false);
    expect(queryByLabelText('Accepted').checked).toEqual(false);
    expect(queryByLabelText('Sent').checked).toEqual(false);
  });

  it('should select metrics', () => {
    const { queryByLabelText } = subject();
    expect(queryByLabelText('Targeted').checked).toEqual(false);

    fireEvent.click(queryByLabelText('Injected'));
    fireEvent.click(queryByLabelText('Targeted'));
    expect(queryByLabelText('Targeted').checked).toEqual(true);
    expect(queryByLabelText('Injected').checked).toEqual(true);
    expect(queryByLabelText('Accepted').checked).toEqual(false);
    expect(queryByLabelText('Sent').checked).toEqual(false);
  });

  it('should not allow applying metric when no metrics are selected', () => {
    const { queryByText } = subject();

    expect(queryByText('Apply Metrics').disabled).toEqual(true);
    fireEvent.click(queryByText('Apply Metrics'));
    expect(defaultProps.handleSubmit).not.toHaveBeenCalled();
  });

  it('should handle submit', () => {
    const { queryByText, queryByLabelText } = subject();
    fireEvent.click(queryByLabelText('Injected'));
    fireEvent.click(queryByLabelText('Targeted'));
    fireEvent.click(queryByText('Apply Metrics'));
    expect(defaultProps.handleSubmit).toHaveBeenCalledWith({
      metrics: ['count_injected', 'count_targeted'],
    });
  });
});
