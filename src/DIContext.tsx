import React, {createContext, useContext, memo, ReactNode} from 'react';
import {IDependencies} from './interfaces';

const defaultDependencies = {} as IDependencies;
const DependenciesContext = createContext<IDependencies>(defaultDependencies);

const useDependencies = () => useContext(DependenciesContext);

export const DIProvider: React.FC<{children: ReactNode} & IDependencies> = memo(
  function DIProvider({children, ...customDependencies}) {
    const upstreamDependencies = useDependencies();

    const dependencies: IDependencies = {
      ...upstreamDependencies,
      ...customDependencies,
    };

    return (
      <DependenciesContext.Provider value={dependencies}>
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
