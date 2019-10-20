/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import SettingsPage from './settingsPage';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => SettingsPage);
// AppRegistry.registerComponent(appName, () => App);
