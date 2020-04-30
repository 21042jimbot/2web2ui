import React from 'react';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import ScrollToTop from './ScrollToTop';
import OGStyles from './Layout.module.scss';
import HibanaStyles from './LayoutHibana.module.scss';

const Form = ({ children }) => {
  const styles = useHibanaOverride(OGStyles, HibanaStyles);

  return (
    <div className={`${styles.wrapper} ${styles.form}`}>
      <main role="main" className={styles.content}>
        <div className={styles.container}>{children}</div>
      </main>
      <ScrollToTop />
    </div>
  );
};

export default Form;
