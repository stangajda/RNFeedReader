import React from 'react';
import { FlatList, View, Text, Image, Button } from 'react-native';
import { useState } from 'react'; 

import Styles from './styles';
import { Movie } from './model';
import MovieListItem from './MovieListItem';

type Props = {
  movieList: Movie[];
};
  
const MovieList: React.FC<Props> = ({ movieList }) => {
  const [selectedId, setSelectedId] = useState(String());
  const selectedStyle = {
    ...Styles.listItem,
    backgroundColor: "lightblue"
  };

  const renderItem = ({ item }: { item: Movie }) => (
    <View style={selectedId === item.id ? selectedStyle : Styles.listItem}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }}
        style={Styles.image}
      />
      <View style={Styles.rightItemContainer}>
        <MovieListItem item={item} selectedId={selectedId} setSelectedId={setSelectedId} />
      </View>
    </View>
  );

  return (
    <FlatList
      data={movieList}
      keyExtractor={({ id }) => id}
      renderItem={renderItem}
    />
  );
};

export default MovieList;
