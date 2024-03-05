import {useGetMoviesQuery} from './apiSlice';
import {IDependencies} from './interfaces';
import {IMoviesQueryResult} from './interfaces';

import {TYPES} from './types';

export interface IInjection {
  register<T>(interfaceName: symbol, service: () => T): void;
  resolve<T>(interfaceName: symbol): T;
  useResolve<T>(interfaceName: symbol): T;
  initialRegister(): void;
}

interface Container<T> {
  [interfaceName: symbol]: T;
}

export class Injection implements IInjection {
  private static instance: Injection;
  private container: Container<any> = {};

  public static getInstance(): Injection {
    if (!Injection.instance) {
      Injection.instance = new Injection();
    }

    return Injection.instance;
  }

  register<T>(interfaceName: symbol, service: () => T) {
    this.container[interfaceName] = {
      service: service,
      instance: null,
    };
  }

  resolve<T>(interfaceName: symbol): T {
    const object = this.container[interfaceName];
    if (!object) {
      throw new Error(
        `Object for Interface Name ${interfaceName.toString()} not found`,
      );
    }
    if (!object.instance) {
      object.instance = object.service();
    }
    return object.instance;
  }

  lazyResolve<T>(interfaceName: symbol): () => T {
    const object = this.container[interfaceName];
    if (!object) {
      throw new Error(
        `Object for Interface Name ${interfaceName.toString()} not found`,
      );
    }
    if (!object.instance) {
      object.instance = object.service();
    }
    return () => object.instance;
  }

  useResolve<T>(interfaceName: symbol): T {
    return this.resolve(interfaceName);
  }

  initialRegister() {
    this.register<IMoviesQueryResult>(TYPES.IMoviesQueryResult, () =>
      useGetMoviesQuery({}),
    );
  }
}

// export function initialRegister() {
//   const injection = Injection.getInstance();

//   injection.register<IMoviesQueryResult>(TYPES.IMoviesQueryResult, () =>
//     useGetMoviesQuery({}),
//   );
// }

export const useDependencies = (): IDependencies => ({
  // eslint-disable-next-line react-hooks/rules-of-hooks
  moviesQueryResult: () => useGetMoviesQuery({}),
});

export const mockDependencies = (
  mockData: IMoviesQueryResult,
): IDependencies => ({
  moviesQueryResult: () => mockData,
});
