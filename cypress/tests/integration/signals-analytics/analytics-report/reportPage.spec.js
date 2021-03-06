import { PAGE_URL, METRICS } from './constants';
import {
  stubDeliverability,
  stubTimeSeries,
  commonBeforeSteps,
  getFilterTags,
  getFilterGroupings,
} from './helpers';

const ENCODED_QUERY_FILTERS =
  '%255B%257B%2522AND%2522%3A%257B%2522campaigns%2522%3A%257B%2522like%2522%3A%255B%2522hello%2522%2C%2522world%2522%255D%257D%2C%2522templates%2522%3A%257B%2522eq%2522%3A%255B%2522greg-hackathon%2522%255D%2C%2522notEq%2522%3A%255B%2522gregs-test%2522%255D%257D%257D%257D%2C%257B%2522AND%2522%3A%257B%2522sending_ips%2522%3A%257B%2522like%2522%3A%255B%2522hello%2522%255D%2C%2522notLike%2522%3A%255B%2522hello-again%2522%255D%257D%257D%257D%255D';

describe('Analytics Report', () => {
  it('renders the initial state of the page', () => {
    commonBeforeSteps();
    cy.visit(PAGE_URL);
    // cy.title().should('include', 'Analytics Report'); // TODO: Once OG theme is removed, adjust title and re-introduce test
    cy.findByRole('heading', { name: 'Analytics Report' }).should('be.visible');

    // Filtering form elements
    cy.findByText('Date Range').should('be.visible');
    cy.findByLabelText('Time Zone').should('be.visible');
    cy.findByLabelText('Precision').should('be.visible');

    // Default selected metrics
    cy.withinMainContent(() => {
      cy.findAllByText('Sent').should('have.length', 2);
      cy.findAllByText('Unique Confirmed Opens').should('have.length', 1);
      cy.findAllByText('Unique Confirmed Opens per hour').should('have.length', 1);
      cy.findAllByText('Accepted').should('have.length', 2);
      cy.findAllByText('Bounces').should('have.length', 2);
    });

    cy.get('.recharts-wrapper').should('be.visible');

    cy.findByLabelText('Break Down By').should('be.visible');
  });

  it('should render error state for charts', () => {
    commonBeforeSteps();
    cy.stubRequest({
      url: '/api/v1/metrics/deliverability/time-series**/**',
      fixture: 'metrics/deliverability/time-series/400.get.json',
      statusCode: 400,
      requestAlias: 'newGetTimeSeries',
    });
    cy.visit(PAGE_URL);
    // Wait for request + 3 retries
    cy.wait(['@newGetTimeSeries']);
    cy.wait(['@newGetTimeSeries']);
    cy.wait(['@newGetTimeSeries']);
    cy.wait(['@newGetTimeSeries']);

    cy.findByText('Unable to load report').should('be.visible');
    cy.stubRequest({
      url: '/api/v1/metrics/deliverability/time-series**/**',
      fixture: 'metrics/deliverability/time-series/200.get.json',
      requestAlias: 'getTimeSeries',
    });
    cy.findByRole('button', { name: 'Try Again' })
      .should('be.visible')
      .click();
    cy.wait(['@getTimeSeries']);
    cy.findByText('Unable to load report').should('not.exist');
  });

  it('renders the initial page based on query params', () => {
    commonBeforeSteps();
    cy.visit(`${PAGE_URL}&filters=Recipient Domain%3Atest.com`);
    cy.withinMainContent(() => {
      cy.findAllByText('Sent').should('have.length', 2);
      cy.findAllByText('Unique Confirmed Opens').should('have.length', 1);
      cy.findAllByText('Unique Confirmed Opens per hour').should('have.length', 1);
      cy.findAllByText('Accepted').should('have.length', 2);
      cy.findAllByText('Bounces').should('have.length', 2);
    });
    cy.findByDataId('report-options').within(() => {
      cy.findByText('Filters').should('be.visible');
      cy.findByText('Recipient Domain').should('be.visible');
      cy.findByText('is equal to').should('be.visible');
      cy.findByText('test.com').should('be.visible');
    });
  });

  it('should properly control the expandables', () => {
    commonBeforeSteps();
    cy.visit(PAGE_URL);
    cy.findByRole('button', { name: 'Add Metrics' }).click();
    cy.withinDrawer(() => {
      cy.findByDataId('expandable-content')
        .eq(0)
        .should('be.visible');
      cy.findByRole('button', { name: /Injection Metrics/g }).click();
      cy.findByDataId('expandable-content')
        .eq(0)
        .should('not.be.visible');
      cy.findByDataId('expandable-content')
        .eq(1)
        .should('be.visible');
      cy.findByRole('button', { name: /Delivery Metrics/g }).click();
      cy.findByDataId('expandable-content')
        .eq(1)
        .should('not.be.visible');
      cy.findByDataId('expandable-content')
        .eq(2)
        .should('be.visible');
      cy.findByRole('button', { name: /Engagement Metrics/g }).click();
      cy.findByDataId('expandable-content')
        .eq(2)
        .should('not.be.visible');
    });
  });

  it('filters by metric', () => {
    commonBeforeSteps();
    cy.visit(PAGE_URL);
    // 1. Open the drawer, uncheck default metrics, check all metrics
    cy.findByRole('button', { name: 'Add Metrics' }).click();

    cy.withinDrawer(() => {
      cy.findByLabelText('Sent').uncheck({ force: true });
      cy.findByLabelText('Unique Confirmed Opens').uncheck({ force: true });
      cy.findByLabelText('Accepted').uncheck({ force: true });
      cy.findByLabelText('Bounces').uncheck({ force: true });

      METRICS.forEach(metric => {
        cy.findByLabelText(metric.name).check({ force: true });
      });

      cy.findByRole('button', { name: 'Apply Metrics' }).click();
    });

    // 2. Wait for server response
    cy.wait(['@getTimeSeries', '@getDeliverability']);

    // 3. Verify that tags render for each metric *and* query params for each metric appear in the URL
    cy.withinMainContent(() => {
      METRICS.forEach(metric => {
        cy.findByDataId(`metric-tag-${metric.queryParam}`).should('be.visible');
        cy.url().should('include', `=${metric.queryParam}`);
      });
    });

    // 4. Open the drawer again, clear metrics except for one
    cy.findByRole('button', { name: 'Add Metrics' }).click();

    cy.withinDrawer(() => {
      cy.findByRole('button', { name: 'Apply Metrics' }).should('be.disabled');
      cy.findByRole('button', { name: 'Clear Metrics' }).click();
      cy.findByRole('button', { name: 'Apply Metrics' }).should('be.disabled');
      cy.findByLabelText('Admin Bounce Rate').check({ force: true });
      cy.findByRole('button', { name: 'Apply Metrics' }).should('not.be.disabled');
      cy.findByRole('button', { name: 'Apply Metrics' }).click();
    });

    // 5. Wait for the server response
    cy.wait(['@getTimeSeries', '@getDeliverability']);

    const uncheckedMetrics = METRICS.filter(metric => metric.name !== 'Admin Bounce Rate');

    // 6. Verify that that the only metric rendered is "Admin Bounce Rate"
    cy.withinMainContent(() => {
      uncheckedMetrics.forEach(metric => {
        cy.findAllByText(metric.name).should('not.exist');
        cy.url().should('not.include', `=${metric.queryParam}`);
      });
    });

    cy.findAllByText('Admin Bounce Rate').should('be.visible');
    cy.url().should('include', 'admin_bounce_rate');
  });

  it('removes currently active metrics when clicking the close button within metric tags', () => {
    commonBeforeSteps();
    cy.visit(PAGE_URL);
    function verifyMetricTagDismiss(tagContent) {
      const deliverabilityAlias = `getDeliverability${tagContent}`;
      const timeSeriesAlias = `getTimeSeries${tagContent}`;
      const metric = METRICS.find(metric => metric.name === tagContent);

      cy.url().should('include', `=${metric.queryParam}`);

      stubDeliverability(deliverabilityAlias);
      stubTimeSeries(timeSeriesAlias);

      cy.findByDataId(`metric-tag-${metric.queryParam}`)
        .closest('[data-id="metric-tag"]')
        .find('button')
        .click();

      cy.wait(`@${deliverabilityAlias}`).then(xhr => {
        cy.wrap(xhr.url).should('not.include', metric.queryParam);
      });
      cy.wait(`@${timeSeriesAlias}`).then(xhr => {
        cy.wrap(xhr.url).should('not.include', metric.queryParam);
      });

      cy.findByText(tagContent).should('not.exist');
      cy.url().should('not.include', `=${metric.queryParam}`);
    }

    cy.findByDataId('report-options').within(() => {
      verifyMetricTagDismiss('Sent');
      verifyMetricTagDismiss('Unique Confirmed Opens');
    });
  });

  it('renders applied grouped comparator filters according to the URL query params', () => {
    commonBeforeSteps();
    cy.visit(`${PAGE_URL}&query_filters=${ENCODED_QUERY_FILTERS}`);
    cy.wait(['@getDeliverability', '@getTimeSeries']);

    getFilterTags().within(() => {
      getFilterGroupings()
        .eq(0)
        .within(() => {
          cy.findByText('Campaign').should('be.visible');
          cy.findByText('contains').should('be.visible');
          cy.findByText('hello').should('be.visible');
          cy.findByText('world').should('be.visible');
          cy.findAllByText('Template')
            .should('be.visible')
            .should('have.length', 2);
          cy.findByText('is equal to').should('be.visible');
          cy.findByText('greg-hackathon').should('be.visible');
          cy.findByText('is not equal to').should('be.visible');
          cy.findByText('gregs-test').should('be.visible');

          // "AND" comparison between filters within a group
          cy.findAllByText('AND')
            .should('be.visible')
            .should('have.length', 2);
        });

      getFilterGroupings()
        .eq(1)
        .within(() => {
          cy.findAllByText('Sending IP')
            .should('be.visible')
            .should('have.length', 2);
          cy.findByText('contains').should('be.visible');
          cy.findByText('hello').should('be.visible');
          cy.findByText('does not contain').should('be.visible');
          cy.findByText('hello-again').should('be.visible');
        });
    });
  });

  it('removes filters when individual filter value tags are removed', () => {
    commonBeforeSteps();

    cy.visit(`${PAGE_URL}&query_filters=${ENCODED_QUERY_FILTERS}`);
    cy.wait(['@getDeliverability', '@getTimeSeries']);

    cy.findByRole('heading', { name: 'Filters' }).should('be.visible');

    getFilterTags().within(() => {
      // Verify there are two sets of filter groupings
      getFilterGroupings().should('have.length', 2);

      getFilterGroupings()
        .eq(0)
        .within(() => {
          // Granularly verifying that when filter values are removed, a filter label no longer renders
          cy.findByText('Campaign').should('be.visible');
          cy.findByText('hello').should('be.visible');
          cy.findByText('world').should('be.visible');
          getFirstRemoveButton().click();
          cy.findByText('Campaign').should('be.visible');
          cy.findByText('hello').should('not.exist');
          cy.findByText('world').should('be.visible');
          getFirstRemoveButton().click();
          // The filter label no longer renders when all filter values are removed
          cy.findByText('Campaign').should('not.exist');
          cy.findByText('hello').should('not.exist');
          cy.findByText('world').should('not.exist');

          // Remove remaining filters in the group
          getFirstRemoveButton().click();
          getFirstRemoveButton().click();
        });

      // After removing all filters within a grouping, only one grouping remains
      getFilterGroupings().should('have.length', 1);

      getFilterGroupings()
        .eq(0)
        .within(() => {
          cy.findByText('hello').should('be.visible');
          cy.findByText('hello-again').should('be.visible');
          getFirstRemoveButton().click();
          getFirstRemoveButton().click();
        });
    });

    // No tags render when no filters are applied
    getFilterTags().should('not.exist');
    cy.url().should('not.contain', 'query_filters');

    cy.findByRole('heading', { name: 'Filters' }).should('be.visible');
    cy.findByRole('button', { name: 'Add Filters' }).click();

    // Verify the filters form state was reset as well
    cy.withinDrawer(() => {
      cy.findByLabelText('Type').should('be.visible');
      cy.findByLabelText('Compare By').should('not.exist');
    });
  });

  it('closes the drawer when clicking the close button', () => {
    commonBeforeSteps();
    cy.visit(PAGE_URL);
    cy.findByText('Add Filters').click();

    cy.withinDrawer(() => {
      cy.findByLabelText('Type').should('be.visible');
      cy.findByText('Close').click({ force: true });
    });

    cy.findByLabelText('Type').should('not.exist');
  });
});

function getFirstRemoveButton() {
  return cy.findAllByRole('button', { name: 'Remove' }).eq(0);
}
