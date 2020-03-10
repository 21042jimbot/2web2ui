import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CollectionFilterBox from '../FilterBox';
import { HibanaProvider } from 'src/context/HibanaContext';

describe('CollectionFilterBox', () => {
  const subject = (props = {}) =>
    render(
      <HibanaProvider>
        <CollectionFilterBox {...props} />
      </HibanaProvider>,
    );

  it('sets initial value', () => {
    const { queryByDisplayValue } = subject({ initialValue: 'testing' });
    expect(queryByDisplayValue('testing')).toBeVisible();
  });

  it('triggers onBlur event handler', () => {
    const onBlur = jest.fn();
    const { getByPlaceholderText } = subject({ onBlur });

    fireEvent.blur(getByPlaceholderText(/filter results/i), { target: { value: 'testing' } });

    expect(onBlur).toHaveBeenCalledWith('testing');
  });
});
