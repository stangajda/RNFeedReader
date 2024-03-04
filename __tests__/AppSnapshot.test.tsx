import React from 'react';
import {it} from '@jest/globals';
import renderer from 'react-test-renderer';
import {ReduxApp} from 'index';
import {IMoviesQueryResult} from '@src/interfaces';
import {DIProvider} from '@src/DIContext';

describe('check movies list view to match recorded snapshot', () => {
  let mockData: IMoviesQueryResult;
  describe('when movies list is loaded', () => {
    beforeAll(() => {
      const dataResult = require('./StubMovieListResponseResult.json');
      mockData = {
        data: dataResult,
        isLoading: false,
        isSuccess: true,
        isError: false,
      };
    });

    it('should match movie list loaded image json', () => {
      const tree = renderer
        .create(
          <DIProvider moviesQueryResult={() => mockData}>
            <ReduxApp />
          </DIProvider>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('when movies list is loading', () => {
    beforeAll(() => {
      mockData = {
        isLoading: true,
        isSuccess: false,
        isError: false,
      };
    });
    it('it should match movie list loading image json', () => {
      const tree = renderer
        .create(
          <DIProvider moviesQueryResult={() => mockData}>
            <ReduxApp />
          </DIProvider>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('when movies list is error', () => {
    beforeAll(() => {
      mockData = {
        isLoading: false,
        isSuccess: false,
        isError: true,
        error: new Error('stub error message'),
      };
    });
    it('it should match movie list loading image json', () => {
      const tree = renderer
        .create(
          <DIProvider moviesQueryResult={() => mockData}>
            <ReduxApp />
          </DIProvider>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('when movies list is empty', () => {
    beforeAll(() => {
      mockData = {
        isLoading: false,
        isSuccess: true,
        isError: false,
      };
    });
    it('it should match movie list empty image json', () => {
      const tree = renderer
        .create(
          <DIProvider moviesQueryResult={() => mockData}>
            <ReduxApp />
          </DIProvider>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('when loading success and error at the same time return false', () => {
    beforeAll(() => {
      mockData = {
        isLoading: false,
        isSuccess: false,
        isError: false,
      };
    });
    it('it should match movie list empty image json', () => {
      const tree = renderer
        .create(
          <DIProvider moviesQueryResult={() => mockData}>
            <ReduxApp />
          </DIProvider>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
