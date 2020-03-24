import React from 'react';
import { Button, Panel } from 'src/components/matchbox';
import config from 'src/config';
import { getPlanPrice } from 'src/helpers/billing';
import PlanPrice from 'src/components/billing/PlanPrice';
import PromoCode from 'src/components/billing/PromoCode';
import Brightback from 'src/components/brightback/Brightback';
import { SupportTicketLink } from 'src/components/links';
import styles from './Confirmation.module.scss';
import { PLAN_TIERS } from 'src/constants';
import { Warning } from '@sparkpost/matchbox-icons';
export class Confirmation extends React.Component {
  renderSelectedPlanMarkup() {
    const { current = {}, selected = {}, selectedPromo = {} } = this.props;
    return !selected || selected.code === current.code ? (
      <p>Select a plan on the left to update your subscription</p>
    ) : (
      <div>
        <small>New Plan</small>
        <h5 className={styles.MainLabel}>
          {PLAN_TIERS[selected.tier] && <span>{PLAN_TIERS[selected.tier].toUpperCase()}:</span>}
          <PlanPrice plan={selected} selectedPromo={selectedPromo} />
        </h5>
      </div>
    );
  }

  renderCurrentPlanMarkup() {
    const { current } = this.props;
    return (
      <span>
        <small>Current Plan</small>
        <h4>
          <PlanPrice plan={current} />
        </h4>
      </span>
    );
  }

  renderPromoCodeField() {
    const { selectedPromo = {}, promoError } = this.props;
    return (
      <Panel.Section>
        <PromoCode selectedPromo={selectedPromo} promoError={promoError} />
      </Panel.Section>
    );
  }

  renderDeprecatedWarning() {
    const { current = {}, selected = {} } = this.props;

    if (current.code === selected.code || current.status !== 'deprecated') {
      return null;
    }
    return (
      <div name="deprecated-warning" className={styles.DeprecatedWarning}>
        <div className={styles.iconContainer}>
          <Warning className={styles.icon} size={32} />
        </div>
        <div className={styles.content}>
          The current plan you are on is no longer available. If you switch to the selected plan,
          you will not be able to switch back to your current one.
        </div>
      </div>
    );
  }

  render() {
    const { current = {}, selected = {}, disableSubmit, billingEnabled } = this.props;
    const currentPlanPricing = getPlanPrice(current);
    const selectedPlanPricing = getPlanPrice(selected);
    const isPlanSelected = current.code !== selected.code;
    const isFreeToFree = isPlanSelected && current.isFree && selected.isFree;
    const isDowngrade = currentPlanPricing.price > selectedPlanPricing.price || isFreeToFree;
    let effectiveDateMarkup = null;
    let ipMarkup = null;
    let addonMarkup = null;
    let buttonText = '';

    if (!billingEnabled) {
      buttonText = 'Enable Automatic Billing';
    } else {
      buttonText = isDowngrade ? 'Downgrade Plan' : 'Upgrade Plan';
    }

    if (isPlanSelected && billingEnabled) {
      if (isDowngrade) {
        effectiveDateMarkup = (
          <p>
            Your downgrade will take effect at the end of the current billing cycle. You will not be
            able to make any plan changes until your downgrade takes effect.
          </p>
        );
      } else {
        effectiveDateMarkup = current.isFree ? (
          <p>Your upgrade will be effective today.</p>
        ) : (
          <p>
            Your upgrade will be effective today and you'll be billed a pro-rated amount for your
            current billing cycle.
          </p>
        );
      }

      if (isDowngrade && current.includesIp && !selected.includesIp && !selected.isFree) {
        ipMarkup = (
          <div>
            <p>Note: your current plan includes a free dedicated IP address.</p>
            <p>
              If you downgrade to the selected plan, you will lose that discount and will be charged
              the standard ${config.sendingIps.pricePerIp} / month price for each dedicated IP on
              your next statement.
            </p>
            <p>
              To remove dedicated IPs from your account, please{' '}
              {
                <SupportTicketLink issueId="general_issue">
                  submit a support ticket
                </SupportTicketLink>
              }
              .
            </p>
          </div>
        );
      } else if (!isDowngrade && selected.includesIp && !current.includesIp) {
        ipMarkup = (
          <div>
            <p>{'A free dedicated IP address will be added to your default IP pool.'}</p>
          </div>
        );
      }

      if (selected.isFree && billingEnabled) {
        addonMarkup = (
          <p>
            This downgrade will remove all add-ons, including any dedicated IP addresses you may
            have purchased.
          </p>
        );
      }
    }

    return (
      <Panel>
        <Panel.Section>{this.renderCurrentPlanMarkup()}</Panel.Section>
        {isPlanSelected && !isDowngrade && this.renderPromoCodeField()}
        <Panel.Section>
          {this.renderSelectedPlanMarkup()}
          {effectiveDateMarkup}
          {ipMarkup}
          {addonMarkup}
          {this.renderDeprecatedWarning()}
        </Panel.Section>
        <Panel.Section>
          <Brightback
            condition={Boolean(
              billingEnabled && isPlanSelected && selected.isFree && !current.isFree,
            )}
            config={config.brightback.downgradeToFreeConfig}
            render={({ enabled, to }) => (
              <Button
                type={enabled ? 'button' : 'submit'}
                to={enabled ? to : null}
                fullWidth
                primary={!isDowngrade}
                destructive={isDowngrade}
                disabled={disableSubmit}
              >
                {buttonText}
              </Button>
            )}
          />
        </Panel.Section>
      </Panel>
    );
  }
}

export default Confirmation;
