import {IMoviesQueryResult} from '@src/interfaces';
import {Injection} from './Injection';
import {useGetMoviesQuery} from '@src/apiSlice';
import {TYPES} from '@src/types';

export const initialRegister = () => {
  const injection = Injection.getInstance();
  injection.register<IMoviesQueryResult>(TYPES.IMoviesQueryResult, () =>
    useGetMoviesQuery({}),
  );
};
