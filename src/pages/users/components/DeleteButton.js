import React from 'react';
import { Button } from 'src/components/matchbox';

function noop() {}

export default function DeleteButton({ disabled = false, name = null, onClick = noop }) {
  // Display nothing when disabled
  if (disabled) { return null; }

  const handleClick = (event) => { onClick(name); };

  return (
    <Button destructive size="small" name={name} onClick={handleClick}>
      Delete
    </Button>
  );
}
