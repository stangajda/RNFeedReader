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
  return {
    apiSlice: {
      reducerPath: 'api',
      reducer: () => ({}),
      middleware: () => (next: any) => (action: any) => next(action),
    },
    useGetMoviesQuery: jest.fn(),
  };
});

describe('App snapshot test', () => {
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
  it('renders correctly', () => {
    const tree = renderer.create(wrapper({children: <App />})).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
