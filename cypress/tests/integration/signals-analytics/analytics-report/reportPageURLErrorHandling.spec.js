import { commonBeforeSteps } from './helpers';

const BASE_URL = '/signals/analytics';

describe('Analytics Report Manual URL Entry', () => {
  it('renders an alert for invalid timezone', () => {
    commonBeforeSteps();
    cy.visit(`${BASE_URL}?timezone=InvalidTimezone`);
    cy.findByText('Invalid Timezone').should('be.visible');
  });
  it('renders an alert for invalid metric', () => {
    commonBeforeSteps();
    cy.visit(`${BASE_URL}?metrics%5B0%5D=count_sent&metrics%5B1%5D=not_a_real_metric`);
    cy.findByText('Invalid Metric').should('be.visible');
  });
  it('renders an alert for invalid date', () => {
    commonBeforeSteps();
    cy.visit(`${BASE_URL}?from=2021-02-02T00%3A00%3A00Z&to=2021-01-09T00%3A41%3A57Z&range=custom`);
    //to is before from in ^
    cy.findByText('Invalid Date').should('be.visible');
  });
  it('renders an alert for invalid filter', () => {
    commonBeforeSteps();
    cy.visit(
      `${BASE_URL}?&query_filters=%5B%7B"XOR"%3A%7B"UserID"%3A%7B"foo"%3A%5B"Christmas%20Sale"%5D%7D%7D%7D%5D`,
    );
    cy.findByText('Invalid Filter').should('be.visible');
  });
});
