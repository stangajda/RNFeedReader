import React from 'react';
import {useGetMoviesQuery} from './apiSlice';
import {MoviesContext} from './MoviesContext';

interface MoviesQueryProviderProps {
  children: React.ReactNode;
}

export function MoviesProvider({children}: MoviesQueryProviderProps) {
  const queryResult = useGetMoviesQuery({});
  return (
    <MoviesContext.Provider value={{useGetMoviesQuery: () => queryResult}}>
      {children}
    </MoviesContext.Provider>
  );
}
