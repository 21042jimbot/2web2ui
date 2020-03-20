import React, { Fragment } from 'react';

import { Panel } from 'src/components/matchbox';
import { Subaccount } from 'src/components';
import { LabelledValue, ReadyFor, StatusTooltipHeader } from 'src/components';
import StatusLabel from './StatusLabel';

const StatusDescription = ({ domain, readyFor, status }) => {
  const { subaccount_id, is_default_bounce_domain } = domain;

  return <Fragment>
    <Panel.Section>
      <LabelledValue label={<StatusTooltipHeader />}>
        <StatusLabel status={status} />
        {status === 'verified' && (
          <div>
            <ReadyFor
              {...readyFor}
              bounceDefault={is_default_bounce_domain}
              subaccount={subaccount_id}
            />
          </div>
        )}
      </LabelledValue>
    </Panel.Section>
    {
      subaccount_id &&
        <Panel.Section>
          <LabelledValue label='Subaccount'>
            <Subaccount id={subaccount_id} />
          </LabelledValue>
        </Panel.Section>
    }
  </Fragment>;
};

export default StatusDescription;
