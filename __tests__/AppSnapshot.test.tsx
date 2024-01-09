import React, {ReactNode} from 'react';
import {it} from '@jest/globals';
import renderer from 'react-test-renderer';
import App from '@src/App';
import {Provider} from 'react-redux';
import {store} from '@src/store';

function wrapper({children}: {children: ReactNode}) {
  return <Provider store={store}>{children}</Provider>;
}

jest.mock('@src/apiSlice', () => {
  const dataResult = require('./StubMovieListResponseResult.json');
  return {
    apiSlice: {
      reducerPath: 'api',
      reducer: () => ({}),
      middleware: () => (next: any) => (action: any) => next(action),
    },
    useGetMoviesQuery: jest.fn().mockReturnValueOnce({
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
