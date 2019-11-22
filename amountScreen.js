/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Picker,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components';
import MultiSwitch from './MultiSwitch';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import BluetoothSerial from 'react-native-bluetooth-serial';
import temperatureScreen from './temperatureScreen';

export const CustomButton = (props) => {

  const { style = {}, onPress } = props;
  return (
      <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style]}>
        {/* <StartImage source={require('../br3w/assets/images/coffeeArt.png')} /> */}
      </TouchableOpacity>
  );
};

class amountScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            temperature: 92,
            amount: 8,
            roast: true,
        }
    }
  render() {
    const { navigation } = this.props;
    const {navigate} = navigation;
    return (
    <>
      <StatusBar barStyle="dark-content" />
        {/*<BackView
          style={style.loadingScreen}>

        </BackView>*/}
        <BackView
          style={styles.container}>
          <View style={styles.header} >
            <HeaderText> BR3W </HeaderText>
          </View>
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <CustomButton
            title="Done"
            onPress={() => {
                navigate('Display', {temperature: this.state.temperature, amount: this.state.amount})}}
            >
          </CustomButton>
        </BackView>
    </>
  )}
};

const BackView = styled(View)`
  backgroundColor: #fffff4;
  flex: 1;
  align-items: center;
`

const DefaultText = styled(Text)`
  color: #562f29;
  font-size: 36;
  font-family: Futura;
  margin: 20px 0px;
  align-self: center;
`
const StartImage = styled(Image)`
   width: 75px;
   height: 75px;
   align-self: center;
`
const StartButton = styled(CustomButton)`
    display: flex;
    height: 75px;
    width: 75px;
    border-radius: 25px;
    margin-top: 15px;
    align-self: center;
    margin-right: 15px;
    opacity: 1;
`

const HeaderText = styled(DefaultText)`
    backgroundColor: #fffff4;
    font-size: 96;
    color: #bc846b;
    position: relative;
    margin-top: 95px;
`

const styles = StyleSheet.create({
  engine: {
    position: 'absolute',
    right: 0,
  },

  loadingScreen: {
    flex: 1,
    backgroundColor: "#fffff4",
  },

  header: {
    backgroundColor: "#fffff4",
    fontSize: 96,
    fontFamily: "BREVE2",
    margin: 20,
    color: "#bc846b",
    position: 'relative',
  },

  button: {
    display: 'flex',
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
  },

  sectionTitle: {
    //fontFamily: "BREVE2",
    fontFamily: 'Futura',
    //fontSize: 36,
    fontSize: 24,
  }
});

export default amountScreen;
