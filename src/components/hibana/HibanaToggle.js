import React from 'react';
import { useHibana } from 'src/context/HibanaContext';
import styles from './HibanaComponents.module.scss';

export default function HibanaToggle() {
  const [state, dispatch] = useHibana();
  const { isHibanaEnabled } = state;

  if (isHibanaEnabled) {
    return (
      <button className={styles.HibanaToggle} onClick={() => dispatch({ type: 'DISABLE' })}>
        Disable Hibana
      </button>
    );
  }

  return (
    <button className={styles.HibanaToggle} onClick={() => dispatch({ type: 'ENABLE' })}>
      Enable Hibana
    </button>
  );
}