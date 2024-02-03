class Injection {
  private static main: Injection;
  private container: {[key: string]: any} = {};
  static resolver = Injection.main.container;

  register(key: string, factoryFn: () => any) {
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

const mockSomeServiceFactory = () => ({});
const mockAnotherServiceFactory = () => ({});

const injection = new Injection();

injection.register('SomeService', mockSomeServiceFactory);
injection.register('AnotherService', mockAnotherServiceFactory);

const someServiceMock1 = injection.resolve('SomeService');
const someServiceMock2 = injection.resolve('SomeService');

console.log(someServiceMock1 === someServiceMock2); // true, both are the same instance
