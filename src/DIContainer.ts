interface Container<T> {
  [interfaceName: string]: T;
}

export class Injection {
  private static instance: Injection;
  private container: Container<any> = {};

  public static getInstance(): Injection {
    if (!Injection.instance) {
      Injection.instance = new Injection();
    }

    return Injection.instance;
  }

  register<T>(interfaceName: string, service: () => T) {
    this.container[interfaceName] = {
      service: service,
      instance: null,
    };
  }

  resolve<T>(interfaceName: string): T {
    const object = this.container[interfaceName];
    if (!object) {
      throw new Error(`Object for Interface Name ${interfaceName} not found`);
    }
    if (!object.instance) {
      object.instance = object.service();
    }
    return object.instance;
  }
}
