import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/UI/App';
import {name as appName} from './app.json';

import {store} from './src/Redux/store';
import {Provider} from 'react-redux';
export const ReduxApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => ReduxApp);
