import React, { useState, useEffect, Fragment } from 'react';
import {
  AsyncStorage,
  View,
  Text,
  StatusBar,
  ToastAndroid
} from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial'
import styled from 'styled-components';

export default class Loading extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
          isEnabled: false,
          connected: false,
          temperature: 92,
          amount: 8,
          roast: true
        }
    }
      // function to retrieve data from AsyncStorage
    _retrieveData = async () => {
      try {
        const p_temperature = await AsyncStorage.getItem('temperature');
          if (p_temperature !== null) {
            this.setState({temperature: parseFloat(p_temperature)})
          }
      } catch (error) {
        console.error("Failed to Retrieve Temperature")
      }      
      try {
        const p_amount = await AsyncStorage.getItem('amount');
          if (p_amount !== null) {
            this.setState({amount: parseFloat(p_amount)})
          }
      } catch (error) {
        console.error("Failed to Retrieve Amount")
      }
      try {
        const p_roast = await AsyncStorage.getItem('roast');
          if (p_roast !== null) {
            if(p_roast == 'true')
              this.setState({roast: true})
            else
              this.setState({roast: false})
          }
      } catch (error) {
        console.error("Failed to Retrieve Amount")
      }
    };  
    componentDidMount(){
      this._retrieveData();

      BluetoothSerial.enable()
          .then((res) => this.setState({ isEnabled: true }))
          .catch((err) => Toast.showShortBottom(err.message))
      console.log("connecting...")
      this.connect("98:D3:51:FD:D0:99")
      
      BluetoothSerial.write("T")
    }

    render() {
        if (this.state.connected) {
            setTimeout(() => {
                this.props.navigation.navigate('Display', {temperature: this.state.temperature, amount: this.state.amount, roast: this.state.roast})
            }, 1000);
        }
        else {
          setTimeout(() => {
            this.props.navigation.navigate('Display', {temperature: this.state.temperature, amount: this.state.amount, roast: this.state.roast})
        }, 5000);
        console.log("Not connected :)")
        }
        return(
        <Fragment>
        <StatusBar barStyle="dark-content" />
            <BackView>
                <LoadText> B R 3 W </LoadText>
            </BackView>
        </Fragment>
    )}

    connect = device => {
        console.log(device);
        BluetoothSerial.connect(device)
        .then((res) => {
          console.log(res)
          console.log(`Connected to device ${device}`);
          
          ToastAndroid.show(`Connected to device`, ToastAndroid.SHORT);

          this.setState({connected: true})
        })
        .catch((err) => console.log((err.message)))
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

// `

