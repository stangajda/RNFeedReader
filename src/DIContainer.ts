import {useGetMoviesQuery} from './apiSlice';
import {IDependencies} from './interfaces';

export const useDependencies = (): IDependencies => ({
  // eslint-disable-next-line react-hooks/rules-of-hooks
  moviesQueryResult: () => useGetMoviesQuery({}),
});
