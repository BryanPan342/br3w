import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SettingsPage from './settingsPage';
import Display from './display';
import BluetoothConnect from './BluetoothConnect';

const MainNavigator = createStackNavigator({
  Loading: {screen: BluetoothConnect},
  Display: {screen: Display},
  Settings: {screen: SettingsPage}
});

const App = createAppContainer(MainNavigator);

export default App;