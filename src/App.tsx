/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { ActivityIndicator, SafeAreaView, View, Text } from 'react-native';
import Styles from './styles';
import MovieList from './MovieList';

import { Movie } from './model';

import { useGetMoviesQuery } from './apiSlice'

function App(): JSX.Element {

  const { data, isLoading, isSuccess, isError, error } = useGetMoviesQuery({});
  const movieList: Movie[] = data?.results || [];

  let content: JSX.Element | null;

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
  )};

export default App;
