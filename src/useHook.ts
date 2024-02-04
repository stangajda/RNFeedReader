import {IMoviesQueryResult} from './interfaces';
import {MainContainer} from './Container';
import {useGetMoviesQuery} from './apiSlice';

import {TYPES} from './types';

export function useHook() {
  const injection = MainContainer.getInstance();

  const getMoviesQuery = useGetMoviesQuery({});
  injection.register<IMoviesQueryResult>(
    TYPES.IMoviesQueryResult,
    () => getMoviesQuery,
  );
}
