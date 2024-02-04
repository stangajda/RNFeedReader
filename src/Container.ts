interface Container<T> {
  [interfaceName: symbol]: T;
}

export class MainContainer {
  private static instance: MainContainer;
  private container: Container<any> = {};

  public static getInstance(): MainContainer {
    if (!MainContainer.instance) {
      MainContainer.instance = new MainContainer();
    }

    return MainContainer.instance;
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
}
