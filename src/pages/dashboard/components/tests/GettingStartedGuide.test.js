import React from 'react';
import { shallow } from 'enzyme';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GettingStartedGuide } from '../GettingStartedGuide';
import { GUIDE_IDS } from '../../constants';
import Providers from 'src/Providers';

const defaultProps = {
  onboarding: { isGuideAtBottom: false },
  history: {
    push: jest.fn(),
  },
  listApiKeys: jest.fn(),
  setAccountOption: jest.fn(),
  listSendingDomains: jest.fn(),
  isAdmin: true,
};

describe('GettingStartedGuide shallow', () => {
  beforeEach(() => {
    jest.mock('src/context/HibanaContext');
  });

  const subject = (props, renderFn = render) =>
    renderFn(<GettingStartedGuide {...defaultProps} {...props} />);

  it('should render correctly when guide is at bottom or when guide is at top', () => {
    expect(
      subject({ onboarding: { isGuideAtBottom: true } }, shallow)
        .find('Panel')
        .prop('actions'),
    ).toBe(null);
    expect(
      subject({ onboarding: { isGuideAtBottom: false } }, shallow)
        .find('Panel')
        .prop('actions'),
    ).not.toBe(null);
  });

  it('should render ShowMeSparkpostStep when on step "Show Me SparkPost" ', () => {
    jest.mock('src/context/HibanaContext');
    const instance = subject({ onboarding: { active_step: 'Show Me SparkPost' } }, shallow);
    expect(instance.find('ShowMeSparkpostStep')).toHaveLength(1);
  });

  it("should render LetsCodeStep when on step Let's Code ", () => {
    jest.mock('src/context/HibanaContext');
    const instance = subject({ onboarding: { active_step: "Let's Code" } }, shallow);
    expect(instance.find('LetsCodeStep')).toHaveLength(1);
  });
});

describe('GettingStartedGuide full', () => {
  window.pendo = {
    showGuideById: jest.fn(() => true),
    onGuideAdvanced: jest.fn(),
  };

  const subject = (props, renderFn = render) =>
    renderFn(
      <Providers>
        <GettingStartedGuide {...defaultProps} {...props} />
      </Providers>,
    );

  it('should render the corresponding step when breadcrumb is clicked', () => {
    const { queryByText } = subject({ onboarding: { active_step: 'Show Me SparkPost' } });
    userEvent.click(queryByText('Sending'));
    expect(queryByText('Where Would You Like to Begin?')).toBeInTheDocument(1);
  });

  it('should render the BreadCrumbItem as active corresponding to the Step', () => {
    const { queryByText } = subject({ onboarding: { active_step: 'Show Me SparkPost' } });
    expect(queryByText('Show Me SparkPost')).toBeInTheDocument();
  });

  it('should navigate to templates page when Send a Test Email button is clicked', () => {
    const { queryByText } = subject({ onboarding: { active_step: 'Show Me SparkPost' } });
    userEvent.click(queryByText('Send Test Email'));
    expect(defaultProps.history.push).toHaveBeenCalledWith(
      `/templates?pendo=${GUIDE_IDS.SEND_TEST_EMAIL}`,
    );
  });

  it('should navigate to summary report when Explore Analytics button is clicked', () => {
    const { getAllByText } = subject({ onboarding: { active_step: 'Show Me SparkPost' } });
    userEvent.click(getAllByText('Explore Analytics')[1]);

    expect(defaultProps.history.push).toHaveBeenCalledWith(`/reports/summary`);
    expect(window.pendo.showGuideById).toHaveBeenCalledWith(GUIDE_IDS.EXPLORE_ANALYTICS);
    expect(window.pendo.onGuideAdvanced).toHaveBeenCalledWith(1);
  });

  it('should navigate to events page when Check Out Events button is clicked', () => {
    const { getAllByText } = subject({ onboarding: { active_step: 'Show Me SparkPost' } });
    userEvent.click(getAllByText('Check Out Events')[1]);

    expect(defaultProps.history.push).toHaveBeenCalledWith(`/reports/message-events`);
    expect(window.pendo.showGuideById).toHaveBeenCalledWith(GUIDE_IDS.CHECKOUT_EVENTS);
    expect(window.pendo.onGuideAdvanced).toHaveBeenCalledWith(1);
  });

  it('should navigate to users page when Invite a Collaborator is clicked', () => {
    const { queryByText } = subject({ onboarding: { active_step: 'Show Me SparkPost' } });
    userEvent.click(queryByText('Invite a Collaborator'));
    expect(defaultProps.history.push).toHaveBeenCalledWith(`/account/users`);
    expect(defaultProps.setAccountOption).toHaveBeenCalledWith('onboarding', {
      invite_collaborator_completed: true,
    });
  });

  it('should have an external link to developer docs', () => {
    const { queryByText } = subject({ onboarding: { active_step: "Let's Code" } });
    userEvent.click(queryByText('View Developer Docs'));
    expect(defaultProps.setAccountOption).toHaveBeenCalledWith('onboarding', {
      view_developer_docs_completed: true,
    });
  });

  it("should route to API key page from Let's Code list", () => {
    const { queryByText } = subject({
      onboarding: { active_step: "Let's Code" },
      hasApiKeysForSending: true,
    });
    userEvent.click(queryByText('Generate API Key'));
    expect(defaultProps.history.push).toHaveBeenCalledWith('/account/api-keys');
  });

  it('should navigate to sending domains page when Add Sending Domain is clicked', () => {
    const { queryByText } = subject({ onboarding: { active_step: "Let's Code" } });
    userEvent.click(queryByText('Add Sending Domain'));
    expect(defaultProps.history.push).toHaveBeenCalledWith(`/account/sending-domains`);
  });
});
