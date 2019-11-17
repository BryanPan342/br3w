import React, { Component } from 'react';
import {
  Image, 
  TouchableOpacity,
  Animated,
  Dimensions,
  PanResponder,
  View,
  Platform,
  StyleSheet
} from 'react-native';

const { width } = Dimensions.get('window');
import PropTypes from 'prop-types';

const getIcon = (type, active) => {
    let icn;
    switch (type) {
    case 'Open':
        icn = active
            ? require('./assets/slider/active/complete.png')
            : require('./assets/slider/inactive/complete.png');
        break;
    case 'In Progress':
        icn = active
            ? require('./assets/slider/active/complete.png')
            : require('./assets/slider/inactive/complete.png');
        break;
    case 'Complete':
        icn = active
            ? require('./assets/slider/active/complete.png')
            : require('./assets/slider/inactive/complete.png');
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
                <Image source={getIcon(props.type, props.active)} />
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

//////////////////////////////////////////////////

export default class MultiSwitch extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          currentStatus: props.currentStatus,
          isComponentReady: false,
          position: new Animated.Value(0),
          posValue: 0,
          selectedPosition: 0,
          duration: 100,
          mainWidth: width - 30,
          switcherWidth: width / 2.7,
          thresholdDistance: width - 8 - width / 2.4
        };
        this.isParentScrollDisabled = false;
      }
    
    UNSAFE_componentWillMount() {
        this._panResponder = PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onStartShouldSetPanResponderCapture: () => true,
          onMoveShouldSetPanResponder: () => true,
          onMoveShouldSetPanResponderCapture: () => true,
    
          onPanResponderGrant: () => {
            // disable parent scroll if slider is inside a scrollview
            if (!this.isParentScrollDisabled) {
              this.props.disableScroll(false);
              this.isParentScrollDisabled = true;
            }
          },
    
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
                } else if (finalValue >= 30 && finalValue <= 121) {
                  this.inProgressSelected();
                } else if (finalValue >= 121 && finalValue <= 280) {
                  if (gestureState.dx > 0) {
                    this.completeSelected();
                  } else {
                    this.inProgressSelected();
                  }
                }
              } else {
                if (finalValue >= 78 && finalValue <= 175) {
                  this.inProgressSelected();
                } else if (finalValue >= -100 && finalValue <= 78) {
                  this.notStartedSelected();
                } else {
                  this.completeSelected();
                }
              }
            }
          },
    
          onPanResponderTerminate: () => {},
          onShouldBlockNativeResponder: () => {
            // Returns whether this component should block native components from becoming the JS
            // responder. Returns true by default. Is currently only supported on android.
            return true;
          }
        });
        this.moveInitialState();
    }
    
    notStartedSelected = () => {
        //if (this.props.disableSwitch) return;
        Animated.timing(this.state.position, {
          toValue: Platform.OS === "ios" ? -2 : 0,
          duration: this.state.duration
        }).start();
        setTimeout(() => {
          this.setState({
            posValue: Platform.OS === "ios" ? -2 : 0,
            selectedPosition: 0
          });
        }, 100);
        this.props.onStatusChanged("Open");
    };
    
    inProgressSelected = () => {
        //if (this.props.disableSwitch) return;
        console.log("inProgressSelected called");
        Animated.timing(this.state.position, {
          toValue: this.state.mainWidth / 2 - this.state.switcherWidth / 2,
          duration: this.state.duration
        }).start();
        setTimeout(() => {
          this.setState({
            posValue: this.state.mainWidth / 2 - this.state.switcherWidth / 2,
            selectedPosition: 1
          });
        }, 100);
        this.props.onStatusChanged("In Progress");
    };
    
    completeSelected = () => {
        //if (this.props.disableSwitch) return;
        Animated.timing(this.state.position, {
          toValue:
            Platform.OS === "ios"
              ? this.state.mainWidth - this.state.switcherWidth
              : this.state.mainWidth - this.state.switcherWidth - 2,
          duration: this.state.duration
        }).start();
        setTimeout(() => {
          this.setState({
            posValue:
              Platform.OS === "ios"
                ? this.state.mainWidth - this.state.switcherWidth
                : this.state.mainWidth - this.state.switcherWidth - 2,
            selectedPosition: 2
          });
        }, 100);
        this.props.onStatusChanged("Complete");
    };
    
    getStatus = () => {
        switch (this.state.selectedPosition) {
          case 0:
            return "Open";
          case 1:
            return "In Progress";
          case 2:
            return "Complete";
        }
    };
    
    moveInitialState = () => {
        switch (this.state.currentStatus) {
          case "Open":
            this.notStartedSelected();
            break;
          case "In Progress":
            this.inProgressSelected();
            break;
          case "Complete":
            this.completeSelected();
            break;
        }
    };
    
    render() {
        return (
          <View style={styles.container}>
            <Button type="Open" onPress={this.notStartedSelected} />
            <Button type="In Progress" onPress={this.inProgressSelected} />
            <Button type="Complete" onPress={this.completeSelected} />
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
    onStatusChanged: PropTypes.func
};

MultiSwitch.defaultProps = {
    disableSwitch: true
};
/////////////////////////////

const Colors = {
    mBackColor: '#efefef',
    mBorderColor: '#efefef',
    white: '#FFFFFF',
    shadowColor: '#A69E9E'
};

const Metrics = {
    containerWidth: width - 30,
    switchWidth: width / 2.7
};

const styles = StyleSheet.create({

    container: {
        width: Metrics.containerWidth,
        height: 55,
        flexDirection: 'row',
        backgroundColor: Colors.mBackColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.mBorderColor,
        borderRadius: 27.5
    },
    
    switcher: {
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: Colors.white,
        borderRadius: 28,
        height: 53,
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
        width: Metrics.containerWidth / 3,
        height: 54,
        justifyContent: 'center',
        alignItems: 'center'
    }
});