/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { ActivityIndicator, SafeAreaView, View, Text } from 'react-native';
import Styles from './styles';
import MovieList from './MovieList';
import {  SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { Movies, Movie, Status } from './model';

import { useGetMoviesQuery } from './apiSlice'

function App(): JSX.Element {

  const query = useGetMoviesQuery({});
  const movies: Movies | undefined = query.data;
  const movieList: Movie[] = movies?.results || [];
  const isLoading: boolean = query.isLoading;
  const isSuccess: boolean = query.isSuccess;
  const isError: boolean = query.isError;
  const error: FetchBaseQueryError | SerializedError | undefined = query.error;
  
  return (
    <SafeAreaView style={Styles.safeAreaView}>
      <View style={Styles.container}>
        {isLoading && <ActivityIndicator />}
        {isSuccess && <MovieList movieList={movieList} />}
        {isError && <Text>{error?.toString()}</Text>}
      </View>
    </SafeAreaView>
  )};

export default App;
