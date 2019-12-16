import React from 'react';
import { shallow } from 'enzyme';
import { GettingStartedGuide } from '../GettingStartedGuide';
import { GUIDE_IDS } from '../../constants';

describe('GettingStartedGuide', () => {
  const defaultProps = {
    onboarding: { isGuideAtBottom: false },
    history: {
      push: jest.fn(),
    },
    setAccountOption: jest.fn(),
  };

  const subject = props => shallow(<GettingStartedGuide {...defaultProps} {...props} />);

  const guideOnSecondStep = buttonName => {
    const instance = subject();
    instance.find('Button').simulate('click');
    instance.find({ children: buttonName }).simulate('click');
    return instance;
  };

  it('should render correctly when guide is at bottom or when guide is at top', () => {
    expect(
      subject({ onboarding: { isGuideAtBottom: true } })
        .find('Panel')
        .prop('actions'),
    ).toBe(null);
    expect(
      subject({ onboarding: { isGuideAtBottom: false } })
        .find('Panel')
        .prop('actions'),
    ).not.toBe(null);
  });

  it('should render Sending Step when Start Sending Button is clicked', () => {
    const instance = subject();
    instance.find('Button').simulate('click');
    expect(instance.find('Card')).toHaveLength(2);
    expect(instance).toHaveTextContent('Show Me SparkPost');
    expect(instance).toHaveTextContent('Let&#39;s Code');
  });

  it('should store the stepName when any CardAction Button is clicked', () => {
    const instance = subject();
    instance
      .find('CardActions')
      .find('Button')
      .at(0)
      .simulate('click');
    expect(defaultProps.setAccountOption).toHaveBeenCalled();
  });

  it('should render the corresponding step when breadcrumb is clicked', () => {
    const instance = guideOnSecondStep('Show Me SparkPost');
    instance
      .find('BreadCrumbsItem')
      .at(1)
      .simulate('click');
    expect(instance).toHaveTextContent('Show Me SparkPost');
    expect(instance).toHaveTextContent('Let&#39;s Code');
  });

  it('should render the BreadCrumbItem as active corresponding to the Step', () => {
    const instance = guideOnSecondStep('Show Me SparkPost');
    expect(instance.find({ active: true })).toHaveTextContent('Show Me SparkPost');
  });

  it('should render three list items when on step "Show Me SparkPost" ', () => {
    const instance = guideOnSecondStep('Show Me SparkPost');
    expect(instance.find('GuideListItem')).toHaveLength(3);
  });

  it('should navigate to templates page when Send a Test Email button is clicked', () => {
    const instance = guideOnSecondStep('Show Me SparkPost');
    instance
      .find('GuideListItem')
      .at(0)
      .prop('action')
      .onClick();
    expect(defaultProps.history.push).toHaveBeenCalledWith(
      `/templates?pendo=${GUIDE_IDS.SEND_TEST_EMAIL}`,
    );
  });

  it('should navigate to summary report when Exlplore Analytics button is clicked', () => {
    const instance = subject();
    instance.find('Button').simulate('click');
    instance.find({ children: 'Show Me SparkPost' }).simulate('click');
    instance
      .find('GuideListItem')
      .at(1)
      .prop('action')
      .onClick();
    expect(defaultProps.history.push).toHaveBeenCalledWith(
      `/reports/summary?pendo=${GUIDE_IDS.EXPLORE_ANALYTICS}`,
    );
  });

  it('should navigate to users page when Invite a Collaborator is clicked', () => {
    const instance = guideOnSecondStep('Show Me SparkPost');
    instance
      .find('GuideListItem')
      .at(2)
      .prop('action')
      .onClick();
    expect(defaultProps.history.push).toHaveBeenCalledWith(`/account/users`);
  });

  it('should mark Invite a Collaborator list item as completed when the the corresponding button is clicked', () => {
    const instance = guideOnSecondStep('Show Me SparkPost');
    instance
      .find('GuideListItem')
      .at(2)
      .prop('action')
      .onClick();
    expect(defaultProps.setAccountOption).toHaveBeenCalledWith('onboarding', {
      invite_collaborator_completed: true,
    });
  });
});
