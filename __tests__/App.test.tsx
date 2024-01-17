import 'react-native';
import React, {ReactNode} from 'react';
import {it} from '@jest/globals';
import {mockResponse} from './helpers/server';
import {apiSlice, useGetMoviesQuery} from '@src/ApiSlice';
import {renderHook, waitFor} from '@testing-library/react-native';

import {store} from '@src/Store';
import {Provider} from 'react-redux';
import {setupMockServer} from './helpers/server';

//import movies from './StubMovieListResponseResult.json';
import {Movies} from '@src/Model';
import {IMoviesResponse} from '@src/interfaces';

function wrapper({children}: {children: ReactNode}) {
  return <Provider store={store}>{children}</Provider>;
}

describe('check movie list service', () => {
  setupMockServer();
  const data: Movies = require('./StubMovieListResponseResult.json');

  beforeEach(() => {
    store.dispatch(apiSlice.util.resetApiState());
  });

  describe('when successful json data', () => {
    const endpointName = 'getMovies';
    const mockedMoviesResponse: IMoviesResponse = {
      result: data,
      status: 200,
    };

    beforeAll(() => {
      mockResponse(mockedMoviesResponse);
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
    const error = 'stub error message';

    const mockedMoviesResponse: IMoviesResponse = {
      result: {error},
      status: 404,
    };

    beforeAll(() => {
      mockResponse(mockedMoviesResponse);
    });

    it('it should get failed response', async () => {
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

      expect(result.current.error).toEqual({
        data: {error},
        status: 404,
      });
    });
  });
});
