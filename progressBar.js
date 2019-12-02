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
      temperature: this.props.navigation.getParam("temperature", 92),
      is_celsius: true,
      amount: this.props.navigation.getParam("amount", 8),
      roast: this.props.navigation.getParam("roast", true),
      arduinoTemp: 32,
      water_temp_ratio: (32 / this.props.navigation.getParam("temperature", 92)),
      status: "heat", // heat, dispense water, dispense coffee
      progress: (32 / this.props.navigation.getParam("temperature", 92)) * 0.5
    }
  }

  componentDidMount() {
    //   // needs finetuning, but should be similar to below - combine with handleChange?
    //   // if - reading numbers, change progress/water_temp_ratio
    //   // if - receive the letter for dispensing water, change state variable status
    //   // if - don't see anything, but current state = dispense water and not 75 yet, progress++
    //   // if - receive letter for dispense coffee, change state variable status
    //   // if - don't see anything, but current state = dispense coffee and not 100 yet, progress++
    //   // if - receive letter for done - change state variable
    //   // if done - wait for 1 second so "done" message shows
    // setInterval(() => {
    //     BluetoothSerial.readFromDevice()
    //         .then((res) => {
    //             if (this.state.status == "heat") {
    //                 // if reading numbers?
    //                 this.setState({
    //                     // not sure about this math
    //                     water_temp_ratio: res / this.state.temperature
    //                 })
    //             } else if (res == dispense water) {
    //                 // send a single letter that represents dispensing water
    //                 // change state variable status
    //                 this.setState({
    //                     progress: progress + 1
    //                 })
    //             } else if (res == dispense coffee) {
    //                 // send a single letter that represents dispensing coffee
    //                 // change state variable status
    //                 this.setState({
    //                     progress: progress + 1
    //                 })
    //             }
    //     })
    // }, 1000);
    setInterval(() => {
        if (this.state.status == "heat") {
            console.log("fyre");
            this.setState({
                progress: this.state.progress + .1
            })
        } else {
            console.log("dispensing");
            this.setState({
                // adjust the 1 based on how long it takes to dispense
                progress: this.state.progress + .1
            })
        }
    }, 1000);
  }

  handleChange = () => {
    console.log("handleChange")
    const { status, progress } = this.state;
    console.log(progress);
    if (status == "heat" && progress >= .5) {
        console.log("changing to dispense water");
        this.setState({
            status: "dispense water"
        })
    }
    else if (status == "dispense water" && progress >= .75) {
        console.log("changing to dispense coffee");
        this.setState({
            status: "dispense coffee"
        })
    } else if (status == "dispense coffee" && progress >= 1) {
        console.log("done!");
        this.props.navigation.navigate('Display', { temperature: this.state.temperature, amount: this.state.amount, roast: this.state.roast })
    } 
  }

  render() {
    const { navigation } = this.props;
    const { navigate } = navigation;
    const { progress } = this.state;
    let progressText = "Heating Water";
    if (progress >= .5 && progress < .75) {
        progressText = "Dispensing Water";
    } else if (progress >= .75 && progress < 1) {
        progressText = "Dispensing Coffee";
    } else if (progress >= 1) {
        progressText = "Done!"
    }
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <BackView
          style={styles.container}>
          <View style={styles.bar}>
            {/* {this.state.water_temp_ratio = this.state.arduinoTemp / this.state.temp}; */}
            <Progress.Bar 
                progress={progress} 
                onChange={this.handleChange()} 
                width={300} 
                height={10} 
                borderWidth={2} 
            />
            <Text>{progressText}</Text>
          </View>
          <Button
            title="Back to Display"
            onPress={() => {
              navigate('Display', { temperature: this.state.temperature, amount: this.state.amount, roast: this.state.roast })
            }}
          ></Button>
        </BackView>
      </>
    )
  }
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
  }
});

export default progressBar;
