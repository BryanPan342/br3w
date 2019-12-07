
import React from 'react';
import {
  AsyncStorage,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import BluetoothSerial from 'react-native-bluetooth-serial';
import MultiSwitch from '../MultiSwitch';
import ArduinoHelper from '../utils/ArduinoHelper'
// Create CustomButton to use later
export const CustomButton = (props) => {

  const { style = {}, onPress } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style]}>
      <SettingsImage source={require('../assets/images/settings.png')} />
    </TouchableOpacity>
  );
};

export default class Display extends React.Component {
  constructor(props) {
    console.disableYellowBox = true;
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    const t_change = this.props.navigation.getParam('temperature', 92) !== nextProps.navigation.getParam('temperature', 92)
    const a_change = this.props.navigation.getParam('amount', 8) !== nextProps.navigation.getParam('amount', 8)
    const r_change = this.props.navigation.getParam('roast', true) !== nextProps.navigation.getParam('roast', true)
    return t_change || a_change || r_change;
  }

  _storeData = async (t, a, r) => {
    try {
      await AsyncStorage.setItem('temperature', JSON.stringify(t));
    } catch (error) {
      console.log(error);
      console.error("Failed to persist temperature");
    }
    try {
      await AsyncStorage.setItem('amount', JSON.stringify(a));
    } catch (error) {
      console.log(error);
      console.error("Failed to persist amount");
    }
    try {
      await AsyncStorage.setItem('roast', JSON.stringify(r));
    } catch (error) {
      console.log(error);
      console.error("Failed to persist strength");
    }
  }

  render() {
    const { navigation } = this.props;
    const { navigate } = navigation;
    //move this to progress page
    m_temperature = navigation.getParam('temperature', 92)
    m_amount = navigation.getParam('amount', 8)
    m_isLight = navigation.getParam('roast', true)
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          {/* <Header /> */}
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}

          <TitleText>BR3W</TitleText>
          <View style={styles.body}>

            <View style={styles.bodyText}>
              <TouchableOpacity
                // style={{
                //   marginVertical: 20,
                //   borderColor: "#000000",
                //   borderWidth: 1,
                //   borderRadius: 20,
                // }}
                style={styles.temp_amt_button}
                onPress={() => {
                  navigate('temperatureScreen', { temperature: m_temperature, roast: m_isLight, amount: m_amount })
                }}
              >
                <DefaultText>Temperature: {m_temperature + " \u00B0C"} </DefaultText>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.temp_amt_button}
                onPress={() => {
                  navigate('amountScreen', { temperature: m_temperature, amount: m_amount, roast: m_isLight })
                }}
              >
                <DefaultText>Amount: {m_amount} oz</DefaultText>
              </TouchableOpacity>
              <MultiSwitch
                style={{
                  marginVertical: 35,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                currentStatus={m_isLight ? 'Light' : 'Dark'}
                disableScroll={value => {
                  console.log('scrollEnabled', value);
                  this.scrollView.setNativeProps({
                    scrollEnabled: value
                  });
                }}
                isParentScrollEnabled={true}
                onStatusChanged={text => {
                  text == "Light" ? m_isLight = true : m_isLight = false;
                }}
               roast = {m_isLight}/>
            </View>
            <TouchableOpacity
              title="start"
              onPress={() => {
                this._storeData(m_temperature, m_amount, m_isLight);
                BluetoothSerial.write(ArduinoHelper.send_value(m_temperature, m_amount, m_isLight))
                  .then(() => {
                    console.log("Start coffee, sent ", ArduinoHelper.send_value(m_temperature, m_amount, m_isLight))
                    navigate('progressBar', { temperature: m_temperature, amount: m_amount, roast: m_isLight })
                  })
              }}>
                <Image resizeMode={"contain"} style={styles.image} source={require('../assets/display-coffee.png')} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </>
    );
  };
};

//Styled Components
// Hierarchy Summary:
//     Text > DefaultText > TitleText
//     CustomButton > SettingsButton
const DefaultText = styled(Text)`
    color: #F5F0F5;
    font-size: 18;
    margin-top: 8;
    font-family: "futuraMdB";
    align-self: center;
    `
const TitleText = styled(Text)`
    background-color: #D9D3BF;
    text-align: center;
    flex: 1;
    padding-top: 50;
    color: #906F63;
    font-size: 96;
    font-family: "futuraMdB";
  `
const SettingsImage = styled(Image)`
     width: 75px;
     height: 75px;
     align-self: center;
  `

const styles = StyleSheet.create({
  engine: {
    position: 'absolute',
    right: 0,
  },
  container: {
    display: "flex",
    justifyContent: "center",
    color: "#D9D3BF",
    backgroundColor: "#D9D3BF"
  },

  body: {
    backgroundColor: "#D9D3BF",
    flex: 3,
    flexDirection: "column",
    alignItems: "center",
  },

  bodyText: {
    display: "flex",
    marginBottom: 20,
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

  textButton: {
    display: 'flex',
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //futuraMdB
  text: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "futuraMdB",
  },

  title: {
    fontSize: 96,
    color: "#ffffff",
    fontWeight: "normal",
  },

  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },

  highlight: {
    fontWeight: '700',
  },

  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },

  container: {
    display: "flex",
    flex: 1,
    fontFamily: "futuraMdB",
  },

  temp_amt_button: {
    marginVertical: 25,
    height: 37,
    width: 222,
    borderRadius: 35,
    backgroundColor: "#906F63",
    position: 'relative',
    alignSelf: 'center',
  },
  image: {
    alignSelf: 'center',
    marginTop: 20,
    width: 150,
    height: 75
  }
});
