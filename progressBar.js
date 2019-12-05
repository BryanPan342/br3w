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
      water_temp_ratio: (32 / this.props.navigation.getParam("temperature", 92)),
      status: "dispense coffee", // heat, dispense water, dispense coffee
      progress: 0
    }
  }

  componentDidMount() {
    if (this.state) {
        setInterval(() => {
        BluetoothSerial.readFromDevice()
            .then((res) => {
                if (!isNaN(parseFloat(res)) && this.state.status == "heat water") {
                    // reading numbers
                    this.setState({
                        progress: (parseFloat(res) / this.state.temperature) * 0.5 + .33
                    })
                }
                else if (res[0] == 'c') {
                    // read letter to dispense coffee
                    this.setState({
                        status: "dispense coffee"
                    })
                } else if (res[0] == 'w') {
                    // read letter to dispense water
                    this.setState({
                        status: "dispense water"
                    })
                } else if (res[0] == 'h') {
                    // read letter to heat water
                    this.setState({
                        status: "heat water"
                    })
                } 
                else if (res[0] == 'd') {
                    // done - change state, then navigate away
                    this.setState({
                        status: "done"
                    });
                    setTimeout(() => {
                        this.props.navigation.navigate('Display', { temperature: this.state.temperature, amount: this.state.amount, roast: this.state.roast })
                    }, 1000);
                } else if (this.state.status == "dispense coffee") {
                    // don't see anything, but current state = dispense coffee and progress is not 1/4 yet
                    // probably change .01 depending on how long the whole process takes / 1000 ms
                    this.setState({
                        progress: this.state.progress + .02
                    })
                } else if (this.state.status == "dispense water") {
                    // don't see anything, but current state = dispense water and progress is not 100 yet
                    // probably change .01 depending on how long the whole process takes / 1000 ms
                    this.setState({
                        progress: this.state.progress + .01
                    })
                } 
            })
        }, 1000);
    }
  }

  render() {
    const { navigation } = this.props;
    const { navigate } = navigation;
    const { progress, status } = this.state;
    let progressText = "Dispensing Coffee";
    if (status == "dispense coffee") {
        progressText = "Dispensing Coffee";
    } else if (status == "dispense water") {
        progressText = "Dispensing Water";
    } else if (status == "heat water") {
        progressText = "Heating Water";
    } else if (status == "done") {
        progressText = "Done!"
    }
    return (
      <>
        {/* <StatusBar barStyle="dark-content" /> */}
       

        <BackView style={styles.container}>
            <View style={styles.container}> 
                <HeaderText> BR3W </HeaderText>
                {/* <Image source={require('./assets/br3w.jpg')} /> */}
                <Image source={require('./assets/coffee_2.gif')} />
            </View>
            <View style={styles.bar}>
                <Progress.Bar 
                    progress={progress} 
                    width={300} 
                    height={10} 
                    borderWidth={2} 
                    color="#6d544a"
                />
                <DefaultText>{progressText}</DefaultText>
            </View>
            <TouchableOpacity
                title="Back to Display"
                style={styles.button}
                onPress={() => {
                    navigate('Display', {
                    temperature: this.state.temperature,
                    amount: this.state.amount,
                    roast: this.state.roast,
                    });
                }}
            >
            <Text style={styles.buttonText}>Back to Display</Text></TouchableOpacity>
        </BackView>
      </>
    );
  }
}

const BackView = styled(View)`
  backgroundColor: #D9D3BF;
  flex: 1;
  align-items: center;
`;

const DefaultText = styled(Text)`
  color: #6d544a;
  font-size: 18;
  font-family: futuraMdB;
  marginTop:  15;
  align-self: center;
`;

const HeaderText = styled(DefaultText)`
  backgroundColor: #D9D3BF;
  font-size: 108;
  color: #906F63;
  paddingTop: 30;
`;

const styles = StyleSheet.create({
  engine: {
    position: 'absolute',
    right: 0,
  },

  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  button: {
    marginTop: 80,
    marginBottom: 40,
    height: 50,
    width: 222,
    borderRadius: 25,
    backgroundColor: "#906F63",
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 18,
    fontFamily: "futuraMdB",
    color: "#F5F0DF"
  },

  bar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

});

export default progressBar;
