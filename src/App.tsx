/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Image, SafeAreaView, Text, View} from 'react-native';
import Styles from './Styles';
import { getMovies } from './Api';
import { Movie } from './Model';

import { store } from './store'
import { Provider } from 'react-redux'

import { useSelector, useDispatch } from 'react-redux'
import { onAppear } from './feedSlice'

function App(): JSX.Element {
  //const [isLoading, setLoading] = useState(true);
  //const [data, setData] = useState<Movie[]>([]);

  const isLoading = useSelector((state) => state.feed.isLoading)
  const data = useSelector((state) => state.feed.data)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(onAppear())
    // getMovies().then((results) => {
    //   setData(results);
    //   setLoading(false);
    // });
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaView style={Styles.safeAreaView}>
        <View style={Styles.container}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={data}
              keyExtractor={({id}) => id}
              renderItem={({item}) => (
                <View style={Styles.listItem}>
                  <Image source={{uri: `https://image.tmdb.org/t/p/w200${item.poster_path}`}} style={Styles.image} />
                  <View style={Styles.rightItemContainer}>
                    <Text numberOfLines={2} ellipsizeMode="tail" style={Styles.title}>
                      {item.title}
                    </Text>
                    <View style={Styles.ratingContainer}>
                      <Text style={Styles.rating}>{item.vote_average} </Text> 
                      <Text style={Styles.voteCount}>({item.vote_count})</Text>
                    </View>
                  </View>
                </View>
              )}
            />
          )}
        </View>
      </SafeAreaView>
    </Provider>
)};

export default App;
