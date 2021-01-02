import React, { useEffect, useState } from 'react';

export const withObservableStream = (observable, triggers, initState) => (
  Component
) => (props) => {
  const [state, setState] = useState(initState);
  useEffect(() => {
    const subscription = observable.subscribe((newState) => setState(newState));
    return () => subscription.unsubscribe();
  }, []);

  return <Component {...props} {...state} {...triggers} />;
};
