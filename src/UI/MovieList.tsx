import React, {FC, memo, useCallback, useMemo} from 'react';
import {movieApiPaths} from '@src/helper';

import {FlatList, View, Image} from 'react-native';

import Styles from './styles';
import {Movie} from '@src/model';
import MovieContent from './MovieContent';

type Props = {
  movieList: Movie[];
};

type MovieItem = {
  item: Movie;
};

const MovieList: FC<Props> = ({movieList}) => {
  const keyExtractor = useCallback((item: Movie) => item.id, []);

  const renderItem = useCallback(
    ({item}: MovieItem) => <MovieItem movie={item} />,
    [],
  );

  const memoizedMovieList = useMemo(() => movieList, [movieList]);

  return (
    <FlatList
      data={memoizedMovieList}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
};

const MovieItem = memo(({movie}: {movie: Movie}) => {
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

export default memo(MovieList);
