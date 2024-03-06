import {IDependencies} from '@src/interfaces';
import {TYPES} from '@src/types';
import {Injection} from './DIInjection';

export const useDependenciesContainer = (): IDependencies => ({
  moviesQueryResult: () =>
    Injection.getInstance().resolve(TYPES.IMoviesQueryResult),
});
