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
import { fetchMovies, getLoadableStatus, getMovieList } from './feedSlice'
import { AppDispatch } from './store';
import { Movie, Status } from './model';

function App(): JSX.Element {

  const loadableStatus: Status = useSelector(getLoadableStatus)
  const movieList: Movie[] = useSelector(getMovieList)

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchMovies())
  }, []);

  return (
    <SafeAreaView style={Styles.safeAreaView}>
      <View style={Styles.container}>
        {loadableStatus === Status.Loading && <ActivityIndicator />}
        {loadableStatus === Status.Succeeded && <MovieList movieList={movieList} />}
      </View>
    </SafeAreaView>
)};

export default App;
