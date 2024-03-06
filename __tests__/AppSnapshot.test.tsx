import React from 'react';
import {it} from '@jest/globals';
import renderer from 'react-test-renderer';
import {ReduxApp} from 'index';
import {DIInjectionProvider} from '@src/DependencyInjection/DIContext';
import {Injection, useDependencies} from '@src/DependencyInjection/DIContainer';
import {TYPES} from '@src/types';

describe('check movies list view to match recorded snapshot', () => {
  describe('when movies list is loaded', () => {
    beforeAll(() => {
      const dataResult = require('./StubMovieListResponseResult.json');
      const mockData = {
        data: dataResult,
        isLoading: false,
        isSuccess: true,
        isError: false,
      };
      Injection.getInstance().register(
        TYPES.IMoviesQueryResult,
        () => mockData,
      );
    });

    it('should match movie list loaded image json', () => {
      const deps = useDependencies();
      const tree = renderer
        .create(
          <DIInjectionProvider {...deps}>
            <ReduxApp />
          </DIInjectionProvider>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('when movies list is loading', () => {
    beforeAll(() => {
      const mockData = {
        isLoading: true,
        isSuccess: false,
        isError: false,
      };
      Injection.getInstance().register(
        TYPES.IMoviesQueryResult,
        () => mockData,
      );
    });
    it('it should match movie list loading image json', () => {
      const deps = useDependencies();
      const tree = renderer
        .create(
          <DIInjectionProvider {...deps}>
            <ReduxApp />
          </DIInjectionProvider>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('when movies list is error', () => {
    beforeAll(() => {
      const mockData = {
        isLoading: false,
        isSuccess: false,
        isError: true,
        error: new Error('stub error message'),
      };
      Injection.getInstance().register(
        TYPES.IMoviesQueryResult,
        () => mockData,
      );
    });
    it('it should match movie list loading image json', () => {
      const deps = useDependencies();
      const tree = renderer
        .create(
          <DIInjectionProvider {...deps}>
            <ReduxApp />
          </DIInjectionProvider>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('when movies list is empty', () => {
    beforeAll(() => {
      const mockData = {
        isLoading: false,
        isSuccess: true,
        isError: false,
      };
      Injection.getInstance().register(
        TYPES.IMoviesQueryResult,
        () => mockData,
      );
    });
    it('it should match movie list empty image json', () => {
      const deps = useDependencies();
      const tree = renderer
        .create(
          <DIInjectionProvider {...deps}>
            <ReduxApp />
          </DIInjectionProvider>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('when loading success and error at the same time return false', () => {
    beforeAll(() => {
      const mockData = {
        isLoading: false,
        isSuccess: false,
        isError: false,
      };
      Injection.getInstance().register(
        TYPES.IMoviesQueryResult,
        () => mockData,
      );
    });
    it('it should match movie list empty image json', () => {
      const deps = useDependencies();
      const tree = renderer
        .create(
          <DIInjectionProvider {...deps}>
            <ReduxApp />
          </DIInjectionProvider>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
