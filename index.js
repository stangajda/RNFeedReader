import {Injection} from './src/DIContainer';
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

import {store} from './src/Store';
import {Provider} from 'react-redux';
import {MoviesProvider} from './src/MoviesProvider';

//import {useGetMoviesQuery} from './src/apiSlice';

export const ReduxApp = () => {
  const injection = Injection.getInstance();
  injection.initialRegister();
  return (
    <Provider store={store}>
      <MoviesProvider container={injection}>
        <App />
      </MoviesProvider>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => ReduxApp);
