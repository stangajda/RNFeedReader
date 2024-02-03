import React from 'react';
import {useGetMoviesQuery} from './apiSlice';
import {MoviesContext} from './MoviesContext';
import {Injection} from './DIContainer';

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
