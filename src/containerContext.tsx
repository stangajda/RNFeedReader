import React, {createContext} from 'react';
import {IContainer} from './interfaces';
import {useContainer2} from './useContainer';

// Provide a sensible default value or null if there isn't one
export const ContainerContext = createContext<IContainer | null>(null);

const ContainerProvider = ({children}: {children: React.ReactNode}) => {
  const container = useContainer2();

  return (
    <ContainerContext.Provider value={container}>
      {children}
    </ContainerContext.Provider>
  );
};

export default ContainerProvider;
