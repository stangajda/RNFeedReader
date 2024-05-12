// MovieItem.tsx
import React, {memo, useMemo} from 'react';
import {View, Image} from 'react-native';
import {movieApiPaths} from '@src/helper';
import Styles from './styles';
import {Movie} from '@src/model';
import MovieContent from './MovieContent';

type Props = {
  movie: Movie;
};

const MovieItem = memo(({movie}: Props) => {
  const imageUrl = useMemo(
    () => `${movieApiPaths.movieImageUrl()}${movie.poster_path}`,
    [movie.poster_path],
  );

  return (
    <View style={Styles.listItem}>
      <Image source={{uri: imageUrl}} style={Styles.image} />
      <View style={Styles.rightItemContainer}>
        <MovieContent movie={movie} />
      </View>
    </View>
  );
});

export default MovieItem;
