import React, { useMemo } from 'react';
import { Check, ViewModule } from '@sparkpost/matchbox-icons';
import { Button, Panel } from 'src/components/matchbox';
import { PLAN_TIERS } from 'src/constants';
import PlanPrice from 'src/components/billing/PlanPrice';
import FeatureComparisonModal from './FeatureComparisonModal';
import cx from 'classnames';
import _ from 'lodash';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import OGStyles from './PlanSelect.module.scss';
import HibanaStyles from './PlanSelectHibana.module.scss';
import { useState } from 'react';
import PromoCodeNew from 'src/components/billing/PromoCodeNew';

export const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  function toggle() {
    setIsShowing(!isShowing);
  }
  return {
    isShowing,
    toggle,
  };
};

export function SelectedPlan({ bundle, onChange, promoCodeObj, handlePromoCode }) {
  const styles = useHibanaOverride(OGStyles, HibanaStyles);

  const { messaging: plan, tier } = bundle;
  const { price } = plan;

  const { isShowing, toggle } = useModal(false);
  const { selectedPromo } = promoCodeObj;
  return (
    <Panel
      title="Your New Plan"
      actions={[
        {
          content: (
            <span>
              Compare Features <ViewModule />
            </span>
          ),
          onClick: toggle,
          color: 'orange',
        },
      ]}
    >
      <FeatureComparisonModal open={isShowing} handleClose={toggle} />
      <Panel.Section>
        <div className={styles.SelectedPlan}>
          <div className={styles.tierLabel}>{PLAN_TIERS[tier]}</div>
          <div className={styles.PlanRow}>
            <div>
              <PlanPrice showOverage showIp showCsm plan={plan} selectedPromo={selectedPromo} />
            </div>
            <div>
              <Button onClick={() => onChange()} size="small" flat color="orange">
                Change
              </Button>
            </div>
          </div>
        </div>
      </Panel.Section>
      {price > 0 && (
        <Panel.Section>
          <div className={styles.PlanRow}>
            <PromoCodeNew
              key={selectedPromo.promoCode || 'promocode'}
              promoCodeObj={promoCodeObj}
              handlePromoCode={handlePromoCode}
            />
          </div>
        </Panel.Section>
      )}
    </Panel>
  );
}

export default function PlanSelectSection({ bundles, currentPlan, onSelect }) {
  const styles = useHibanaOverride(OGStyles, HibanaStyles);
  const publicBundlesByTier = useMemo(
    () =>
      _.groupBy(
        bundles.filter(x => x.status !== 'secret'),
        'tier',
      ),
    [bundles],
  );
  const { isShowing, toggle } = useModal(false);
  const planList = _.map(
    PLAN_TIERS,
    (label, key) =>
      publicBundlesByTier[key] && (
        <Panel.Section key={`tier_section_${key}`}>
          <div className={styles.tierLabel}>{label}</div>
          <div className={styles.tierPlans}>
            {publicBundlesByTier[key].map(bundle => {
              const { messaging, bundle: bundleCode } = bundle;
              const isCurrentPlan = currentPlan.code === bundleCode;
              return (
                <div
                  className={cx(styles.PlanRow, isCurrentPlan && styles.SelectedPlan)}
                  key={`plan_row_${bundleCode}`}
                >
                  <div>
                    {isCurrentPlan && <Check className={styles.CheckIcon} />}
                    <PlanPrice showOverage showIp showCsm plan={messaging} />
                  </div>
                  <div>
                    <Button
                      className={styles.selectButton}
                      disabled={isCurrentPlan}
                      onClick={() => onSelect(bundleCode)}
                      data-id={`select-plan-${bundleCode}`}
                      size="small"
                      variant="monochrome"
                    >
                      Select
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </Panel.Section>
      ),
  );

  return (
    <Panel
      title="Select a Plan"
      actions={[
        {
          content: (
            <span>
              Compare Features <ViewModule />
            </span>
          ),
          onClick: toggle,
          color: 'orange',
        },
      ]}
    >
      <FeatureComparisonModal open={isShowing} handleClose={toggle} />
      {planList}
    </Panel>
  );
}
