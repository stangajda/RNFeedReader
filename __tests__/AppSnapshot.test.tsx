import React, {ReactNode} from 'react';
import {it} from '@jest/globals';
import renderer from 'react-test-renderer';
import App from '../src/App';
import {Provider} from 'react-redux';
import {store} from '../src/store';

function wrapper({children}: {children: ReactNode}) {
  return <Provider store={store}>{children}</Provider>;
}

jest.mock('../src/apiSlice', () => {
  const dataResult = require('../__tests__/StubMovieListResponseResult.json');
  const originalModule = jest.requireActual('../src/apiSlice');
  return {
    ...originalModule,
    apiSlice: {
      ...originalModule.apiSlice,
      reducerPath: 'api',
      reducer: jest.fn(() => ({})),
    },
    useGetMoviesQuery: jest.fn().mockReturnValue({
      data: dataResult,
      isLoading: false,
      isSuccess: true,
      isError: false,
      error: null,
    }),
  };
});

describe('App snapshot test', () => {
  it('renders correctly', () => {
    const tree = renderer.create(wrapper({children: <App />})).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
