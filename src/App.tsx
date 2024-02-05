import React from 'react';
import {ActivityIndicator, SafeAreaView, View, Text} from 'react-native';
import Styles from './Styles';
import MovieList from './MovieList';
//import {MoviesContext} from './MoviesProvider';
import {useInjection} from './MoviesProvider';

import {Movie} from './Model';
import {IMoviesQueryResult} from './interfaces';

// import {Injection} from './DIContainer';
// import {useHook} from './useHook';

import {TYPES} from './types';

function App(): React.JSX.Element {
  //Injection.resolver.register('com1', useGetMoviesQuery({}));
  //const {useGetMoviesQuery} = useContext(MoviesContext);
  // const injection = Injection.getInstance();
  // const queryResult = useGetMoviesQuery({});
  // injection.register<IMoviesQueryResult>(
  //   'IMoviesQueryResult',
  //   () => queryResult,
  // );

  //useHook();
  //const injection = Injection.getInstance();
  //const {data, isLoading, isSuccess, isError, error} =
  //injection.resolve<IMoviesQueryResult>(TYPES.IMoviesQueryResult);

  const provider = useInjection<IMoviesQueryResult>(TYPES.IMoviesQueryResult);
  const {data, isLoading, isSuccess, isError, error} = provider;
  const movieList: Movie[] = data?.results || [];

  let content: React.JSX.Element | null;

  switch (true) {
    case isLoading:
      content = <ActivityIndicator />;
      break;
    case isSuccess:
      content = <MovieList movieList={movieList} />;
      break;
    case isError:
      content = <Text>{error?.toString()}</Text>;
      break;
    default:
      content = null;
  }

  return (
    <SafeAreaView style={Styles.safeAreaView}>
      <View style={Styles.container}>{content}</View>
    </SafeAreaView>
  );
}

export default App;
