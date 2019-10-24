import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Switch,
  TouchableOpacity,
  ToastAndroid,
  Image
} from 'react-native';
var _ = require('lodash');
import BluetoothSerial from 'react-native-bluetooth-serial'
import Dialogflow, { Dialogflow_V2 } from "react-native-dialogflow"
 
export default class App extends Component<{}> {
  constructor (props) {
    super(props)
    this.state = {
      isEnabled: false,
      discovering: false,
      devices: [],
      unpairedDevices: [],
      connected: false,
      result: "switch on for x seconds",
      listeningState: "not started",
      audioLevel: 0,
      text: ''
    }
 
    this.count = 0
 
    Dialogflow.setConfiguration(
      "e0712137bce540b8bd4c4b5d5840be07", Dialogflow.LANG_ENGLISH
    );
 
    Dialogflow_V2.setConfiguration(
      "ya29.c.El93BfD5CZBWUrPJAyUdfWuHkmdzyjo0seL56z-reryvae4j8oVwLO38ARqrpj0Q5LxeUTndPLrA6GYPx4CyrlVmJRKvq_Dtwl9OO0zxiWTVK7boCV-aCVJVHbaFSGstgA",
      Dialogflow_V2.LANG_ENGLISH,
      'testv2-3b5ca'
    );
 
  }
  componentWillMount(){
 
    Promise.all([
      BluetoothSerial.isEnabled(),
      BluetoothSerial.list()
    ])
    .then((values) => {
      const [ isEnabled, devices ] = values
 
      this.setState({ isEnabled, devices })
    })
 
    BluetoothSerial.on('bluetoothEnabled', () => {
 
      Promise.all([
        BluetoothSerial.isEnabled(),
        BluetoothSerial.list()
      ])
      .then((values) => {
        const [ isEnabled, devices ] = values
        this.setState({  devices })
      })
 
      BluetoothSerial.on('bluetoothDisabled', () => {
 
         this.setState({ devices: [] })
 
      })
      BluetoothSerial.on('error', (err) => console.log(`Error: ${err.message}`))
 
    })
 
  }
  _onPressButton(){
 
    this.count = 0
    // V1
    Dialogflow.onListeningStarted(() => {
      this.setState({ listeningState: "started" });
    });
 
    Dialogflow.onListeningCanceled(() => {
      this.setState({ listeningState: "canceled" });
    });
 
    Dialogflow.onListeningFinished(() => {
      this.setState({ listeningState: "finished" });
    });
 
    Dialogflow.onAudioLevel(level => {
      this.setState({ audioLevel: level });
    });
 
    Dialogflow.startListening(result => {
 
      console.log(result.result.resolvedQuery);
      const text = result.result.resolvedQuery
      this.setState({ result: text });
 
      if(this.count == 0){
        // code to send signal
        if ((text.indexOf("switch") >= 0) && (text.indexOf(" on ") >= 0) && (text.split(' ').length >= 3)){
 
          var thenum = text.match(/\d/g);
          thenum = thenum.join("");
          //console.warn(thenum);
          if(thenum.length == 1 || thenum.length ==2){
          //if(0){
            const switchOffTime = parseInt(thenum);
            switch(switchOffTime){
              case 5: this.toggleSwitch("A") ;
                  break;
              case 10: this.toggleSwitch("B");
                  break;
              case 15: this.toggleSwitch("C") ;
                  break;
              case 20: this.toggleSwitch("D");
                  break;
              case 25: this.toggleSwitch("E");
                  break;
              case 30: this.toggleSwitch("F");
                  break;
            }
          }
 
          this.count = this.count + 1
        }
      }
 
    }, error => {
      this.setState({ result: JSON.stringify(error) });
    });
  }
  _adFailed(error){
    console.log(error);
  }
  connect (device) {
    this.setState({ connecting: true })
    BluetoothSerial.connect(device.id)
    .then((res) => {
      console.log(`Connected to device ${device.name}`);
 
      ToastAndroid.show(`Connected to device ${device.name}`, ToastAndroid.SHORT);
    })
    .catch((err) => console.log((err.message)))
  }
  _renderItem(item){
 
    return(<TouchableOpacity onPress={() => this.connect(item.item)}>
            <View style={styles.deviceNameWrap}>
              <Text style={styles.deviceName}>{ item.item.name ? item.item.name : item.item.id }</Text>
            </View>
          </TouchableOpacity>)
  }
  enable () {
    BluetoothSerial.enable()
    .then((res) => this.setState({ isEnabled: true }))
    .catch((err) => Toast.showShortBottom(err.message))
  }
 
  disable () {
    BluetoothSerial.disable()
    .then((res) => this.setState({ isEnabled: false }))
    .catch((err) => Toast.showShortBottom(err.message))
  }
 
  toggleBluetooth (value) {
    if (value === true) {
      this.enable()
    } else {
      this.disable()
    }
  }
  discoverAvailableDevices () {
    console.log("discovering");
    if (this.state.discovering) {
      return false
    } else {
      this.setState({ discovering: true })
      BluetoothSerial.discoverUnpairedDevices()
      .then((unpairedDevices) => {
        const uniqueDevices = _.uniqBy(unpairedDevices, 'id');
        console.log(uniqueDevices);
        this.setState({ unpairedDevices: uniqueDevices, discovering: false })
      })
      .catch((err) => console.log(err.message))
    }
  }
  toggleSwitch(code){
    BluetoothSerial.write(code)
    .then((res) => {
      console.log(res);
      console.log('Successfuly wrote to device')
      this.setState({ connected: true })
    })
    .catch((err) => console.log(err.message))
  }
  render() {
 
    return (
      <View style={styles.container}>
      <View style={styles.toolbar}>
            <Text style={styles.toolbarTitle}>Bluetooth Device List</Text>
            <View style={styles.toolbarButton}>
              <Switch
                value={this.state.isEnabled}
                onValueChange={(val) => this.toggleBluetooth(val)}
              />
            </View>
      </View>
        <Button
          onPress={this.discoverAvailableDevices.bind(this)}
          title="Scan for Devices"
          color="#841584"
        />
        <FlatList
          style={{flex:1}}
          data={this.state.devices}
          keyExtractor={item => item.id}
          renderItem={(item) => this._renderItem(item)}
        />
 
        <Text style={{ fontSize:15, alignSelf: "center"}}>Message Sent :</Text>
        <Text style={{ fontSize:20, color: "black", fontWeight: "bold", textAlign: "center"}}>{this.state.result}</Text>
 
        <TouchableOpacity onPress={this._onPressButton.bind(this)}>
          <Image
            style={{width: 100, height: 100, alignSelf:"center"}}
            source={require('./button.png')}
          />
        </TouchableOpacity>
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