import React, { createContext, useReducer, useContext } from 'react';

// See:
// https://kentcdodds.com/blog/how-to-use-react-context-effectively

const HibanaStateContext = createContext();
const HibanaDispatchContext = createContext();

const initialState = {
  isHibanaEnabled: process.env.REACT_APP_DEFAULT_TO_HIBANA === 'true' ? true : false,
};

function useHibana() {
  return [useHibanaState(), useHibanaDispatch()];
}

function hibanaReducer(state, action) {
  switch (action.type) {
    case 'ENABLE': {
      return { isHibanaEnabled: true };
    }
    case 'DISABLE': {
      return { isHibanaEnabled: false };
    }
    default: {
      throw new Error(`Unhandled Hibana action type: ${action.type}`);
    }
  }
}

function HibanaProvider({ children }) {
  const [state, dispatch] = useReducer(hibanaReducer, initialState);

  return (
    <HibanaStateContext.Provider value={state}>
      <HibanaDispatchContext.Provider value={dispatch}>{children}</HibanaDispatchContext.Provider>
    </HibanaStateContext.Provider>
  );
}

function HibanaConsumer({ children }) {
  return <HibanaStateContext.Consumer>{children}</HibanaStateContext.Consumer>;
}

function useHibanaState() {
  const context = useContext(HibanaStateContext);

  if (context === undefined) throw new Error('useHibanaState must be used within a HibanaProvider');

  return context;
}

function useHibanaDispatch() {
  const context = useContext(HibanaDispatchContext);

  if (context === undefined)
    throw new Error('useHibanaDispatch must be used within a HibanaProvider');

  return context;
}

export { HibanaProvider, HibanaConsumer, useHibana };
