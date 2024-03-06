import {useGetMoviesQuery} from '@src/apiSlice';
import {IMoviesQueryResult} from '@src/interfaces';
import {TYPES} from '@src/types';

export interface IInjection {
  register<T>(interfaceName: symbol, service: () => T): void;
  resolve<T>(interfaceName: symbol): T;
  initialRegister(): void;
}

interface Container<T> {
  [interfaceName: symbol]: ServiceContainer<T>;
}

interface ServiceContainer<T> {
  service: () => T;
  instance: T | null;
}

export class Injection implements IInjection {
  private static instance: Injection;
  // we define any more spocific in the functions 'as ServiceContainer<T>' to use generic type from function
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
    } as ServiceContainer<T>;
  }

  resolve<T>(interfaceName: symbol): T {
    const object = this.container[interfaceName] as ServiceContainer<T>;
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

  initialRegister() {
    this.register<IMoviesQueryResult>(TYPES.IMoviesQueryResult, () =>
      useGetMoviesQuery({}),
    );
  }
}
