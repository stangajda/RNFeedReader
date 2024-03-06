import {Container, IInjection, ServiceContainer} from './interfaces';

export class Injection implements IInjection {
  private static instance: Injection;
  // we define unknown as type because we do not know what type of object we will use we define later in the code use generic type
  private container: Container<unknown> = {};

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
}
