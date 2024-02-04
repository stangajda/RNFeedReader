import {IMoviesQueryResult} from './interfaces';
import {Injection} from './DIContainer';
import {useGetMoviesQuery} from './apiSlice';

import {TYPES} from './types';

export function useHook() {
  const injection = Injection.getInstance();

  const getMoviesQuery = useGetMoviesQuery({});
  injection.register<IMoviesQueryResult>(
    TYPES.IMoviesQueryResult,
    () => getMoviesQuery,
  );
}
