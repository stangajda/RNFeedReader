import {useGetMoviesQuery} from './apiSlice';
import {IDependencies} from './interfaces';

export const useDependencies = (): IDependencies => ({
  moviesQueryResult: useGetMoviesQuery({}),
});
