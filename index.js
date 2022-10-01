/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/navigations/SplashNavigation';
import {Provider as PaperProvider} from 'react-native-paper';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {theme} from './src/styles/theme';

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </PaperProvider>
  );
}
AppRegistry.registerComponent(appName, () => Main);
