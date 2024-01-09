import React, {ReactNode} from 'react';
import {it} from '@jest/globals';
import renderer from 'react-test-renderer';
import App from '@src/App';
import {Provider} from 'react-redux';
import {store} from '@src/store';
import {useGetMoviesQuery} from '@src/apiSlice';

function wrapper({children}: {children: ReactNode}) {
  return <Provider store={store}>{children}</Provider>;
}

jest.mock('@src/apiSlice', () => {
  const originalModule = jest.requireActual('@src/apiSlice');
  return {
    __esModule: true,
    ...originalModule,
    useGetMoviesQuery: jest.fn(),
  };
});

describe('check movies list view to match recorded snapshot', () => {
  describe('when movies list is loaded', () => {
    beforeAll(() => {
      const dataResult = require('./StubMovieListResponseResult.json');
      (useGetMoviesQuery as jest.Mock).mockReturnValueOnce({
        data: dataResult,
        isLoading: false,
        isSuccess: true,
        isError: false,
        error: null,
      });
    });
    it('it should match movie list loaded image json', () => {
      const tree = renderer.create(wrapper({children: <App />})).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('when movies list is loading', () => {
    beforeAll(() => {
      (useGetMoviesQuery as jest.Mock).mockReturnValueOnce({
        isLoading: true,
        isSuccess: false,
        isError: false,
        error: null,
      });
    });
    it('it should match movie list loading image json', () => {
      const tree = renderer.create(wrapper({children: <App />})).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('when movies list is error', () => {
    beforeAll(() => {
      (useGetMoviesQuery as jest.Mock).mockReturnValueOnce({
        isLoading: false,
        isSuccess: false,
        isError: true,
        error: 'stub error message',
      });
    });
    it('it should match movie list error image json', () => {
      const tree = renderer.create(wrapper({children: <App />})).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('when movies list is empty', () => {
    beforeAll(() => {
      (useGetMoviesQuery as jest.Mock).mockReturnValueOnce({
        data: [],
        isLoading: false,
        isSuccess: true,
        isError: false,
        error: null,
      });
    });
    it('it should match movie list empty image json', () => {
      const tree = renderer.create(wrapper({children: <App />})).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('when loading success and error at the same time return false', () => {
    beforeAll(() => {
      (useGetMoviesQuery as jest.Mock).mockReturnValueOnce({
        data: null,
        isLoading: false,
        isSuccess: false,
        isError: false,
        error: null,
      });
    });
    it('it should match movie list empty image json', () => {
      const tree = renderer.create(wrapper({children: <App />})).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
