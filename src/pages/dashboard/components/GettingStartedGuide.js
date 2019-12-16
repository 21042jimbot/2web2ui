import React, { useState, useRef, useEffect } from 'react';
import { Panel, Button, Grid } from '@sparkpost/matchbox';
import { ArrowDownward, Send } from '@sparkpost/matchbox-icons';
import { Card, CardTitle, CardContent, CardActions } from 'src/components';
import ButtonWrapper from 'src/components/buttonWrapper';
import styles from './GettingStartedGuide.module.scss';
import { BreadCrumbs, BreadCrumbsItem } from 'src/components';
import { GuideListItem, GuideListItemTitle, GuideListItemDescription } from './GuideListItem';
import { GUIDE_IDS, BREADCRUMB_ITEMS } from '../constants';
import { UnstyledLink } from '@sparkpost/matchbox';

export const GettingStartedGuide = ({ onboarding = {}, history, setAccountOption }) => {
  const {
    isGuideAtBottom = false,
    active_step,
    send_test_email_completed,
    explore_analytics_completed,
    invite_collaborator_completed,
  } = onboarding;

  const setOnboardingAccountOption = (obj = {}) => {
    setAccountOption('onboarding', obj);
  };

  const actions = isGuideAtBottom
    ? null
    : [
        {
          content: (
            <span>
              {`Move to Bottom`} <ArrowDownward size="20" />{' '}
            </span>
          ),
          color: 'blue',
          onClick: () => setOnboardingAccountOption({ isGuideAtBottom: true }),
        },
      ];
  //stepName could be Features,Sending,Show Me Sparkpost, Let's Code
  const [stepName, setStepName] = useState(active_step || 'Features');
  const guideHeadingRef = useRef(null);
  useEffect(() => {
    if (guideHeadingRef.current) {
      guideHeadingRef.current.focus();
    }
  }, [stepName]);
  const renderBreadCrumbs = () => (
    <BreadCrumbs>
      {BREADCRUMB_ITEMS[stepName].map(item => (
        <BreadCrumbsItem
          key={item}
          onClick={() => setAndStoreStepName(item)}
          active={stepName === item}
        >
          {item}
        </BreadCrumbsItem>
      ))}
    </BreadCrumbs>
  );

  const setAndStoreStepName = active_step => {
    setOnboardingAccountOption({ active_step: active_step });
    setStepName(active_step);
  };
  const handleAction = action => {
    switch (action) {
      case 'Send Test Email':
        setOnboardingAccountOption({ send_test_email_completed: true });
        history.push(`/templates?pendo=${GUIDE_IDS.SEND_TEST_EMAIL}`);
        break;
      case 'Explore Analytics':
        setOnboardingAccountOption({ explore_analytics_completed: true });
        history.push(`/reports/summary?pendo=${GUIDE_IDS.EXPLORE_ANALYTICS}`);
        break;
      case 'Invite a Collaborator':
        setOnboardingAccountOption({ invite_collaborator_completed: true });
        history.push('/account/users');
        break;
      default:
        break;
    }
  };

  const renderStep = () => {
    switch (stepName) {
      case 'Features':
        return (
          <Panel.Section>
            {renderBreadCrumbs()}
            <Grid>
              <Grid.Column xs={12}>
                <Card>
                  <CardTitle>
                    <Send size="20" className={styles.SendIcon} /> &nbsp;{`Sending with Sparkpost`}
                  </CardTitle>
                  <CardContent>
                    <p className={styles.FeaturesCardContent}>
                      Learn how to send emails, integrate our API into your code, and make the most
                      of our powerful analytics.
                    </p>
                  </CardContent>
                  <CardActions>
                    <ButtonWrapper>
                      <Button color="orange" onClick={() => setAndStoreStepName('Sending')}>
                        Start Sending
                      </Button>
                    </ButtonWrapper>
                  </CardActions>
                </Card>
              </Grid.Column>
            </Grid>
          </Panel.Section>
        );

      case 'Sending':
        return (
          <Panel.Section>
            {renderBreadCrumbs()}
            <p
              className={styles.SendingStepHeading}
              role="heading"
              aria-level="4"
              ref={guideHeadingRef}
              tabIndex={-1}
            >
              Where Would You Like to Begin?
            </p>
            <Grid>
              <Grid.Column xs={12} md={6}>
                <Card textAlign="center">
                  <CardContent>
                    <p className={styles.FeaturesCardContent}>
                      {`Send your first email in one click and dive right into what SparkPost can do
                      for your email strategy`}
                    </p>
                  </CardContent>
                  <CardActions>
                    <ButtonWrapper>
                      <Button
                        color="orange"
                        onClick={() => setAndStoreStepName('Show Me SparkPost')}
                        className={styles.SendingStepButtons}
                      >
                        Show Me SparkPost
                      </Button>
                    </ButtonWrapper>
                  </CardActions>
                </Card>
              </Grid.Column>
              <Grid.Column xs={12} md={6}>
                <Card textAlign="center">
                  <CardContent>
                    <p className={styles.FeaturesCardContent}>
                      Ready to integrate via SMTP or API? We'll get you set up ASAP so you can start
                      building with SparkPost
                    </p>
                  </CardContent>
                  <CardActions>
                    <ButtonWrapper>
                      <Button
                        color="orange"
                        onClick={() => setAndStoreStepName("Let's Code")}
                        className={styles.SendingStepButtons}
                      >
                        Let's Code
                      </Button>
                    </ButtonWrapper>
                  </CardActions>
                </Card>
              </Grid.Column>
            </Grid>
          </Panel.Section>
        );
      case 'Show Me SparkPost':
        return (
          <>
            <Panel.Section>
              {renderBreadCrumbs()}
              <GuideListItem
                action={{
                  name: 'Send Test Email',
                  onClick: () => handleAction('Send Test Email'),
                }}
                itemCompleted={send_test_email_completed}
              >
                <GuideListItemTitle>Send a Test Email</GuideListItemTitle>
                <GuideListItemDescription>
                  Send a test email using our starter template.
                </GuideListItemDescription>
              </GuideListItem>
            </Panel.Section>
            <Panel.Section>
              <GuideListItem
                action={{
                  name: 'Explore Analytics',
                  onClick: () => handleAction('Explore Analytics'),
                }}
                itemCompleted={explore_analytics_completed}
              >
                <GuideListItemTitle>Explore Analytics</GuideListItemTitle>
                <GuideListItemDescription>
                  Get acquainted with our powerful analytics to make the most of your sending
                  strategy.
                </GuideListItemDescription>
              </GuideListItem>
            </Panel.Section>
            <Panel.Section>
              <GuideListItem
                action={{
                  name: 'Invite a Collaborator',
                  onClick: () => handleAction('Invite a Collaborator'),
                }}
                itemCompleted={invite_collaborator_completed}
              >
                <GuideListItemTitle>Invite Your Team</GuideListItemTitle>
                <GuideListItemDescription>
                  {
                    'Need help integrating? Pass the ball on to someone else to finish setting up this account.'
                  }
                  <br />
                  {'Or you can '}
                  <UnstyledLink
                    onClick={() => {
                      setAndStoreStepName("Let's Code");
                      setOnboardingAccountOption({ invite_collaborator_completed: true });
                    }}
                  >
                    setup email sending now
                  </UnstyledLink>
                </GuideListItemDescription>
              </GuideListItem>
            </Panel.Section>
          </>
        );
      case "Let's Code":
        return <Panel.Section>{renderBreadCrumbs()}</Panel.Section>;
      default:
        return null;
    }
  };
  return (
    <Panel title="Getting Started" actions={actions}>
      {renderStep()}
    </Panel>
  );
};
