import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SettingsPage from './settingsPage';
import Display from './display';

const MainNavigator = createStackNavigator({
  Settings: {screen: SettingsPage},
  Display: {screen: Display},
});

const App = createAppContainer(MainNavigator);

export default App;