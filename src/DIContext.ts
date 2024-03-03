import { createContext, useContext, memo } from "react";

const defaultDependencies = {};
const DependenciesContext = createContext(defaultDependencies);

const useDependencies = () => useContext(DependenciesContext);

export const DIProvider = memo(function DIProvider({
  children,
  ...customDependencies
}) {
  const upstreamDependencies = useDependencies();

  // Notice that customDependencies have priority at the Provider level
  // to allow overriding dependencies at the scope level.
  const dependencies = {
    ...upstreamDependencies,
    ...customDependencies
  };

  return (
    <DependenciesContext.Provider value={dependencies}>
      {children}
    </DependenciesContext.Provider>
  );
});

export const useDI = (dependencies) => {
  const upstreamDependencies = useDependencies();

  if (Object.keys(upstreamDependencies).length > 0) {
    // Notice that upstreamDependencies have priority at the Component level.
    return { ...dependencies, ...upstreamDependencies };
  }

  return dependencies;
};
