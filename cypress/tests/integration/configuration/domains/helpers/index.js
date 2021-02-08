import { USERNAME } from 'cypress/constants';

export function stubSendingDomains({
  fixture = 'sending-domains/200.get.json',
  requestAlias = 'sendingDomainsReq',
  statusCode = 200,
} = {}) {
  cy.stubRequest({
    url: '/api/v1/sending-domains',
    fixture,
    requestAlias,
    statusCode,
  });
}

export function stubSubaccounts({
  fixture = 'subaccounts/200.get.json',
  requestAlias = 'subaccountsReq',
} = {}) {
  cy.stubRequest({
    url: '/api/v1/subaccounts',
    fixture,
    requestAlias,
  });
}

export function stubUsersRequest({
  fixture = 'users/200.get.sending-domain-banner-dismissed.json',
  requestAlias = 'stubbedUsersRequest',
}) {
  cy.stubRequest({
    url: `/api/v1/users/${USERNAME}`,
    fixture,
    requestAlias,
  });
}

export function stubTrackingDomains({
  fixture = 'tracking-domains/200.get.json',
  requestAlias = 'trackingDomainsReq',
  statusCode = 200,
} = {}) {
  cy.stubRequest({
    url: '/api/v1/tracking-domains',
    fixture,
    requestAlias,
    statusCode,
  });
}
