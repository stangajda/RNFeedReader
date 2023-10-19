/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, SafeAreaView, Text, View} from 'react-native';

type Movie = {
  id: string;
  backdrop_path: string;
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
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{padding: 24}}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({id}) => id}
            renderItem={({item}) => (
              <Text>
                {item.title}, {item.vote_average}, {item.vote_count}
              </Text>
            )}
          />
        )}
      </View>
    </SafeAreaView>
)};

export default App;
