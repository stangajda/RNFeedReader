import React from 'react';
import {IInjection} from './DIContainer';
import {useHook} from './useHook';

const InjectionContext = React.createContext<{
  container: IInjection | null;
}>({container: null});

type Props = {
  container: IInjection;
  children: React.ReactNode;
};

export const MoviesProvider: React.FC<Props> = props => {
  return (
    <InjectionContext.Provider value={{container: props.container}}>
      {props.children}
    </InjectionContext.Provider>
  );
};

export function useInjection<T>(identifier: symbol) {
  const {container} = React.useContext(InjectionContext);
  if (!container) {
    throw new Error();
  }
  useHook();
  return container.resolve<T>(identifier);
}
