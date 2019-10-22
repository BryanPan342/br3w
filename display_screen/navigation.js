import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const MainNavigator = createStackNavigator(
    {
    display: {screen: DisplayScreen},
    dummy: {screen: DummyScreen},
  }
  );
  
  const Navigate = createAppContainer(MainNavigator);
  
  export default Navigate;