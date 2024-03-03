/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {ActivityIndicator, SafeAreaView, View, Text} from 'react-native';
import Styles from './styles';
import MovieList from './MovieList';

import {Movie} from './model';

import {useGetMoviesQuery} from './apiSlice';
import {IMoviesQueryResult, IDependencies} from './interfaces';

import {useDI} from './DIContext';

function useCustomHook(): IDependencies {
  return {moviesQueryResult: useGetMoviesQuery({})};
}

function App(): React.JSX.Element {
  const deps = useDI(useCustomHook());

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
