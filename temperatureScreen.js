import React, { Component } from 'react';
import {
  Animated,
  Easing,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Picker,
  Button,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components';
export const CustomButton = (props) => {
  const { style = {}, onPress } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style]}>
      <StartImage source={require('../br3w/assets/images/coffeeArt.png')} />
    </TouchableOpacity>
  );
};

const backgroundImage = require('./img/redBar.png');

class Thermometer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: this.props.navigation.getParam("temperature", 92),
      amount: this.props.navigation.getParam("amount", 8),
      roast: this.props.navigation.getParam("roast", true)
    }
    this.animatedValue = new Animated.Value(this.state.temperature - 92); //sets initial height
  }

  handleAnimation1 = () => { //smoothly increases height of thermometer
    Animated.timing(this.animatedValue, {
      toValue: this.state.temperature - 91,
      duration: 750,
      easing: Easing.ease
    }).start()
  }

  handleAnimation2 = () => { //smoothly decreases height of thermometer
    Animated.timing(this.animatedValue, {
      toValue: this.state.temperature - 93,
      duration: 750,
      easing: Easing.ease
    }).start()
  }

  render() {
    const { navigation } = this.props;
    const { navigate } = navigation;
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <BackView>
          <View style={styles.header} >
            <HeaderText> BR3W </HeaderText>
          </View>
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <Text style={styles.sectionTitle}>Set Temperature</Text>
            {/* <View style={{ flex: 1 }}> */}
            <Text style={styles.setTemp}>{this.state.temperature}{' C'}{'\n'} </Text>
            <TouchableOpacity onPress={() => this.state.temperature < 96 ? //increase temp only if less than 96 and calls animation
              this.setState({ temperature: this.state.temperature + 1 }) + this.handleAnimation1() : this.setState({ temperature: this.state.temperature })}>
              <Text style={styles.tempControl} >+</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.state.temperature > 92 ? //decrease temp only if greater than 92 and calls animation 
              this.setState({ temperature: this.state.temperature - 1 }) + this.handleAnimation2() : this.setState({ temperature: this.state.temperature })}>
              <Text style={styles.tempControl}>-</Text>
            </TouchableOpacity>
            <Animated.Image
              source={backgroundImage}
              resizeMode='cover'
              style={{
                borderRadius: 5,
                //left: 65,
                height: 60, //height at 92
                width: 40,
                alignSelf: 'center',
                transform: [
                  {
                    translateY: this.animatedValue.interpolate({ //shifts thermometer in proportion with scaling
                      inputRange: [0, 1],
                      outputRange: [1, -15]
                    })
                  },
                  {
                    scaleY: this.animatedValue.interpolate({ //scales thermometer 1.5 times the initial height
                      inputRange: [0, 1],
                      outputRange: [1, 1.5]
                    })
                  }
                ]
              }}
            />
            <Image style={styles.circle} source={require('./img/redCircle.png')} />
          </View>
          
          <View style={styles.bottom}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              console.log(this.state.temperature);
              navigate('Display', { temperature: this.state.temperature, amount: this.state.amount, roast: this.state.roast })
            }}>
            <DefaultText>DONE</DefaultText>
          </TouchableOpacity>
          </View>
        </BackView>
      </>
    )
  }
};

export default Thermometer;
const BackView = styled(View)`
  backgroundColor: #D9D3BF;
  flex: 1;
  align-items: center;
`
const DefaultText = styled(Text)`
  color: #F5F0DF;
  opacity: 1;
  font-size: 18;
  font-family: futuraMdB;
  margin: 12px 0px;
  align-self: center;
`
const StartImage = styled(Image)`
   width: 75px;
   height: 75px;
   align-self: center;
`
const HeaderText = styled(DefaultText)`
  color: #906F63;
  font-size: 96;
  paddingTop: 30;
`

const styles = StyleSheet.create({
  engine: {
    position: 'absolute',
    right: 0,
  },

  loadingScreen: {
    flex: 1,
    backgroundColor: "#D9D3BF",
  },

  header: {
    backgroundColor: "#D9D3BF",
    fontSize: 96,
    fontFamily: "BREVE2",
    color: "#bc846b",
    // position: 'relative',
  },

  setTemp: {
    backgroundColor: "#D9D3BF",
    fontSize: 24,
    fontFamily: "futuraMdB",
    color: '#6D544A',
    position: 'relative',
    textAlign: 'center',
    marginTop: 0,
    marginBottom: 0
  },

  tempControl: {
    backgroundColor: "#D9D3BF",
    fontSize: 100,
    fontFamily: "BREVE2",
    color: "#6D544A",
    marginTop: -35,
    paddingTop: 20,
    width: 50,
  },

  controlButton: {
    display: 'flex',
    backgroundColor: "#D9D3BF",
    fontSize: 96,
    fontFamily: "BREVE2",
    margin: 20,
    color: "#bc846b",
    position: 'absolute',

  },

  circle: {
    display: 'flex',
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignSelf: 'center',
    top: -20,
    // left: 44

  },

  button: {
    marginTop: 55,
    height: 50,
    width: 222,
    borderRadius: 25,
    backgroundColor: "#906F63",
    position: 'relative',
  },

  sectionTitle: {
    fontFamily: "futuraMdB",
    fontSize: 24,
    margin: 10,
    marginBottom: 20,
    color: '#6D544A',
  },

  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
})