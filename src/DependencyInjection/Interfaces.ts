export interface IInjection {
  register<T>(interfaceName: symbol, service: () => T): void;
  resolve<T>(interfaceName: symbol): T;
}

export interface ServiceContainer<T> {
  service: () => T;
  instance: T | null;
}

export interface Container<T> {
  [interfaceName: symbol]: ServiceContainer<T>;
}
