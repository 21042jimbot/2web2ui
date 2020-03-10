import React from 'react';
import { Banner } from 'src/components/matchbox';
import { LINKS } from 'src/constants';

const UnverifiedWarningBanner = () => {
  const action = {
    content: 'Learn more about review requirements',
    to: LINKS.SENDING_REQS,
    external: true,
  };

  return (
    <Banner
      status="warning"
      title="Unverified sending domains will be removed two weeks after creation."
      action={action}
      my={10}
    >
      <p>All domains will also need a clear web presence to pass verification.</p>
    </Banner>
  );
};

export default UnverifiedWarningBanner;
