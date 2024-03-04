import React from 'react';
import {it} from '@jest/globals';
import renderer from 'react-test-renderer';
import {ReduxApp} from 'index';
import {useGetMoviesQuery} from '@src/ApiSlice';
import {IMoviesQueryResult} from '@src/interfaces';
import {DIProvider} from '@src/DIContext';

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

const mockUseGetMoviesQuery =
  useGetMoviesQuery as jest.Mock<IMoviesQueryResult>;

describe('check movies list view to match recorded snapshot', () => {
  describe('when movies list is loaded', () => {
    it('it should match movie list loaded image json', () => {
      const dataResult = require('./StubMovieListResponseResult.json');
      const mockData: IMoviesQueryResult = {
        data: dataResult,
        isLoading: false,
        isSuccess: true,
        isError: false,
      };

      const tree = renderer
        .create(
          <DIProvider moviesQueryResult={mockData}>
            <ReduxApp />
          </DIProvider>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('when movies list is loading', () => {
    beforeAll(() => {
      mockUseGetMoviesQuery.mockReturnValueOnce({
        isLoading: true,
        isSuccess: false,
        isError: false,
      });
    });
    it('it should match movie list loading image json', () => {
      const tree = renderer.create(<ReduxApp />).toJSON();
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
      const tree = renderer.create(<ReduxApp />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('when movies list is empty', () => {
    beforeAll(() => {
      mockUseGetMoviesQuery.mockReturnValueOnce({
        isLoading: false,
        isSuccess: true,
        isError: false,
      });
    });
    it('it should match movie list empty image json', () => {
      const tree = renderer.create(<ReduxApp />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('when loading success and error at the same time return false', () => {
    beforeAll(() => {
      mockUseGetMoviesQuery.mockReturnValueOnce({
        isLoading: false,
        isSuccess: false,
        isError: false,
      });
    });
    it('it should match movie list empty image json', () => {
      const tree = renderer.create(<ReduxApp />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
