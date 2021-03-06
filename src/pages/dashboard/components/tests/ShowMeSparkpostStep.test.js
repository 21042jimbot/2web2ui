import React from 'react';
import { render } from '@testing-library/react';
import TestApp from 'src/__testHelpers__/TestApp';
import ShowMeSparkpostStep from '../ShowMeSparkpostStep';
import { GuideContext } from '../GettingStartedGuide';

describe('ShowMeSparkpostStep', () => {
  const subject_rtl = (func = render, props = {}) => {
    const values = {
      stepName: 'Show Me SparkPost',
      setAndStoreStepName: jest.fn(),
      setOnboardingAccountOption: jest.fn(),
      send_test_email_completed: false,
      explore_analytics_completed: false,
      invite_collaborator_completed: false,
      hasSendingDomains: false,
      hasApiKeysForSending: false,
      view_developer_docs_completed: false,
      handleAction: jest.fn(),
    };

    return func(
      <TestApp>
        <GuideContext.Provider value={values}>
          <ShowMeSparkpostStep canManageUsers={true} {...props} />
        </GuideContext.Provider>
      </TestApp>,
    );
  };
  it('should render Checklist with title Send Test Email', () => {
    const { queryByText } = subject_rtl(render);
    expect(queryByText('Send a Test Email')).toBeInTheDocument();
  });
  it('should render Checklist with title Explore Analytics', () => {
    const { queryAllByText } = subject_rtl(render);
    expect(queryAllByText('Explore Analytics')[0]).toBeInTheDocument();
    expect(true).toBeTruthy();
  });
  it('should render Checklist with title Check Out Events', () => {
    const { queryAllByText } = subject_rtl(render);
    expect(queryAllByText('Check Out Events')[0]).toBeInTheDocument();
  });
  it('should render Checklist with title Invite a Collaborator when user has grant to manage users', () => {
    const { queryByText } = subject_rtl(render);
    expect(queryByText('Invite a Collaborator')).toBeInTheDocument();
  });
  it('should not render Checklist with title Invite a Collaborator when user does not have grant to manage users', () => {
    const { queryByText } = subject_rtl(render, { canManageUsers: false });
    expect(queryByText('Invite a Collaborator')).not.toBeInTheDocument();
  });
});
