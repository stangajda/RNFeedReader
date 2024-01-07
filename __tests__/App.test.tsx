import 'react-native';
import React, {ReactNode} from 'react';
import {it} from '@jest/globals';
import {http, HttpResponse} from 'msw';
import {setupServer} from 'msw/node';
import {apiSlice, useGetMoviesQuery} from '@src/apiSlice';
import {renderHook, waitFor} from '@testing-library/react-native';

import {store} from '@src/store';
import {Provider} from 'react-redux';

import data from './StubMovieListResponseResult.json';

function wrapper({children}: {children: ReactNode}) {
  return <Provider store={store}>{children}</Provider>;
}

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('check movie list service', () => {
  describe('when successful json data', () => {
    const endpointName = 'getMovies';

    beforeAll(() => {
      server.use(
        http.get('*/trending/movie/day', () => {
          return HttpResponse.json(data, {status: 200});
        }),
      );
    });

    it('it should get successful response match mapped object', async () => {
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

  describe('when failure error code', () => {
    const endpointName = 'getMovies';

    beforeAll(() => {
      server.use(
        http.get('*/trending/movie/day', () => {
          return HttpResponse.json({error: 'Not Authorized'}, {status: 404});
        }),
      );
    });

    it('it should get failed response', async () => {
      store.dispatch(apiSlice.util.resetApiState());
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

      await waitFor(() => expect(result.current.isError).toBe(true));
      expect(result.current).toMatchObject({
        status: 'rejected',
        endpointName,
        data: undefined,
        isLoading: false,
        isSuccess: false,
        isError: true,
        currentData: undefined,
        isFetching: false,
      });
    });
  });
});
