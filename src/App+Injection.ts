export class Injection {
  private static main: Injection;
  private container: {[interfaceName: string]: any} = {};

  public static getInstance(): Injection {
    if (!Injection.main) {
      Injection.main = new Injection();
    }

    return Injection.main;
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
