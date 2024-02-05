import React from 'react';
import {Injection} from './DIContainer';
import {TYPES} from './types';
import {IMoviesQueryResult} from './interfaces';
import {useHook} from './useHook';
import {createContext} from 'react';

interface IMoviesQueryContext {
  useGetMoviesQuery: () => IMoviesQueryResult;
}

export const MoviesContext = createContext<IMoviesQueryContext>({
  useGetMoviesQuery: () => ({
    data: undefined,
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: undefined,
  }),
});

interface MoviesQueryProviderProps {
  children: React.ReactNode;
}

export function MoviesProvider({children}: MoviesQueryProviderProps) {
  useHook();
  const mainContainerInstance = Injection.getInstance();
  const queryResult = mainContainerInstance.resolve<IMoviesQueryResult>(
    TYPES.IMoviesQueryResult,
  );

  return (
    <MoviesContext.Provider value={{useGetMoviesQuery: () => queryResult}}>
      {children}
    </MoviesContext.Provider>
  );
}
