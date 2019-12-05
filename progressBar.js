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
import * as Progress from 'react-native-progress';

class progressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: this.props.navigation.getParam('temperature', 92),
      is_celsius: true,
      amount: this.props.navigation.getParam('amount', 8),
      roast: this.props.navigation.getParam('roast', true),
      arduinoTemp: 32,
      ratio: 32 / this.props.navigation.getParam('temperature', 92),
    };
  }

  render() {
    const {navigation} = this.props;
    const {navigate} = navigation;
    BluetoothSerial.readFromDevice().then(res => {
      console.log('read from arduino' + res);
    });
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <View>
          <Image source={require('./assets/coffee.gif')} />
        </View>
        <BackView style={styles.container}>
          <View style={styles.bar}>
            {/* {this.state.ratio = this.state.arduinoTemp / this.state.temp}; */}
            <Progress.Bar
              progress={this.state.ratio}
              width={300}
              height={10}
              borderWidth={2}
            />
          </View>
          <View style={styles.bottom}>
            <TouchableOpacity
              title="Back to Display"
              style={styles.button}
              onPress={() => {
                navigate('Display', {
                  temperature: this.state.temperature,
                  amount: this.state.amount,
                  roast: this.state.roast,
                });
              }}>
                <DefaultText>Back to Display</DefaultText>
              </TouchableOpacity>
            </View>
        </BackView>
      </>
    );
  }
}

const BackView = styled(View)`
  backgroundColor: #fffff4;
  flex: 1;
  align-items: center;
`;

const DefaultText = styled(Text)`
  color: #562f29;
  font-size: 24;
  font-family: Futura;
  margin: 10px 0px;
  align-self: center;
`;

const HeaderText = styled(DefaultText)`
  backgroundColor: #fffff4;
  font-size: 96;
  color: #bc846b;
  position: relative;
  margin-top: 95px;
`;

const styles = StyleSheet.create({
  engine: {
    position: 'absolute',
    right: 0,
  },

  loadingScreen: {
    flex: 1,
    backgroundColor: '#fffff4',
  },

  header: {
    backgroundColor: '#fffff4',
    fontSize: 96,
    fontFamily: 'BREVE2',
    margin: 20,
    color: '#bc846b',
    position: 'relative',
  },

  bar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  sectionTitle: {
    //fontFamily: "BREVE2",
    fontFamily: 'Futura',
    //fontSize: 36,
    fontSize: 24,
  },
  button: {
    //marginTop: 140,
    height: 50,
    width: 222,
    borderRadius: 25,
    backgroundColor: "#f6e8e3",
    position: 'relative',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
});

export default progressBar;
