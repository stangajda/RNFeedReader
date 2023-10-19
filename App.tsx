/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Image, SafeAreaView, Text, View, StyleSheet} from 'react-native';

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

  const getMovies = async () => {
    try {
      const response = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=babcada8d42a5fd4857231c42240debd');
      const json = await response.json();
      setData(json.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({id}) => id}
            renderItem={({item}) => (
              <View style={styles.listItem}>
                <Image source={{uri: `https://image.tmdb.org/t/p/w200${item.poster_path}`}} style={styles.image} />
                <View style={{flexDirection: "column", flex: 1 }}>
                  <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
                    {item.title}
                  </Text>
                  <View style={styles.ratingContainer}>
                    <Text style={styles.rating}>{item.vote_average} </Text> 
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

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1
  },
  container: {
    padding: 24
  },
  listItem: {
    flexDirection: "row",
    padding: 8
  },
  image: {
    width: 64,
    height: 88,
    marginRight: 8
  },
  title: {
    flexShrink: 1,
    fontSize: 16,
    fontWeight: 'bold'
  },
  ratingContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center"
  },
  rating: {
    fontWeight: 'bold'
  }
});

export default App;
