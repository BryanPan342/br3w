
import React from 'react';
import {
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
      console.log("1")
      super(props);
      this.state = {
        // temperature: this.props.navigation.getParam("temperature", 92),
        is_celsius: true,
        // amount: this.props.navigation.getParam("amount", 8),
        time_rem: 2,
        isLight: true,
      }
    }
    componentDidMount(){
        console.log("2")
    }
    render() {
      const { navigation } = this.props;
      const {navigate} = navigation;
    //   this.setState({temperature: navigation.getParam('temperature'), amount: navigation.getParam('amount')})
      BluetoothSerial.readFromDevice()
        .then((res) => {
          console.log("read from arduino" + res);
        })
    //   console.log(this.state.temperature);
    //   console.log(this.state.amount);
        m_temperature = navigation.getParam('temperature', 92)
        m_amount = navigation.getParam('amount', 8)
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

              <View style={styles.body}>
              {/* Create a SettingsButton */}
              <SettingsButton
                title=""
                onPress={() => {
                    console.log("Navigate to settings")
                    navigate('Settings', {temperature: m_temperature, amount: m_amount})}}
                >
                </SettingsButton>

                <TitleText>B R 3 W</TitleText>

                <View style={styles.bodyText}>
                  <DefaultText>Temperature: {m_temperature}</DefaultText>
                  <DefaultText>Amount of Coffee: {m_amount} oz</DefaultText>
                  <DefaultText>Time Remaining: {this.state.time_rem}</DefaultText>
                </View>
                <Button
                title="start"
                onPress={() => {
                  BluetoothSerial.write(ArduinoHelper.send_value(m_temperature, m_amount, this.state.isLight))
                  .then(() => {
                      console.log("Start coffee, sent ", ArduinoHelper.send_value(m_temperature, m_amount, this.state.isLight))
                      //console.log("isLight: ", this.state.isLight)
                  })}}
                >
                </Button>
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
    color: #562f29;
    font-size: 36;
    font-family: BREVE2;
    margin: 20px 0px;
    align-self: center;
    `
  const TitleText = styled(DefaultText)`
    color: #bc846b;
    font-size: 96;
    position: relative;
  `
  const SettingsImage = styled(Image)`
     width: 75px;
     height: 75px;
     align-self: center;
  `
  const SettingsButton = styled(CustomButton)`
      display: flex;
      height: 75px;
      width: 75px;
      border-radius: 25px;
      margin-top: 15px;
      align-self: flex-end;
      margin-right: 15px;
      opacity: 1;
  `

  const styles = StyleSheet.create({
    engine: {
      position: 'absolute',
      right: 0,
    },

    body: {
      backgroundColor: "#fffff4",
      flex: 1,
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

    text: {
      fontSize: 24,
      fontWeight: "bold",
      fontFamily: "Cochin",
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
      fontFamily: "breve2",
    },
  });
