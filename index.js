import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

import {store} from './src/Store';
import {Provider} from 'react-redux';
import {MoviesProvider} from './src/MoviesProvider';
export const ReduxApp = () => (
  <Provider store={store}>
    <MoviesProvider>
      <App />
    </MoviesProvider>
  </Provider>
);

AppRegistry.registerComponent(appName, () => ReduxApp);
