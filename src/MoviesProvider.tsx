import React from 'react';
import {IInjection} from './DIContainer';
// import {TYPES} from './types';
// import {IMoviesQueryResult} from './interfaces';
import {useHook} from './useHook';
//import {createContext} from 'react';

// interface IInjectionContext {
//   container: () => IInjection;
// }

const InjectionContext = React.createContext<{
  container: IInjection | null;
}>({container: null});

// export const MoviesContext = createContext<IMoviesQueryContext>({
//   useGetMoviesQuery: () => ({
//     data: undefined,
//     isLoading: false,
//     isSuccess: false,
//     isError: false,
//     error: undefined,
//   }),
// });

type Props = {
  container: IInjection;
  children: React.ReactNode;
};

// interface InjectionProviderProps {
//   children: React.ReactNode;
// }

// export function MoviesProvider({children}: InjectionProviderProps) {
//   useHook();
//   const mainContainerInstance = Injection.getInstance();
//   const queryResult = mainContainerInstance.resolve<IMoviesQueryResult>(
//     TYPES.IMoviesQueryResult,
//   );

//   return (
//     <InjectionContext.Provider value={{container: () => Injection}}>
//       {children}
//     </InjectionContext.Provider>
//   );
// }

export const MoviesProvider: React.FC<Props> = props => {
  useHook();
  return (
    <InjectionContext.Provider value={{container: props.container}}>
      {props.children}
    </InjectionContext.Provider>
  );
};

export function useInjection<T>(identifier: symbol) {
  const {container} = React.useContext(InjectionContext);
  if (!container) {
    throw new Error();
  }
  //console.log('container', container);
  return container.resolve<T>(identifier);
}

// export function useInjection<T>(identifier: interfaces.ServiceIdentifier<T>) {
//   const { container } = useContext(InversifyContext);
//   if (!container) { throw new Error(); }
//   return container.get<T>(identifier);
// };
