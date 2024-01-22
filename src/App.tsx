/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useContext} from 'react';
import {ActivityIndicator, SafeAreaView, View, Text} from 'react-native';
import Styles from './Styles';
import MovieList from './MovieList';
import {Movie} from './Model';
//import {useContainer2} from './useContainer';
import {ContainerContext} from './containerContext';
import {IMoviesQueryResult} from './interfaces';

function App(): React.JSX.Element {
  const {container} = useContext(ContainerContext);
  const {data, isLoading, isSuccess, isError, error}: IMoviesQueryResult =
    container.useGetMoviesQueryContainer();
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
