import React from 'react';
import {ActivityIndicator, SafeAreaView, View, Text} from 'react-native';
import Styles from './Styles';
import MovieList from './MovieList';
import {useInjection} from './MoviesProvider';

import {Movie} from './Model';
import {IMoviesQueryResult} from './interfaces';

import {TYPES} from './types';

function App(): React.JSX.Element {
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
