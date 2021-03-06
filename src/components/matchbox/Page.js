import React from 'react';
import { useLocation } from 'react-router-dom';
import { Page as OGPage } from '@sparkpost/matchbox';
import { Page as HibanaPage } from '@sparkpost/matchbox-hibana';

import { useHibana } from 'src/context/HibanaContext';
import { omitSystemProps } from 'src/helpers/hibana';
import { segmentTrack, SEGMENT_EVENTS } from 'src/helpers/segment';
import Loading from 'src/components/loading';

export default function Page({ hibanaEmptyStateComponent: HibanaEmptyStateComponent, ...props }) {
  const [{ isHibanaEnabled }] = useHibana();
  const location = useLocation();
  const showHibanaEmptyState = HibanaEmptyStateComponent && props.empty?.show;
  const emptyStateTrackingOnly = props.empty?.trackingOnly; // dont look at show or HibanaEmptyStateComponent, just track with segment

  React.useEffect(() => {
    if (isHibanaEnabled && (showHibanaEmptyState || emptyStateTrackingOnly) && !props.loading) {
      segmentTrack(SEGMENT_EVENTS.EMPTY_STATE_LOADED, {
        location: location,
        // ...segmentMetaData,
      });
    }
  }, [emptyStateTrackingOnly, isHibanaEnabled, location, props.loading, showHibanaEmptyState]);

  if (props.loading) return <Loading />;

  if (!isHibanaEnabled) {
    return <OGPage {...omitSystemProps(props)} />;
  }

  if (showHibanaEmptyState && !emptyStateTrackingOnly) {
    return <HibanaEmptyStateComponent />;
  }

  return <HibanaPage {...props} />;
}

OGPage.displayName = 'OGPage';
HibanaPage.displayName = 'HibanaPage';
