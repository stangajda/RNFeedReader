import React from 'react';
//import {useGetMoviesQuery} from './apiSlice';
import {MoviesContext} from './MoviesContext';
import {MainContainer} from './Container';
import {TYPES} from './types';
import {IMoviesQueryResult} from './interfaces';
import {useHook} from './useHook';

interface MoviesQueryProviderProps {
  children: React.ReactNode;
}

export function MoviesProvider({children}: MoviesQueryProviderProps) {
  useHook();
  const mainContainerInstance = MainContainer.getInstance();
  const queryResult = mainContainerInstance.resolve<IMoviesQueryResult>(
    TYPES.IMoviesQueryResult,
  );

  return (
    <MoviesContext.Provider value={{useGetMoviesQuery: () => queryResult}}>
      {children}
    </MoviesContext.Provider>
  );
}
