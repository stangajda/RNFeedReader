import React from 'react';
import { FlatList, View, Text, Image } from 'react-native';

import Styles from './Styles';
import { Movie } from './Model';

type Props = {
  movieList: Movie[];
};
  
const MovieList: React.FC<Props> = ({ movieList }) => {
  const renderItem = ({ item }: { item: Movie }) => (
    <View style={Styles.listItem}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }}
        style={Styles.image}
      />
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
