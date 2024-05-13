import React, {FC, memo, useCallback, useMemo} from 'react';
import {FlatList} from 'react-native';
import MovieCard from './MovieItem';
import {Movie} from '@src/models/Movie';
import {MovieListProps} from '@src/types/MovieList';
import {MovieItem} from '@src/types/MovieItem';
const MovieList: FC<MovieListProps> = ({movieList}) => {
  const keyExtractor = useCallback((item: Movie) => item.id, []);

  const renderItem = useCallback(
    ({item}: MovieItem) => <MovieCard movie={item} />,
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
