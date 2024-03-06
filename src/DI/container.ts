import {IDependencies} from '@src/DI/interfaces';
import {TYPES} from '@src/types';
import {Injection} from './Injection';

export const useDependenciesContainer = (): IDependencies => ({
  moviesQueryResult: () =>
    Injection.getInstance().resolve(TYPES.IMoviesQueryResult),
});
