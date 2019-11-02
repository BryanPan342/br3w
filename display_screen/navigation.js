// import {createAppContainer} from 'react-navigation';
// import {createStackNavigator} from 'react-navigation-stack';

// const MainNavigator = createStackNavigator(
//     {
//     display: {screen: DisplayScreen},
//     dummy: {screen: DummyScreen},
//   }
//   );

//   const Navigate = createAppContainer(MainNavigator);

//   export default Navigate;

import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  }
});

export default createAppContainer(AppNavigator);
