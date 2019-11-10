import React, { useState, useEffect, Fragment } from 'react';
import {
  Component,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Picker,
  Button,
  Image,
  TouchableOpacity,
  TimerMixin,
} from 'react-native';
import styled from 'styled-components';
import SplashScreen from 'react-native-splash-screen';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export default class Loading extends React.Component {
  constructor(props) {
      super(props);
  }

  /*useEffect(() => {
    SplashScreen.hide();
  });*/

  render() {
    const { navigation } = this.props;
    const {navigate} = navigation;
    return(
      <Fragment>
      <StatusBar barStyle="dark-content" />
      {/*<SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView} >
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footes}> Engine: Hermes </Text>
            </View>
          )}*/}
          <BackView>
            <LoadText> B R 3 W </LoadText>
          </BackView>
        {/*</ScrollView>
      </SafeAreaView>*/}
      </Fragment>
    )}
    componentDidMount(){
      setTimeout(() => {
        this.props.navigation.navigate('Settings', {})
      }, 1500);
    }

};

const BackView = styled(View)`
  backgroundColor: #fffff4;
  flex: 1;
  align-items: center;
  justify-content: center;
`
const LoadText = styled(Text)`
  color: #bc846b;
  font-size: 96;
  font-family: BREVE2;
  align-items: center;

`

const styles = StyleSheet.create({
  defaultText:{
    backgroundColor: Colors.black,
    fontSize: 96,
  }
});
