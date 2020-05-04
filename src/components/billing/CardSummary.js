import React from 'react';
import { CreditCard } from '@sparkpost/matchbox-icons';
import { LabelledValue } from 'src/components';
import { Stack } from 'src/components/matchbox';

const CardSummary = ({ credit_card, label }) => {
  if (!credit_card) {
    return <p>No credit card information present.</p>;
  }

  return (
    <LabelledValue label={label}>
      <Stack>
        <h6>
          <strong>
            <CreditCard size={16} /> {credit_card.type} ····{' '}
            {credit_card.number.substr(credit_card.number.length - 4)}
          </strong>
        </h6>
        <p>
          Expires {credit_card.expiration_month}/{credit_card.expiration_year}
        </p>
      </Stack>
    </LabelledValue>
  );
};

export default CardSummary;
