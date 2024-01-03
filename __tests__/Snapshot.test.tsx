import {it} from '@jest/globals';
import renderer from 'react-test-renderer';

import {Button} from 'react-native';

import React from 'react';

describe('App snapshot test', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Button title="hello" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
