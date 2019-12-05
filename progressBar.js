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
      // needs finetuning, but should be similar to below - combine with handleChange?
      // if - read w for dispensing coffee, change state variable status
      // if - reading numbers, change progress/water_temp_ratio
      // if - receive letter for dispense coffee, change state variable status
      // if - don't see anything, but current state = dispense coffee and not 100 yet, progress++
      // if - receive letter for done - change state variable
      // if done - wait for 1 second so "done" message shows
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

//   handleChange = () => {
//     console.log("handleChange")
//     const { status, progress } = this.state;
//     console.log(progress);
//     if (status == "heat" && progress >= .5) {
//         console.log("changing to dispense water");
//         this.setState({
//             status: "dispense water"
//         })
//     }
//     else if (status == "dispense water" && progress >= .75) {
//         console.log("changing to dispense coffee");
//         this.setState({
//             status: "dispense coffee"
//         })
//     } else if (status == "dispense coffee" && progress >= 1) {
//         console.log("done!");
//         this.props.navigation.navigate('Display', { temperature: this.state.temperature, amount: this.state.amount, roast: this.state.roast })
//     } 
//   }

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
        <StatusBar barStyle="dark-content" />
        <View>
          <Image source={require('./assets/coffee.gif')} />
        </View>
        <BackView style={styles.container}>
          <View style={styles.bar}>
            {/* {this.state.water_temp_ratio = this.state.arduinoTemp / this.state.temp}; */}
            <Progress.Bar 
                progress={progress} 
                //onChange={this.handleChange()} 
                width={300} 
                height={10} 
                borderWidth={2} 
            />
            <Text>{progressText}</Text>
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
