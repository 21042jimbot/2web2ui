import React, { cloneElement } from 'react';
import { Banner as OGBanner } from '@sparkpost/matchbox';
import { Banner as HibanaBanner } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import { Inline } from 'src/components/matchbox';
import { omitSystemProps } from 'src/helpers/hibana';
import OGStyles from './Banner.module.scss';
import hibanaStyles from './BannerHibana.module.scss';

OGBanner.displayName = 'OGBanner';
HibanaBanner.displayName = 'HibanaBanner';

function Banner(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (!isHibanaEnabled) {
    return <OGBanner {...omitSystemProps(props)} />;
  }

  return <HibanaBanner {...props} />;
}

function Actions(props) {
  const styles = useHibanaOverride(OGStyles, hibanaStyles); // TODO: Remove and replace styles with <Box/> component when OG theme is removed
  const [state] = useHibana();
  const { isHibanaEnabled } = state;
  const { children } = props;

  const renderChildren = () => {
    const childrenArr = React.Children.map(children, child => child);

    if (childrenArr.length === 1) {
      return cloneElement(childrenArr[0], {
        variant: isHibanaEnabled ? 'monochrome-secondary' : undefined,
        outline: !isHibanaEnabled,
      });
    }

    return React.Children.map(children, (child, index) => {
      if (index === 0) {
        return cloneElement(child, {
          variant: isHibanaEnabled ? 'monochrome' : undefined,
          outline: !isHibanaEnabled,
        });
      }

      return cloneElement(child, {
        variant: isHibanaEnabled ? 'monochrome-secondary' : undefined,
        outline: !isHibanaEnabled,
      });
    });
  };

  return (
    <div className={styles.BannerActions}>
      <Inline>{renderChildren()}</Inline>
    </div>
  );
}

Actions.displayName = 'Banner.Actions';

Banner.Actions = Actions;

export default Banner;
