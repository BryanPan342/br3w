/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  AsyncStorage,
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
} from 'react-native';
import styled from 'styled-components';
import BluetoothSerial from 'react-native-bluetooth-serial';

export const CustomButton = (props) => {

  const { style = {}, onPress } = props;
  return (
      <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style]}>
        <StartImage source={require('../br3w/assets/images/coffeeArt.png')} />
      </TouchableOpacity>
  );
};

class SettingsPage extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          temperature: this.props.navigation.getParam("temperature", 92),
          amount: this.props.navigation.getParam("amount", 8),
      }
  }
  _storeData = async () => {
    try {
      await AsyncStorage.setItem('temperature', this.state.temperature);
    } catch (error) {
      console.error("Failed to persist temperature");
    }
    try {
      await AsyncStorage.setItem('amount', this.state.amount);
    } catch (error) {
      console.error("Failed to persist amount");
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
            <HeaderText> B R 3 W </HeaderText>
          </View>
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
              {/*<Text style={styles.sectionTitle}>settings page HOLY SHIT WORKS!!!</Text>*/}
              <Text style={styles.sectionTitle}>Set Temperature</Text>
              <Picker
                selectedValue={this.state.temperature}
                onValueChange={(itemValue) =>
                    this.setState({temperature: itemValue})}>
                <Picker.Item label="92 C" value="92" />
                <Picker.Item label="93 C" value="93" />
                <Picker.Item label="94 C" value="94" />
                <Picker.Item label="95 C" value="95" />
                <Picker.Item label="96 C" value="96" />
              </Picker>

              <Text style={styles.sectionTitle}>Set Amount</Text>
              <Picker
                selectedValue={this.state.amount}
                onValueChange={(itemValue) =>
                    this.setState({amount: itemValue})}>
                <Picker.Item label="8 oz" value="8" />
                <Picker.Item label="10 oz" value="10" />
                <Picker.Item label="12 oz" value="12" />
              </Picker>
              <StartButton
                title=""
                onPress={() => {
                    BluetoothSerial.write("T")
                    .then(() => {
                        this._storeData();
                        console.log("Navigate to display");
                    })
                    navigate('Display', {temperature: this.state.temperature, amount: this.state.amount})}}
                >
              </StartButton>
          </View>
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
  font-family: BREVE2;
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
    fontFamily: "BREVE2",
    fontSize: 36,
  }

  // header: {
  //   backgroundColor: Colors.aliceblue,
  //
  // },
  // headerText: {
  //   // color: "#bc846b",
  //   fontSize: 96,
  //   fontFamily: "BREVE2",
  //   margin: 20, //0px,
  //   alignSelf: 'center',
  //   //fontSize: 30,
  //   // fontWeight: '800',
  //   // color: Colors.black,
  //   color: "#bc846b",
  //   textAlign: 'center',
  //   position: 'relative',
  // },
  // scrollView: {
  //   // backgroundColor: "#fffff4",//Colors.lighter,
  //   // height: "100%",
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },

  // body: {
  //   // backgroundColor: "#fffff4",
  //   flex: 1,
  //   flexDirection: "column",
  //   alignItems: "center",
  //   marginTop: 102,
  //   paddingHorizontal: 24,
  //   color: Colors.red,
  // },
  // bodyText: {
  //   display: "flex",
  //   marginBottom: 20,
  // },
  // // sectionContainer: {
  // //   marginTop: 102,
  // //   paddingHorizontal: 24,
  // //   color: Colors.red,
  // //   // alignItems: "center",
  // // },
  // sectionTitle: {
  //   fontSize: 36,
  //   fontWeight: '600',
  //   color: "#562f29",
  //   fontFamily: "BREVE2",
  // },
  // sectionDescription: {
  //   marginTop: 8,
  //   fontSize: 18,
  //   fontWeight: '400',
  //   color: Colors.dark,
  // },
  // highlight: {
  //   fontWeight: '700',
  // },
  // footer: {
  //   color: Colors.dark,
  //   fontSize: 12,
  //   fontWeight: '600',
  //   padding: 4,
  //   paddingRight: 12,
  //   textAlign: 'right',
  // },
  // container: {
  //   display: "flex",
  //   flex: 1,
  //   fontFamily: "breve2",
  // },
});

export default SettingsPage;
