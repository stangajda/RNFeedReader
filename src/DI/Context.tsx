import React, {createContext, useContext, memo, ReactNode} from 'react';
import {IDependencies} from '@src/DI/interfaces';

const initialDependencies = {} as IDependencies;
const DependenciesContext = createContext<IDependencies>(initialDependencies);

const useDependencies = () => useContext(DependenciesContext);

export const DIInjectionProvider: React.FC<
  {children: ReactNode} & IDependencies
> = memo(function DIInjectionProvider({children, ...additionalDependencies}) {
  const existingDependencies = useDependencies();

  const mergedDependencies: IDependencies = {
    ...existingDependencies,
    ...additionalDependencies,
  };

  return (
    <DependenciesContext.Provider value={mergedDependencies}>
      {children}
    </DependenciesContext.Provider>
  );
});

export const useInjectedDI = (dependencies: IDependencies): IDependencies => {
  const existingDependencies = useDependencies();

  return Object.keys(existingDependencies).length > 0
    ? {...existingDependencies}
    : dependencies;
};
