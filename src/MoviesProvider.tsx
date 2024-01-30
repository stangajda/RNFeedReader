import React, {createContext, useContext} from 'react';
import {IMoviesQueryResult} from './interfaces';
import {useGetMoviesQuery} from './apiSlice';

const MoviesContext = createContext<IMoviesQueryResult | undefined>(undefined);

export const useMovies = () => {
  const context = useContext(MoviesContext);
  if (!context) {
    throw new Error('useMovies must be used within a MoviesProvider');
  }
  return context;
};

export const MoviesProvider: React.FC = ({children}) => {
  const queryResult = useGetMoviesQuery({});
  return (
    <MoviesContext.Provider value={queryResult}>
      {children}
    </MoviesContext.Provider>
  );
};
