import React from 'react';
import { Checkbox } from 'src/components/matchbox';

export default function CheckboxWrapper({ input, meta, ...rest }) {
  const { active, error, touched } = meta;

  return (
    <Checkbox
      id={input.name}
      {...input}
      error={!active && touched && error ? error : undefined}
      {...rest}
    />
  );
}
