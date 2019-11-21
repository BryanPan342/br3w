import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SettingsPage from './settingsPage';
import Display from './display_screen/display';
import Loading from './loadingScreen'
import progressBar from './progressBar'

const MainNavigator = createStackNavigator({
  Loading: {screen: Loading},
  Settings: {screen: SettingsPage},
  Display: {screen: Display},
  progressBar: {screen: progressBar},
},
{
  headerMode: 'none',
}

);
const App = createAppContainer(MainNavigator);

export default App;
