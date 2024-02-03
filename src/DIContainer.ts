export class Injection {
  private static main: Injection;
  private container: {[key: string]: any} = {};
  //static resolver = Injection.main.container;

  public static getInstance(): Injection {
    if (!Injection.main) {
      Injection.main = new Injection();
    }

    return Injection.main;
  }

  // static get resolver() {
  //   const mainInstance = Injection.getInstance(); // Ensure the main instance is created
  //   return mainInstance.container;
  // }

  register<T>(key: string, factoryFn: () => T) {
    this.container[key] = {
      factoryFn: factoryFn,
      instance: null,
    };
  }

  resolve(key: string) {
    const object = this.container[key];
    if (!object) {
      throw new Error(`Object for ${key} not found`);
    }
    if (!object.instance) {
      object.instance = object.factoryFn();
    }
    return object.instance;
  }
}
