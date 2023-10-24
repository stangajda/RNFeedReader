import React from 'react';
import { View, Text, Button } from 'react-native';
import Styles from './styles';
import { Movie } from './model';
import  { Dispatch } from 'react';

interface Props {
  item: Movie;
  selectedId: string;
  setSelectedId: Dispatch<React.SetStateAction<string>>;
}

const MovieListItem: React.FC<Props> = ({ item, selectedId, setSelectedId }) => {
  return (
    <>
      <Text numberOfLines={2} ellipsizeMode="tail" style={Styles.title}>
        {item.title}
      </Text>
      <View style={Styles.ratingContainer}>
        <Text style={Styles.rating}>{item.vote_average} </Text>
        <Text style={Styles.voteCount}>({item.vote_count})</Text>
        <View style={{ width: 8 }} />
        <Button
          title="Right button"
          onPress={() => {
            selectedId === item.id ? setSelectedId("") : setSelectedId(item.id);
            console.log(`Button pressed for movie ${item.id}: ${item.title}`);
          }}
        />
      </View>
    </>
  );
};

export default MovieListItem;