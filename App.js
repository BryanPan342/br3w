import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Display from './display_screen/display';
import Loading from './loadingScreen';
import progressBar from './progressBar';
import temperatureScreen from './temperatureScreen';
import amountScreen from './amountScreen';

const MainNavigator = createStackNavigator({
  Loading: {screen: Loading},
  Display: {screen: Display},
  progressBar: {screen: progressBar},
  temperatureScreen: {screen: temperatureScreen},
  amountScreen: {screen: amountScreen},
},
{
  headerMode: 'none',
}

);
const App = createAppContainer(MainNavigator);

export default App;
