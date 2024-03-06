import React, {FC, memo, useCallback} from 'react';
import {MOVIE_API_CONFIG} from './config';

import {FlatList, View, Text, Image} from 'react-native';

import Styles from './styles';
import {Movie} from './model';

type Props = {
  movieList: Movie[];
};

const MovieList: FC<Props> = ({movieList}) => {
  const renderItem = useCallback(
    ({
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
    ),
    [],
  );

  return <FlatList data={movieList} renderItem={renderItem} />;
};

export default memo(MovieList);
