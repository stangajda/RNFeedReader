// MovieTitleAndRating.tsx
import React, {memo} from 'react';
import {View, Text} from 'react-native';
import {Movie} from '@src/model';
import Styles from './styles';

interface Props {
  movie: Movie;
}

const MovieContent: React.FC<Props> = ({
  movie: {title, vote_average, vote_count},
}) => (
  <View>
    <Text numberOfLines={2} ellipsizeMode="tail" style={Styles.title}>
      {title}
    </Text>
    <View style={Styles.ratingContainer}>
      <Text style={Styles.rating}>{vote_average} </Text>
      <Text style={Styles.voteCount}>({vote_count})</Text>
    </View>
  </View>
);

export default memo(MovieContent);
