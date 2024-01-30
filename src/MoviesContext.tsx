import {createContext} from 'react';
import {IMoviesQueryResult} from './interfaces';

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
