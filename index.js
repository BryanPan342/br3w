/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import Display from './display_screen/display';
import Dummy from './display_screen/dummy';
import AppNavigator from './display_screen/navigation';
import {name as appName} from './app.json';

 AppRegistry.registerComponent(appName, () => AppNavigator);
//AppRegistry.registerComponent(appName, () => Navigate);
