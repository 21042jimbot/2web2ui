const PAGE_URL = '/alerts/details/2';
const API_URL = '/api/v1/alerts/2';

describe('The alerts details pages', () => {
  beforeEach(() => {
    cy.stubAuth();
    cy.login({ isStubbed: true });

    cy.stubRequest({
      url: API_URL,
      fixture: 'alerts/2/200.get.json',
    });

    cy.stubRequest({
      url: `${API_URL}/incidents`,
      fixture: 'alerts/2/incidents/200.get.json',
    });

    cy.stubRequest({
      url: '/api/v1/subaccounts',
      fixture: 'subaccounts/200.get.json',
    });
  });

  it('renders with a relevant page title', () => {
    cy.visit(PAGE_URL);

    cy.title().should('include', 'Alert Details | Alerts');
    cy.findByText('Alert Details').should('be.visible');
  });

  it('renders with the alert name', () => {
    cy.visit(PAGE_URL);

    cy.findByText('This is an alert').should('be.visible');
  });

  it('renders with relevant alert details data', () => {
    cy.visit(PAGE_URL);

    cy.get('[data-id="alert-details-panel"]').within(() => {
      cy.findByText('Health Score').should('be.visible');
      cy.findByText('Fake Subaccount 1 (101)').should('be.visible');
      cy.findByText('Fake Subaccount 2 (102)').should('be.visible');
      cy.findByText('Fake Subaccount 3 (103)').should('be.visible');
      cy.findByText('fake-email@sparkpost.com');
      cy.get('[data-id="alert-toggle"]')
        .find('input')
        .should('not.be.checked');
    });
  });

  it('renders with a link to the edit alert page', () => {
    cy.visit(PAGE_URL);

    cy.findByText('Edit').should('have.attr', 'href', '/alerts/edit/2');
  });

  it('renders with a link back to the alerts list page', () => {
    cy.visit(PAGE_URL);

    cy.findByText('Back to Alerts').should('have.attr', 'href', '/alerts');
  });

  describe('the duplicate and delete buttons', () => {
    beforeEach(() => cy.visit(PAGE_URL));

    it('routes to the create page when clicking on "Duplicate"', () => {
      cy.findByText('Duplicate').click();

      cy.url().should('include', '/alerts/create/2');
      cy.findByLabelText('Alert Name').should('have.value', 'This is an alert Copy');
    });

    it('renders a success message and re-routes to the list page when an alert is successfully deleted', () => {
      cy.stubRequest({
        method: 'DELETE',
        url: API_URL,
        fixture: 'alerts/2/200.delete.json',
      });

      // Testing that the cancel button works while we're here...
      cy.findByText('Delete').click();
      cy.findByText('Are you sure you want to delete this alert?').should('be.visible');
      cy.findByText('Cancel').click();
      cy.queryByText('Are you sure you want to delete this alert?').should('not.be.visible');
      // Grabbing delete button outside of the modal - this is technically a bug as
      // the Modal needs to not be encounterable by Cypress or screen readers at this point
      cy.get('main').within(() => cy.findByText('Delete').click());
      cy.get('#modal-portal').within(() => cy.findByText('Delete').click());

      cy.findByText('Alert: This is an alert Deleted').should('be.visible');
      cy.url().should('include', '/alerts');
      cy.title().should('not.include', 'Alert Details');
    });

    it('renders an error message when deletion fails', () => {
      cy.stubRequest({
        statusCode: 400,
        method: 'DELETE',
        url: API_URL,
        fixture: 'alerts/2/400.delete.json',
      });

      cy.findByText('Delete').click();
      cy.get('#modal-portal').within(() => cy.findByText('Delete').click());

      cy.findByText('Something went wrong.').should('be.visible');
      cy.findByText('View Details').click();
      cy.findByText('This is an error').should('be.visible');
    });
  });

  describe('the alert incidents table', () => {
    function assertTableRow({ rowIndex, isActive, subaccount, score }) {
      cy.get('tbody tr')
        .eq(rowIndex)
        .within(() => {
          cy.findByText('Active').should(isActive ? 'be.visible' : 'not.be.visible');
          cy.findByText(subaccount).should('be.visible');
          cy.findByText(score.toString()).should('be.visible');
        });
    }

    it('renders the empty state when no results are returned', () => {
      cy.stubRequest({
        url: `${API_URL}/incidents`,
        fixture: 'alerts/2/incidents/200.get.no-results.json',
      });

      cy.visit(PAGE_URL);

      cy.get('table').should('not.be.visible');
      cy.findByText('No incidents').should('be.visible');
    });

    it('renders "Active" and already-resolved incidents', () => {
      cy.visit(PAGE_URL);

      assertTableRow({
        rowIndex: 0,
        isActive: true,
        subaccount: 'Fake Subaccount 3 (103)',
        score: 75,
      });

      assertTableRow({
        rowIndex: 1,
        isActive: false,
        subaccount: 'Fake Subaccount 1 (101)',
        score: 25,
      });

      assertTableRow({
        rowIndex: 2,
        isActive: false,
        subaccount: 'Fake Subaccount 2 (102)',
        score: 50,
      });
    });
  });
});
