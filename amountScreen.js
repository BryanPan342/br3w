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
          image: require('./assets/small.jpg')
        }
    }
    componentDidMount(){
      this.onValueChange(this.state.amount);
    }
  render() {
    const { navigation } = this.props;
    const {navigate} = navigation;
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
            <Slider
              style={{width: 250, height: 70}}
              step={2}
              onValueChange={value => this.onValueChange(value)}
              minimumValue={8}
              value={parseFloat(this.state.amount)}
              maximumValue={12}
              minimumTrackTintColor="#000000"
              maximumTrackTintColor="#000000"/>
            <Image style={styles.image} source={this.state.image}/>
          </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigate('Display', {temperature: this.state.temperature, amount: this.state.amount, roast: this.state.roast})
              }}
              >
              <DefaultText>Done</DefaultText>
           </TouchableOpacity>
        </BackView>
    </>
  );}

  getImage(amount){
    console.log(amount)
    
  }
  
  onValueChange(value) {
    this.setState({ amount: value });
    switch(value){
      case 8:
        this.setState({image:require('./assets/small.jpg')})
        break
      case 10:
        this.setState({image: require('./assets/medium.jpg')})
        break
      case 12:
        this.setState({image: require('./assets/large.jpg')})
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

  header: {
    backgroundColor: "#fffff4",
    fontSize: 96,
    fontFamily: "BREVE2",
    margin: 20,
    color: "#bc846b",
    position: 'relative',
  },

  button: {
    marginTop: 55,
    height: 100,
    width: 100,
    borderRadius: 25,
  },

  sectionTitle: {
    //fontFamily: "BREVE2",
    fontFamily: 'Futura',
    //fontSize: 36,
    fontSize: 24,
  },

  container: {
    height: 300,
    backgroundColor: '#fffff4',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image:{
    width: 150,
    height: 150,
  },
});

export default amountScreen;