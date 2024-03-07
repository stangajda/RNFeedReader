# React Hook & Redux Showcase: Inversion of Control (IoC) with Dependency Injection, SOLID Principles, and Redux Toolkit - 100% Code Coverage

### **Contextual IoC Example:** Demonstrate the use of React's context system to pass down dependencies through the component tree, showing how IoC can be achieved without relying on global state or props drilling.

## This project is not over-engineered or excessive in its complexity. Rather, it is intended to showcase my skills to potential employers or clients in writing high-quality code and implementing advanced solutions that can be used in larger projects. However, before using these solutions in a larger project, it is important to experiment with them on a smaller, standalone project to ensure their effectiveness and suitability.

## While it's important to showcase our skills and demonstrate our ability to implement advanced solutions, it's also crucial to find a balance between complexity and practicality in real-world projects. Ultimately, we need to adhere to the requirements and guidelines set by the organization and ensure that our code is maintainable, scalable, and efficient. Additionally, we need to consider the team dynamics and ensure that our code is easy to understand, modify, and maintain by other team members. By finding this balance, we can create high-quality code that meets the needs of the project, the organization, and the team.

# Good Uses

- **Large-Scale Applications**: They benefit from the modular and maintainable code structure that IoC provides.
- **Centralizing Configuration**: A singleton container can manage and centralize the configuration for shared services, ensuring consistent behavior throughout the application.
- **Shared Resources Management**: When multiple components need to access the same instance of a resource, a singleton container can provide and manage this shared instance.
- **Adherence to SOLID Principles**: When the goal is to create a system with clear separation of concerns and flexibility.
- **Maintaining Single Instances with DI**: Utilizing an IoC container for singleton pattern implementation allows for the consistent creation of a single instance, while still providing the flexibility to manage dependencies through injection, leading to cleaner and more testable code.
- **Unit Testing and Mocking**: IoC facilitates testing by allowing easy substitution of dependencies, crucial for achieving 100% code coverage.
- **Maintainable Code**: It allows for the easy separation of concerns and allows for the easy replacement of dependencies.
- **Code Reusability Across Projects**: Dependency Injection allows services and components to be reused in different contexts by decoupling them from their concrete dependencies.

# Less Ideal Uses

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
