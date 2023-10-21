/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { ActivityIndicator, SafeAreaView, View } from 'react-native';
import Styles from './Styles';
import MovieList from './MovieList';

import { useSelector, useDispatch } from 'react-redux'
import { onAppear, getIsLoading, getData } from './feedSlice'
import { AppDispatch } from './store';
import { Movie } from './Model';

function App(): JSX.Element {

  const isLoading: boolean = useSelector(getIsLoading)
  const movieList: Movie[] = useSelector(getData)

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
