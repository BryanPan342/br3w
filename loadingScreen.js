import React, { useState, useEffect, Fragment } from 'react';
import {
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
        }
      }

    componentDidMount(){
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
                this.props.navigation.navigate('Settings', {})
            }, 1000);
        }
        else {
          setTimeout(() => {
            this.props.navigation.navigate('Settings', {})
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

