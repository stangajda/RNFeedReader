import React, {ReactNode} from 'react';
import {it} from '@jest/globals';
import renderer from 'react-test-renderer';
import App from '@src/App';
import {Provider} from 'react-redux';
import {store} from '@src/Store';
import {useGetMoviesQuery} from '@src/ApiSlice';
import {Movies} from '@src/Model';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';
import {SerializedError} from '@reduxjs/toolkit';

function wrapper({children}: {children: ReactNode}) {
  return <Provider store={store}>{children}</Provider>;
}

interface MoviesQueryResult {
  data?: Movies;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
}

jest.mock('@src/apiSlice', () => {
  const originalModule = jest.requireActual('@src/apiSlice');
  return {
    __esModule: true,
    ...originalModule,
    useGetMoviesQuery: jest.fn<
      ReturnType<typeof useGetMoviesQuery>,
      Parameters<typeof useGetMoviesQuery>
    >(),
  };
});

const mockUseGetMoviesQuery = useGetMoviesQuery as jest.Mock<MoviesQueryResult>;

describe('check movies list view to match recorded snapshot', () => {
  describe('when movies list is loaded', () => {
    beforeAll(() => {
      const dataResult: Movies = require('./StubMovieListResponseResult.json');
      mockUseGetMoviesQuery.mockReturnValueOnce({
        data: dataResult,
        isLoading: false,
        isSuccess: true,
        isError: false,
        error: undefined,
      });
    });
    it('it should match movie list loaded image json', () => {
      const tree = renderer.create(wrapper({children: <App />})).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('when movies list is loading', () => {
    beforeAll(() => {
      mockUseGetMoviesQuery.mockReturnValueOnce({
        isLoading: true,
        isSuccess: false,
        isError: false,
        error: undefined,
      });
    });
    it('it should match movie list loading image json', () => {
      const tree = renderer.create(wrapper({children: <App />})).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('when movies list is error', () => {
    beforeAll(() => {
      mockUseGetMoviesQuery.mockReturnValueOnce({
        isLoading: false,
        isSuccess: false,
        isError: true,
        error: new Error('stub error message'),
      });
    });
    it('it should match movie list error image json', () => {
      const tree = renderer.create(wrapper({children: <App />})).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('when movies list is empty', () => {
    beforeAll(() => {
      mockUseGetMoviesQuery.mockReturnValueOnce({
        isLoading: false,
        isSuccess: true,
        isError: false,
        error: undefined,
      });
    });
    it('it should match movie list empty image json', () => {
      const tree = renderer.create(wrapper({children: <App />})).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('when loading success and error at the same time return false', () => {
    beforeAll(() => {
      mockUseGetMoviesQuery.mockReturnValueOnce({
        isLoading: false,
        isSuccess: false,
        isError: false,
        error: undefined,
      });
    });
    it('it should match movie list empty image json', () => {
      const tree = renderer.create(wrapper({children: <App />})).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
