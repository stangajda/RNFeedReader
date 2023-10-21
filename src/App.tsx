/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { ActivityIndicator, SafeAreaView, View } from 'react-native';
import Styles from './styles';
import MovieList from './MovieList';

import { useSelector, useDispatch } from 'react-redux'
import { onAppear, getIsLoading, getMovieList } from './feedSlice'
import { AppDispatch } from './store';
import { Movie } from './model';

function App(): JSX.Element {

  const isLoading: boolean = useSelector(getIsLoading)
  const movieList: Movie[] = useSelector(getMovieList)

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(onAppear())
  }, []);

  return (
    <SafeAreaView style={Styles.safeAreaView}>
      <View style={Styles.container}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <MovieList movieList={movieList} />
        )}
      </View>
    </SafeAreaView>
)};

export default App;
