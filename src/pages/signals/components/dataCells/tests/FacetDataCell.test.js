import React from 'react';
import { shallow } from 'enzyme';
import FacetDataCell from '../FacetDataCell';

describe('FacetDataCell', () => {
  const subject = (props = {}) => shallow(
    <FacetDataCell
      dimension="example"
      facet="domain"
      id="example.com"
      {...props}
    />
  );

  it('renders page link', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('renders page link for master account', () => {
    expect(subject({ facet: 'sid', id: 0 })).toMatchSnapshot();
  });

  it('renders label for all accounts', () => {
    expect(subject({ facet: 'sid', id: -1 })).toMatchSnapshot();
  });

  it('renders page link with subaccount search', () => {
    expect(subject({ subaccountId: 123 })).toMatchSnapshot();
  });

  it('renders page link with name and id', () => {
    const props = {
      facet: 'sid',
      id: 123,
      name: 'Test Subaccount'
    };

    expect(subject(props)).toMatchSnapshot();
  });

  it('adds a class to truncate its contents', () => {
    expect(subject({ truncate: true })).toMatchSnapshot();
  });
});
