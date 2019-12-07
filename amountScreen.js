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
            <HeaderText>BR3W</HeaderText>
          </View>
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}

          <View style={styles.container}>
            <Text style={styles.sectionTitle}>Set Amount</Text>
            <Slider
              style={{ width: 250, height: 50, }}
              step={2}
              onValueChange={value => this.onValueChange(value)}
              minimumValue={8}
              value={parseFloat(this.state.amount)}
              maximumValue={12}
              minimumTrackTintColor="#000000"
              maximumTrackTintColor="#000000" />
            <View style={styles.slider_label}>
              <SliderText>8 oz</SliderText>
              <SliderText>10 oz</SliderText>
              <SliderText>12 oz</SliderText>
            </View>
            <View style={styles.imageCont}>
              <Image style={styles.image} source={this.state.image} />
            </View>
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
        this.setState({ image: require('./assets/images/coffeeArt_small.png') })
        break
      case 10:
        this.setState({ image: require('./assets/images/coffeeArt_med.png') })
        break
      case 12:
        this.setState({ image: require('./assets/images/coffeeArt_large.png') })
        break;
    }
    console.log("Updated value")
  }
};

const BackView = styled(View)`
  backgroundColor: #D9D3BF;
  flex: 1;
  align-items: center;
`

const DefaultText = styled(Text)`
  color: #F5F0DF;
  font-size: 18;
  font-family: futuraMdB;
  margin: 12px 0px;
  align-self: center;
`
const SliderText = styled(DefaultText)`
  font-size:18;
  margin: 0px;
  color: #562f29;
`

const HeaderText = styled(DefaultText)`
  color: #906F63;
  font-size: 96;
  align-items: center;
  paddingTop: 30;
  margin-bottom:20;
`

const styles = StyleSheet.create({
  engine: {
    position: 'absolute',
    right: 0,
  },

  header: {
    backgroundColor: "#D9D3BF",
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
    fontFamily: 'futuraMdB',
    //fontSize: 36,
    fontSize: 24,
  },

  container: {
    height: 300,
    backgroundColor: '#D9D3BF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },

  image: {
    alignSelf: 'center',
    marginVertical: 'auto',
    //width: 250,
    //height: 300,
  },
  imageCont: {
    width: 250,
    height: 300,
    marginTop: 10,
    //alignContent: 'center',
  },

  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: "futuraMdB",
    fontSize: 24,
    margin: 10,
    marginBottom: 20,
    color: '#6D544A',
  },

  slider_label: {
    display: 'flex',
    flexDirection: 'row',
    width: 250,
    justifyContent: 'space-between',
  },

});

export default amountScreen;
