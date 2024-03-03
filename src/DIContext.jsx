import {createContext, useContext, memo} from 'react';

const defaultDependencies = {};
const DependenciesContext = createContext(defaultDependencies);

const useDependencies = () => useContext(DependenciesContext);

export const DIProvider = memo(function DIProvider({
  children,
  ...customDependencies
}) {
  const upstreamDependencies = useDependencies();

  const dependencies = {
    ...upstreamDependencies,
    ...customDependencies,
  };

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <DependenciesContext.Provider value={dependencies}>
      {children}
    </DependenciesContext.Provider>
  );
});

export const useDI = dependencies => {
  const upstreamDependencies = useDependencies();

  if (Object.keys(upstreamDependencies).length > 0) {
    return {...dependencies, ...upstreamDependencies};
  }

  return dependencies;
};
