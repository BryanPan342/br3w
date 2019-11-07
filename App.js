import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SettingsPage from './settingsPage';
import Display from './display_screen/display';

const MainNavigator = createStackNavigator({
  Settings: {screen: SettingsPage},
  Display: {screen: Display},
},
{
  headerMode: 'none',
}

);

const App = createAppContainer(MainNavigator);

export default App;
