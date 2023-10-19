/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Image, SafeAreaView, Text, View} from 'react-native';
import Styles from './styles';
import { getMovies } from './api';

type Movie = {
  id: string;
  poster_path: string;
  title: string;
  vote_average: number;
  vote_count: number;
};

function App(): JSX.Element {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Movie[]>([]);

  useEffect(() => {
    getMovies().then((results) => {
      setData(results);
      setLoading(false);
    });
  }, []);

  return (
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
                <View style={{flexDirection: "column", flex: 1 }}>
                  <Text numberOfLines={2} ellipsizeMode="tail" style={Styles.title}>
                    {item.title}
                  </Text>
                  <View style={Styles.ratingContainer}>
                    <Text style={Styles.rating}>{item.vote_average} </Text> 
                    <Text>({item.vote_count})</Text>
                  </View>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
)};

export default App;
