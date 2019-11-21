import React from 'react';
import _ from 'lodash';
import { getPlanPrice } from 'src/helpers/billing';
import styles from './PlanPrice.module.scss';
import { formatCurrency } from 'src/helpers/units';
import cx from 'classnames';

const PlanPrice = ({ plan, showOverage = false, showIp = false, showCsm = false, selectedPromo = {}, className }) => {
  if (_.isEmpty(plan)) {
    return null;
  }

  const priceInfo = getPlanPrice(plan);

  const overage = plan.price <= 0 || plan.isFree ? 'Full-featured developer account' : plan.overage ? `$${plan.overage.toFixed(2)}/ thousand extra emails. ` : null;

  const ip = plan.includesIp
    ? 'First dedicated IP address is free'
    : null;

  const displayCsm = showCsm && plan.includesCsm;

  let discountAmount = priceInfo.price;

  if (selectedPromo.discount_amount) {
    discountAmount = Math.max(priceInfo.price - selectedPromo.discount_amount, 0);
  }

  if (selectedPromo.discount_percentage) {
    discountAmount = discountAmount * ((100 - selectedPromo.discount_percentage) / 100);
  }

  const hasDiscount = discountAmount !== priceInfo.price;

  return (
    <span className={cx('notranslate', className)} >
      <span className={styles.MainLabel}>
        <strong>{plan.volume.toLocaleString()}</strong><span> emails/month </span>
        {priceInfo.price > 0
          ? <span>
            {' at '}
            {hasDiscount && <s className={styles.DiscountedLabel}>${priceInfo.price}</s>}
            <strong>{hasDiscount ? formatCurrency(discountAmount) : `$${priceInfo.price}`}</strong>
            /{priceInfo.intervalShort}
          </span>
          : <span> FREE </span>}
      </span>
      <span className={styles.SupportLabel}>
        {showOverage && overage}
        {showIp && ip}
      </span>
      {displayCsm && <span className={styles.SupportLabel}>Customer Success Manager included.</span>}
    </span>
  );
};

export default PlanPrice;
