import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Switch,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
var _ = require('lodash');
import BluetoothSerial from 'react-native-bluetooth-serial'

export default class BluetoothConnect extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isEnabled: false,
      discovering: false,
      devices: [],
      unpairedDevices: [],
      connected: false,
    }
  }
  componentDidMount(){
    BluetoothSerial.enable()
        .then((res) => this.setState({ isEnabled: true }))
        .catch((err) => Toast.showShortBottom(err.message))
    console.log("connecting...")
    this.connect("98:D3:51:FD:D0:99")
  }
  connect (device) {
    const { navigation } = this.props;
    const {navigate} = navigation; 
    this.setState({ connecting: true })
    console.log(device);
    BluetoothSerial.connect(device)
    .then((res) => {
      console.log(`Connected to device ${device}`);
      
      ToastAndroid.show(`Connected to device`, ToastAndroid.SHORT);
      navigate('Settings')
    })
    .catch((err) => console.log((err.message)))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Connecting to your br3w...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  toolbar:{
    paddingTop:30,
    paddingBottom:30,
    flexDirection:'row'
  },
  toolbarButton:{
    width: 50,
    marginTop: 8,
  },
  toolbarTitle:{
    textAlign:'center',
    fontWeight:'bold',
    fontSize: 20,
    flex:1,
    marginTop:6
  },
  deviceName: {
    fontSize: 17,
    color: "black"
  },
  deviceNameWrap: {
    margin: 10,
    borderBottomWidth:1
  }
});