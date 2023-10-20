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

function App(): JSX.Element {

  const isLoading = useSelector(getIsLoading)
  const data = useSelector(getData)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(onAppear())
  }, []);

  return (
    <SafeAreaView style={Styles.safeAreaView}>
      <View style={Styles.container}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <MovieList data={data} />
        )}
      </View>
    </SafeAreaView>
)};

export default App;
