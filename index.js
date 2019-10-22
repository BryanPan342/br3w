/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import Display from './display_screen/display';
import Dummy from './display_screen/dummy';
import {name as appName} from './app.json';

 AppRegistry.registerComponent(appName, () => Display);
//AppRegistry.registerComponent(appName, () => Navigate);
