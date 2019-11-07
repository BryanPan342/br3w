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
  Picker,
  Button
} from 'react-native';
import styled from 'styled-components';
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
            temperature: 95,
            amount: 8
        }
    }
  render() {
    const { navigation } = this.props;
    const {navigate} = navigation;
    return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.header} >
            <Text style={styles.headerText}> B R 3 W </Text>
          </View>
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>settings page HOLY SHIT WORKS!!!</Text>
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
              <Button
                title="navigate please"
                onPress={() => navigate('Display', {temperature: this.state.temperature, amount: this.state.amount})}
            />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )}
};

const DefaultText = styled(Text)`
  color: #562f29;
  font-size: 36;
  font-family: BREVE2;
  margin: 20px 0px;
  align-self: center;
  `

const styles = StyleSheet.create({
  headerView: {
    backgroundColor: Colors.aliceblue,

  },
  headerText: {
    color: "#bc846b",
    fontSize: 96,
    fontFamily: "BREVE2",
    margin: 20, //0px,
    alignSelf: 'center',
    //fontSize: 30,
    // fontWeight: '800',
    color: Colors.black,
    textAlign: 'center',
    position: 'relative',
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
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
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 36,
    fontWeight: '600',
    color: "#562f29",
    fontFamily: "BREVE2",
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
  container: {
    display: "flex",
    flex: 1,
    fontFamily: "breve2",
  },
});

export default SettingsPage;
