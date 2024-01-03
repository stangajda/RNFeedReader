import React, {ReactNode} from 'react';
import {it} from '@jest/globals';
import renderer from 'react-test-renderer';
import App from '../src/App';
import {Provider} from 'react-redux';
import {store} from '../src/store';

function wrapper({children}: {children: ReactNode}) {
  return <Provider store={store}>{children}</Provider>;
}

describe('App snapshot test', () => {
  it('renders correctly', () => {
    const tree = renderer.create(wrapper({children: <App />})).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
