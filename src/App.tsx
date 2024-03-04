import React from 'react';
import {ActivityIndicator, SafeAreaView, View, Text} from 'react-native';
import Styles from './styles';
import MovieList from './MovieList';
import {Movie} from './model';

import {IMoviesQueryResult} from './interfaces';
import {useDependencies} from './DIContainer';
import {useDI} from './DIContext';

function App(): React.JSX.Element {
  const deps = useDI(useDependencies());

  const {data, isLoading, isSuccess, isError, error}: IMoviesQueryResult =
    deps.moviesQueryResult;
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
