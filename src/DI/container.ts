import {IDependencies} from '@src/di/interfaces';
import {TYPES} from '@src/di/types';
import {Injection} from './Injection';

export const useDependenciesContainer = (): IDependencies => ({
  moviesQueryResult: () =>
    Injection.getInstance().resolve(TYPES.IMoviesQueryResult),
});
