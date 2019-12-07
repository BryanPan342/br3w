/* Switch Button Component class
 */
import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  View,
  Platform,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text
} from 'react-native';
const { width } = Dimensions.get("window");
import PropTypes from "prop-types";

//// Button /////

const getIcon = (type, active) => {
  let icn;
  switch (type) {
    case 'Light':
      icn = active
        ? <Text style={styles.InactiveText}> Light </Text> //require('./assets/slider/active/complete.png')
        : <Text style={styles.ActiveText}> Light </Text> //require('./assets/slider/inactive/complete.png');
      break;
    case 'Dark':
      icn = active
        ? <Text style={styles.InactiveText}> Dark </Text>//require('./assets/slider/active/light.jpg')
        : <Text style={styles.ActiveText}> Dark </Text>//require('./assets/slider/inactive/dark.jpg');
      break;
  }
  return icn;
};

const Button = props => {
  return (
    <View>
      <TouchableOpacity
        onPress={props.onPress}
        style={styles.buttonStyle}
      >
        {/* <Image source={getIcon(props.type, props.active)} /> */}
        <Text>{getIcon(props.type, props.active)}</Text>
      </TouchableOpacity>
    </View>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  active: PropTypes.bool,
  onPress: PropTypes.func
};

Button.defaultProps = {
  active: false
};

///////// Multi Switch ////////////

class MultiSwitch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStatus: props.currentStatus,
      isComponentReady: false,
      position:  new Animated.Value(0),
      posValue: 0,
      selectedPosition: 0, //this.props.roast== true ? 0 : 1,
      duration: 100,
      mainWidth: width - 100,
      switcherWidth: width / 3,
      thresholdDistance: width - 10 - width / 3
    };
    this.isParentScrollDisabled = false;
  }

  UNSAFE_componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderMove: (evt, gestureState) => {
        if (!this.props.disableSwitch) {
          let finalValue = gestureState.dx + this.state.posValue;
          if (finalValue >= 0 && finalValue <= this.state.thresholdDistance)
            this.state.position.setValue(this.state.posValue + gestureState.dx);
        }
      },

      onPanResponderTerminationRequest: () => true,

      onPanResponderRelease: (evt, gestureState) => {
        if (!this.props.disableSwitch) {
          let finalValue = gestureState.dx + this.state.posValue;
          this.isParentScrollDisabled = false;
          this.props.disableScroll(true);
          if (gestureState.dx > 0) {
            if (finalValue >= 0 && finalValue <= 30) {
              this.notStartedSelected();
            } else {
              this.inProgressSelected();
            }
          }
          else {
            if (finalValue >= 78 && finalValue <= 175) {
              this.inProgressSelected();
            } else {
              this.notStartedSelected();
            }
          }
        }
      },

      onPanResponderTerminate: () => { },
      onShouldBlockNativeResponder: () => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      }
    });
    this.moveInitialState();
  }

  notStartedSelected = () => {
    Animated.timing(this.state.position, {
      toValue: Platform.OS === "ios" ? -2 : 0,
      duration: this.state.duration
    }).start();
    setTimeout(() => {
      this.setState({
        posValue: Platform.OS === "ios" ? -2 : 0,
        selectedPosition: 0
      });
    }, 10);
    this.props.onStatusChanged("Light");
  };

  inProgressSelected = () => {
    Animated.timing(this.state.position, {
      toValue: this.state.mainWidth - this.state.switcherWidth - 50,
      duration: this.state.duration
    }).start();
    setTimeout(() => {
      this.setState({
        posValue: this.state.mainWidth - this.state.switcherWidth - 2,
        selectedPosition: 1
      });
    }, 10);
    this.props.onStatusChanged("Dark");
  };

  getStatus = () => {
    switch (this.state.selectedPosition) {
      case 0:
        return "Light";
      case 1:
        return "Dark";
    }
  };

  moveInitialState = () => {
    switch (this.state.currentStatus) {
      case "Light":
        this.notStartedSelected();
        break;
      case "Dark":
        this.inProgressSelected();
        break;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Button type="Light" onPress={this.notStartedSelected} />
        <Button type="Dark" onPress={this.inProgressSelected} />
        <Animated.View
          {...this._panResponder.panHandlers}
          style={[
            styles.switcher,
            {
              transform: [{ translateX: this.state.position }]
            }
          ]}
        >
          <Button type={this.getStatus()} active={true} />
        </Animated.View>
      </View>
    );
  }
}

MultiSwitch.propTypes = {
  disableScroll: PropTypes.func,
  onStatusChanged: PropTypes.func,
};

MultiSwitch.defaultProps = {
  disableSwitch: true
};

/////////// Styles //////////

const Colors = {
  mBackColor: '#efefef',
  mBorderColor: '#efefef',
  white: '#FFFFFF',
  shadowColor: '#A69E9E'
};

const Metrics = {
  containerWidth: width - 150,
  switchWidth: width / 3
};

const styles = StyleSheet.create({

  container: {
    width: Metrics.containerWidth,
    height: 37,
    flexDirection: 'row',
    backgroundColor: '#906F63',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.mBorderColor,
    borderRadius: 27.5,
    marginVertical: 25,
  },

  switcher: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#6D544A',
    borderRadius: 28,
    height: 37,
    alignItems: 'center',
    justifyContent: 'center',
    width: Metrics.switchWidth,
    elevation: 4,
    shadowOpacity: 0.31,
    shadowRadius: 10,
    shadowColor: Colors.shadowColor
  },
  buttonStyle: {
    flex: 1,
    width: Metrics.containerWidth / 2.7,
    height: 37,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ActiveText: {
    fontSize: 18,
    color: '#F5F0DF',
    fontWeight: 'bold',
    fontFamily: 'Futura',
  },

  InactiveText: {
    fontSize: 18,
    color: '#F5F0DF',
    fontWeight: 'bold',
    fontFamily: 'Futura',
  }
});

export default MultiSwitch;
