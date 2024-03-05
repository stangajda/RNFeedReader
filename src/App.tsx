import React from 'react';
import {ActivityIndicator, SafeAreaView, View, Text} from 'react-native';
import Styles from './styles';
import MovieList from './MovieList';
import {useInjection} from './MoviesProvider';

import {Movie} from './model';
import {IMoviesQueryResult} from './interfaces';

import {TYPES} from './types';
import { Injection } from './DIContainer';

function App(): React.JSX.Element {
  const provider2 = Injection.getInstance().resolve2<IMoviesQueryResult>(
    TYPES.IMoviesQueryResult,
  );
  const {data, isLoading, isSuccess, isError, error} = provider2();
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
