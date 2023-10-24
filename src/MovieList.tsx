import React from 'react';
import { FlatList, View, Text, Image, Button } from 'react-native';
import { useState } from 'react'; 

import Styles from './styles';
import { Movie } from './model';

type Props = {
  movieList: Movie[];
};
  
const MovieList: React.FC<Props> = ({ movieList }) => {
  const [selectedId, setSelectedId] = useState("");
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
        <Text numberOfLines={2} ellipsizeMode="tail" style={Styles.title}>
          {item.title}
        </Text>
        <View style={Styles.ratingContainer}>
          <Text style={Styles.rating}>{item.vote_average} </Text>
          <Text style={Styles.voteCount}>({item.vote_count})</Text>
          <View style={{ width: 8 }} />
          <Button
            title="Right button"
            onPress={
              () => {
                selectedId === item.id ? setSelectedId("") : setSelectedId(item.id);
                console.log(`Button pressed for movie ${item.id}: ${item.title}`)
              }
            }
          />
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
