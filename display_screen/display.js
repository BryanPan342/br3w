
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import styled from 'styled-components';


import {
    Colors,
  } from 'react-native/Libraries/NewAppScreen';


export default class Display extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        temp: 95,
        is_celsius: true,
        amount: 8,
        time_rem: 2
      }
    }
    render() {
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
                <StyledText>BR3W</StyledText>
                <Text style={styles.text}>Temperature: {this.state.temp}</Text>
                <Text style={styles.text}>Amount of Coffee: {this.state.amount} oz</Text>
                <Text style={styles.text}>Time Remaining: {this.state.time_rem}</Text>
                {/* this version of setState doesn't know previous states */}
                {/* <Button 
                title="Increase temperature by 1"
                onPress={() => this.setState({temp: 100})}>
                </Button> */}
                {/* <Button style={styles.button}
                title="Increase temperature by 1"
                onPress={() => this.setState(previousState => ({temp: previousState.temp+1}))}>
                </Button> */}
                <Button 
                title="Settings"
                onPress={() => this.setState(previousState => ({temp: previousState.temp+1}))}>
                </Button>
              </View>
          </SafeAreaView>
        </>
      );
    };
  };
  
  const DefaultText = styled(Text)`
    color: tomato;
    `
  const StyledText = styled(DefaultText)`
    color: tomato;
  `

  const styles = StyleSheet.create({
    engine: {
      position: 'absolute',
      right: 0,
    },
    body: {

      backgroundColor: "#55c6f6",
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-around",
      alignItems: "center",
      // fontWeight: "bold",
    },
    button: {
      flex: 1,
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