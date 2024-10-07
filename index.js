/**
 * @format
 */

import { AppRegistry } from 'react-native';
// import App from './App';
// import Main from './src/screen/Home'
import mainApp from './src';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => mainApp);
