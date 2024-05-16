# React Hook & Redux Showcase Demo: Inversion of Control (IoC) with Dependency Injection using Context API, SOLID Principles, and Redux Toolkit - Full Code Coverage

### **Contextual IoC Example:** This example illustrates how to leverage React's Context API to provide dependencies throughout the component hierarchy. It demonstrates an IoC pattern that avoids global state management and circumvents prop drilling for cleaner and more maintainable code.

### Solution for Injecting Custom Hooks via IoC Interface into TSX Components While Ensuring Singleton Hook Instances.

### This approach facilitates testing, enhances maintainability, and promotes reusability with complete code coverage. Individual states can be injected and tested in isolation, resulting in a robust and scalable application architecture.

### 3 main benefits of this approach:
- **Code Reusability of Custom Hooks**: Enables seamless sharing of custom hooks between React Native and React web components.
- **Simplify Mocking**: IoC makes it much easier for developers to mock dependencies during testing, leading to more comprehensive and maintainable test suites.
- **Eliminate Flaky Tests**: IoC promotes the creation of isolated and independent test cases for each state separately, reducing the occurrence of flaky or unreliable tests.

## Good Uses

- **Code Reusability Across Projects**: Dependency Injection allows services, components, and React hooks to be reused in different contexts by decoupling them from their concrete dependencies. This enables seamless sharing of code between React Native and React web components.
- **Large-Scale Applications**: They benefit from the modular and maintainable code structure that IoC provides.
- **Centralizing Configuration**: A singleton container can manage and centralize the configuration for shared services, ensuring consistent behavior throughout the application.
- **Shared Resources Management**: When multiple components need to access the same instance of a resource, a singleton container can provide and manage this shared instance.
- **Adherence to SOLID Principles**: When the goal is to create a system with clear separation of concerns and flexibility.
- **Maintaining Single Instances with DI**: Utilizing an IoC container for singleton pattern implementation allows for the consistent creation of a single instance, while still providing the flexibility to manage dependencies through injection, leading to cleaner and more testable code.
- **Unit Testing and Mocking**: IoC facilitates testing by allowing easy substitution of dependencies, crucial for achieving 100% code coverage.
- **Maintainable Code**: It allows for the easy separation of concerns and allows for the easy replacement of dependencies.


## Less Ideal Uses

- **Simple State Logic**: The additional complexity of Redux Toolkit may not be justified for applications with straightforward state management.
- **Projects with a Small Scope**: The complexity of IoC, Dependency Injection, and adherence to SOLID principles might be excessive for small apps or rapid prototypes.
- **Teams Unfamiliar with Advanced Patterns**: The learning curve associated with Dependency Injection, IoC, or Redux can impede productivity if the development team lacks experience with these patterns.
- **Performance-Sensitive Environments**: The additional abstraction layers introduced by IoC and Dependency Injection can lead to performance overhead, which may be a critical issue in high-performance applications or real-time systems.
- **Simple Dependencies Management**: When an application has very few dependencies or when those dependencies are unlikely to change, introducing IoC might add more complexity than value, making direct instantiation more straightforward and transparent.

## iOC Implementation

### Define iOC interface for the hooks/service you want to inject.

```
export interface IMoviesQueryResult {
  data?: Movies;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error?: FetchBaseQueryError | SerializedError;
}
```

### Add iOC Interface to TYPES

```
const TYPES = {
  IMoviesQueryResult: Symbol.for('IMoviesQueryResult'),
};
```

### Register iOC Interface in Injection container

```
export const initialRegister = () => {
  const injection = Injection.getInstance();
  injection.register<IMoviesQueryResult>(TYPES.IMoviesQueryResult, () =>
    useGetMoviesQuery({}),
  );
};
```

### Add interface to useDependency container from Injection container

```
export const useDependenciesContainer = (): IDependencies => ({
  moviesQueryResult: () =>
    Injection.getInstance().resolve(TYPES.IMoviesQueryResult),
});
```

### Use the iOC Interface in your component

```
export const initialEnvRegister = (): void => {
  if (process.env.NODE_ENV !== 'test') {
    initialRegister();
  }
};

initialEnvRegister();
// This approach is follow react hooks rules. https://react.dev/reference/rules/rules-of-hooks
const deps = useInjectedDI(useDependenciesContainer());

const {data, isLoading, isSuccess, isError, error}: IMoviesQueryResult =
deps.moviesQueryResult();
```

### Use in your tests

```
beforeAll(() => {
    const dataResult = require('./StubMovieListResponseResult.json');
    const mockData = {
      data: dataResult,
      isLoading: false,
      isSuccess: true,
      isError: false,
    };
    Injection.getInstance().register(
      TYPES.IMoviesQueryResult,
      () => mockData,
    );
});

it('should match movie list loaded image json', () => {
    const deps = useDependenciesContainer();
    const tree = renderer
    .create(
        <DIInjectionProvider {...deps}>
        <ReduxApp />
        </DIInjectionProvider>,
    )
    .toJSON();
    expect(tree).toMatchSnapshot();
});
```


## Demo Installation

Run `yarn install` to install dependencies
Run `yarn start` to start the App.

This standalone project has been confirmed to be working on:

- Node v20.10.0 
- Xcode 15.1
- Android Studio 2023.2.1

## Running Unit Tests

Run `yarn test` to run all unit and snapshot tests.

## 3rd party Libraries
reduxjs/toolkit 1.9.7  
react 18.2.0  
react-native 0.72.6  
react-redux 8.1.3  
  

## Sources
https://github.com/inversify/InversifyJS   
https://pgarciacamou.medium.com/solving-react-dependency-injection-in-userland-for-testability-48c76916216d  
https://www.npmjs.com/package/react-magnetic-di 
