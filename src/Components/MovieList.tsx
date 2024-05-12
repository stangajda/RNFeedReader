import React, {FC, memo, useCallback, useMemo} from 'react';
import {FlatList} from 'react-native';
import MovieItem from './MovieItem';

import {Movie} from '@src/models/Movie';
import {MovieListProps} from '@src/types/MovieList';

export type MovieItem = {
  item: Movie;
};
const MovieList: FC<MovieListProps> = ({movieList}) => {
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

export default memo(MovieList);
