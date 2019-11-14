import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SettingsPage from './settingsPage';
import Display from './display_screen/display';
import Loading from './loadingScreen'

const MainNavigator = createStackNavigator({
  Loading: {screen: Loading},
  Settings: {screen: SettingsPage},
  Display: {screen: Display},
},
{
  headerMode: 'none',
}

);
const App = createAppContainer(MainNavigator);

export default App;
