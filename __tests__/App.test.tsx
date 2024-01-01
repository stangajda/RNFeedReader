import 'react-native';
import React, {ReactNode} from 'react';
import {it} from '@jest/globals';
import fetchMock from 'jest-fetch-mock';
import {useGetMoviesQuery} from '../src/apiSlice';
import {renderHook, waitFor} from '@testing-library/react-native';

import {store} from '../src/store';
import {Provider} from 'react-redux';

fetchMock.enableMocks();

function wrapper({children}: {children: ReactNode}) {
  return <Provider store={store}>{children}</Provider>;
}

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('useGetMoviesQuery', () => {
  const endpointName = 'getMovies';
  const data = {
    results: [
      {
        id: 1,
        title: 'title1',
        overview: 'overview1',
        vote_average: 1,
        vote_count: 1,
        poster_path: 'poster_path1',
      },
      {
        id: 2,
        title: 'title2',
        overview: 'overview2',
        vote_average: 2,
        vote_count: 2,
        poster_path: 'poster_path2',
      },
    ],
  };

  beforeEach(() => {
    fetchMock.mockOnceIf(
      'https://api.themoviedb.org/3/trending/movie/day?api_key=babcada8d42a5fd4857231c42240debd',
      () =>
        Promise.resolve({
          status: 200,
          body: JSON.stringify(data),
        }),
    );
  });

  it('renders hook', async () => {
    const {result} = renderHook(() => useGetMoviesQuery({}), {
      wrapper,
    });

    expect(result.current).toMatchObject({
      status: 'pending',
      endpointName,
      isLoading: true,
      isSuccess: false,
      isError: false,
      isFetching: true,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(fetchMock).toBeCalledTimes(1);
    expect(result.current).toMatchObject({
      status: 'fulfilled',
      endpointName,
      data,
      isLoading: false,
      isSuccess: true,
      isError: false,
      currentData: data,
      isFetching: false,
    });
  });
});
