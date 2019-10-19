
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button
} from 'react-native';
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
          <SafeAreaView>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}>
              {/* <Header /> */}
              {global.HermesInternal == null ? null : (
                <View style={styles.engine}>
                  <Text style={styles.footer}>Engine: Hermes</Text>
                </View>
              )}
              <View style={styles.body}>
                <Text>BR3W</Text>
                <Text>Temperature: {this.state.temp}</Text>
                <Text>Amount of Coffee: {this.state.amount} oz</Text>
                <Text>Time Remaining: {this.state.time_rem}</Text>
                {/* this version of setState doesn't know previous states */}
                {/* <Button 
                title="Increase temperature by 1"
                onPress={() => this.setState({temp: 100})}>
                </Button> */}
                <Button 
                title="Increase temperature by 1"
                onPress={() => this.setState(previousState => ({temp: previousState.temp+1}))}>
                </Button>
                <Text>hi</Text>
                <Button 
                title="Settings"
                onPress={() => this.setState(previousState => ({temp: previousState.temp+1}))}>
                </Button>
              </View>
            </ScrollView>
          </SafeAreaView>
        </>
      );
    };
  };
  
  const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: Colors.lighter,
    },
    engine: {
      position: 'absolute',
      right: 0,
    },
    body: {
      backgroundColor: Colors.white,
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: Colors.black,
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
      color: Colors.dark,
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
  });