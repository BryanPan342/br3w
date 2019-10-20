/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Picker
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

class SettingsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            temperature: 0,
            amount: 0
        }
    }
  render() {
      console.log(this.state.temperature);
      console.log(this.state.amount);
      return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.header} >
            <Text style={styles.headerText}> BR3W </Text>
          </View>
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>HOLY SHIT IT WORKS!!!</Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Temperature</Text>
              <Picker
                selectedValue={this.state.temperature}
                onValueChange={(itemValue) => 
                    this.setState({temperature: itemValue})}>
                <Picker.Item label="92 C" value="92" />
                <Picker.Item label="93 C" value="93" />
                <Picker.Item label="94 C" value="94" />
                <Picker.Item label="95 C" value="95" />
                <Picker.Item label="96 C" value="96" />
              </Picker>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Amount</Text>
              <Picker
                selectedValue={this.state.amount}
                onValueChange={(itemValue) => 
                    this.setState({amount: itemValue})}>
                <Picker.Item label="8 oz" value="8" />
                <Picker.Item label="10 oz" value="10" />
                <Picker.Item label="12 oz" value="12" />
              </Picker>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )}
};

const styles = StyleSheet.create({
  headerView: {
    backgroundColor: Colors.aliceblue,

  },
  headerText:{
    fontSize: 30,
    fontWeight: '800',
    color: Colors.black,
    textAlign: 'center',
  },
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

export default SettingsPage;
