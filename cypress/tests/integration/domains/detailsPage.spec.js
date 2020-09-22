import { IS_HIBANA_ENABLED } from 'cypress/constants';

const PAGE_URL = '/domains/details/fake-domain.com';

describe('The domains details page', () => {
  beforeEach(() => {
    cy.stubAuth();
    cy.login({ isStubbed: true });
  });

  if (IS_HIBANA_ENABLED) {
    it('renders with a relevant page title when the "allow_domains_v2" account UI flag is enabled', () => {
      cy.stubRequest({
        url: '/api/v1/account',
        fixture: 'account/200.get.has-domains-v2.json',
        requestAlias: 'accountDomainsReq',
      });

      cy.visit(PAGE_URL);

      cy.wait('@accountDomainsReq');

      cy.title().should('include', 'Domain Details');
      cy.findByRole('heading', { name: 'Domain Details' }).should('be.visible');
    });
    it('renders the Sections with relevant titles', () => {
      cy.findByRole('heading', { name: 'Domain Status' }).should('be.visible');
      cy.findByRole('heading', { name: 'Sending' }).should('be.visible');
      cy.findByRole('heading', { name: 'Delete Domain' }).should('be.visible');
    });
  }

  if (!IS_HIBANA_ENABLED) {
    it('renders the 404 page when the user does not have Hibana enabled', () => {
      cy.visit(PAGE_URL);

      cy.findByRole('heading', { name: 'Page Not Found' }).should('be.visible');
      cy.url().should('include', '404');
    });
  }
});
