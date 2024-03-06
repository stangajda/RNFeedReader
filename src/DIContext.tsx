import React, {createContext, useContext, memo, ReactNode} from 'react';
import {IDependencies} from './interfaces';

const initialDependencies = {} as IDependencies;
const DependenciesContext = createContext<IDependencies>(initialDependencies);

const useDependencies = () => useContext(DependenciesContext);

export const DIProvider: React.FC<{children: ReactNode} & IDependencies> = memo(
  function DIProvider({children, ...additionalDependencies}) {
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
  },
);

export const useDI = (dependencies: IDependencies): IDependencies => {
  const upstreamDependencies = useDependencies();

  return Object.keys(upstreamDependencies).length > 0
    ? {...upstreamDependencies}
    : dependencies;
};
