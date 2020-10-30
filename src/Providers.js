import React from 'react';
import ErrorBoundary from 'src/components/errorBoundaries/ErrorBoundary';
import { Provider } from 'react-redux';
import Poll from 'src/context/Poll';
import { ThemeProvider } from 'src/components/matchbox';
import { HibanaProvider } from 'src/context/HibanaContext';
import { QueryCacheProvider } from 'src/context/QueryCache';

const reloadApp = () => {
  window.location.reload(true);
};

const Providers = ({ store = {}, children }) => (
  <Provider store={store}>
    <QueryCacheProvider>
      <HibanaProvider>
        <ThemeProvider target={document.querySelector('#styled-components-target')}>
          <ErrorBoundary onCtaClick={reloadApp} ctaLabel="Reload Page">
            <Poll>{children}</Poll>
          </ErrorBoundary>
        </ThemeProvider>
      </HibanaProvider>
    </QueryCacheProvider>
  </Provider>
);

export default Providers;
