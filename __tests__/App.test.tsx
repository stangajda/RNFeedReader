import 'react-native';
import React, {ReactNode} from 'react';
import {it} from '@jest/globals';
import {http, HttpResponse} from 'msw';
import {setupServer} from 'msw/node';
import {useGetMoviesQuery} from '@src/apiSlice';
import {renderHook, waitFor} from '@testing-library/react-native';

import {store} from '@src/store';
import {Provider} from 'react-redux';

import data from './StubMovieListResponseResult.json';

function wrapper({children}: {children: ReactNode}) {
  return <Provider store={store}>{children}</Provider>;
}

describe('useGetMoviesQuery', () => {
  const endpointName = 'getMovies';
  const server = setupServer(
    http.get('*/trending/movie/day', ({}) => {
      return HttpResponse.json(data);
    }),
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

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
