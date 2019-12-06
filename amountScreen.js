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
  ScrollView,
  View,
  Text,
  StatusBar,
  Slider,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components';

export const CustomButton = (props) => {
  const { style = {}, onPress } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style]}>
      {/* <StartImage source={require('../br3w/assets/images/coffeeArt.png')} /> */}
    </TouchableOpacity>
  );
};

class amountScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: this.props.navigation.getParam("temperature", 92),
      amount: this.props.navigation.getParam("amount", 8),
      roast: this.props.navigation.getParam("roast", true),
      image: require('./assets/coffee_amount.png')
    }
  }
  componentDidMount() {
    this.onValueChange(this.state.amount);
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

          <View style={styles.container}>
            <Text style={styles.selectText}> Select Amount </Text>
            <Image resizeMode={"contain"} style={styles.image} source={this.state.image} />
            <Slider
              style={{ width: 250, height: 70 }}
              step={2}
              onValueChange={value => this.onValueChange(value)}
              minimumValue={8}
              value={parseFloat(this.state.amount)}
              maximumValue={12}
              minimumTrackTintColor="#000000"
              maximumTrackTintColor="#000000" />
          </View>
          <View style={styles.bottom}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigate('Display', { temperature: this.state.temperature, amount: this.state.amount, roast: this.state.roast })
              }}
            >
              <DefaultText>DONE</DefaultText>
            </TouchableOpacity>
          </View>
        </BackView>
      </>
    );
  }

  getImage(amount) {
    console.log(amount)
  }

  onValueChange(value) {
    this.setState({ amount: value });
    switch (value) {
      case 8:
        this.setState({ image: require('./assets/coffee_amount.png') })
        break
      case 10:
        this.setState({ image: require('./assets/medium.jpg') })
        break
      case 12:
        this.setState({ image: require('./assets/large.jpg') })
        break;
    }
    console.log("Updated value")
  }
};

const BackView = styled(View)`
  backgroundColor: #fffff4;
  flex: 1;
  align-items: center;
`

const DefaultText = styled(Text)`
  color: #F5F0DF;
  font-size: 24;
  font-family: Futura;
  margin: 10px 0px;
  align-self: center;
`

const HeaderText = styled(DefaultText)`
color: #906F63;
font-size: 86;
font-family: Futura;
align-items: center;
`

const styles = StyleSheet.create({
  engine: {
    position: 'absolute',
    right: 0,
  },

  header: {
    backgroundColor: "#fffff4",
    fontSize: 96,
    fontFamily: "BREVE2",
    margin: 20,
    color: "#906F63",
    position: 'relative',
  },
  selectText: {
    color: "#6D544A",
    fontSize: 28
  },
  button: {
    //marginTop: 140,
    height: 50,
    width: 222,
    borderRadius: 25,
    backgroundColor: "#906F63",
    position: 'relative',
  },

  sectionTitle: {
    //fontFamily: "BREVE2",
    fontFamily: 'Futura',
    //fontSize: 36,
    fontSize: 24,
  },

  container: {
    flex: 8,
    backgroundColor: '#fffff4',
    alignItems: 'center',
    justifyContent: 'space-around', 
  },

  image: {
    width: 100,
    height: 100,
  },

  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
});

export default amountScreen;
