import React from 'react';
import {MOVIE_API_CONFIG} from './Config';

import {FlatList, View, Text, Image} from 'react-native';

import Styles from './Styles';
import {Movie} from './Model';

type Props = {
  movieList: Movie[];
};

const MovieList: React.FC<Props> = ({movieList}) => {
  const renderItem = ({
    item: {id, poster_path, title, vote_average, vote_count},
  }: {
    item: Movie;
  }) => (
    <View style={Styles.listItem} key={id}>
      <Image
        source={{uri: `${MOVIE_API_CONFIG.movieImageUrl()}${poster_path}`}}
        style={Styles.image}
      />
      <View style={Styles.rightItemContainer}>
        <Text numberOfLines={2} ellipsizeMode="tail" style={Styles.title}>
          {title}
        </Text>
        <View style={Styles.ratingContainer}>
          <Text style={Styles.rating}>{vote_average} </Text>
          <Text style={Styles.voteCount}>({vote_count})</Text>
        </View>
      </View>
    </View>
  );

  return <FlatList data={movieList} renderItem={renderItem} />;
};

export default MovieList;
