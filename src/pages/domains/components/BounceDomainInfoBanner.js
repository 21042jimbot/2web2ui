import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Banner, Picture } from 'src/components/matchbox';
import SendingMailWebp from '@sparkpost/matchbox-media/images/Sending-Mail.webp';
import SendingMail from '@sparkpost/matchbox-media/images/Sending-Mail@medium.jpg';
import { Bold, TranslatableText } from 'src/components/text';
import { updateUserUIOptions } from 'src/actions/currentUser';
import { isUserUiOptionSet } from 'src/helpers/conditions/user';
import { LINKS } from 'src/constants';

export default function InfoBanner() {
  const [dismissed, setDismissed] = useState(
    useSelector(state => isUserUiOptionSet('onboardingV2.bounceDomainBannerDismissed')(state)),
  );
  const dispatch = useDispatch();
  const handleDismiss = () => {
    setDismissed(true);
    dispatch(updateUserUIOptions({ onboardingV2: { bounceDomainBannerDismissed: true } }));
  };
  if (dismissed) return null;

  return (
    <Banner
      onDismiss={handleDismiss}
      size="large"
      status="muted"
      title="Bounce Domains"
      backgroundColor="gray.100"
      borderWidth="100"
      borderStyle="solid"
      borderColor="gray.400"
      mb="600"
    >
      <p>
        <TranslatableText>
          Custom bounce domains override the default Return-Path value, also known as the envelope
          FROM value, which denotes the destination for out-of-band bounces. Bounce domains can be
          set up using an&nbsp;
        </TranslatableText>
        <Bold>existing Sending Domain&nbsp;</Bold>
        <TranslatableText>or by adding a new domain specifically for bounce.</TranslatableText>
      </p>
      <Banner.Action color="blue" to={LINKS.BOUNCE_DOMAIN_DOCS} external variant="outline">
        Bounce Domains Documentation
      </Banner.Action>
      <Banner.Media>
        <Picture seeThrough>
          <source srcSet={SendingMailWebp} type="image/webp" />
          <Picture.Image alt="" src={SendingMail} />
        </Picture>
      </Banner.Media>
    </Banner>
  );
}
