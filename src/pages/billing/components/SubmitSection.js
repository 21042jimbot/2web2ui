import React from 'react';
import Brightback from 'src/components/brightback/Brightback';
import config from 'src/config';
import { Button } from 'src/components/matchbox';
import { useFeatureChangeContext } from '../context/FeatureChangeContext';

const SubmitSection = ({ brightbackCondition, loading }) => {
  const { loading: featureSectionLoading } = useFeatureChangeContext();
  if (featureSectionLoading) {
    return null;
  }

  return (
    <Brightback
      condition={Boolean(brightbackCondition)}
      config={config.brightback.downgradeToFreeConfig}
      render={({ enabled, to }) => (
        <Button
          type={enabled ? 'button' : 'submit'}
          to={enabled ? to : null}
          disabled={loading}
          variant="primary"
        >
          Change Plan
        </Button>
      )}
    />
  );
};

export default SubmitSection;
