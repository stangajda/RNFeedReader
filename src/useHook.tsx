import {IMoviesQueryResult} from './interfaces';
import {Injection} from './DIContainer';
import {useGetMoviesQuery} from './apiSlice';

export function useHook() {
  const injection = Injection.getInstance();
  const queryResult = useGetMoviesQuery({});
  injection.register<IMoviesQueryResult>(
    'IMoviesQueryResult',
    () => queryResult,
  );
}
