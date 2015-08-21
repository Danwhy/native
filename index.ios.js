'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  PanResponder,
  Text,
  View
} = React;

var testing = React.createClass({

  _posX: 0,
  _posY: 0,
  position: {},
  update: function () {

  },
  componentWillMount: function () {

    this._panResponder = PanResponder.create({
          // Ask to be the responder:
          onStartShouldSetPanResponder: (evt, gestureState) => true,
          onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
          onMoveShouldSetPanResponder: (evt, gestureState) => true,
          onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

          onPanResponderGrant: (evt, gestureState) => {
            // The guesture has started. Show visual feedback so the user knows
            // what is happening!
            console.log('start');
            // gestureState.{x,y}0 will be set to zero now
          },
          onPanResponderMove: (evt, gestureState) => {

            console.log('fdhkjsa', this._posX, gestureState.moveX)
            this._posX = gestureState.moveX;
            this._posY = gestureState.moveY;
            this.update();
          },
          onPanResponderTerminationRequest: (evt, gestureState) => true,
          onPanResponderRelease: (evt, gestureState) => {
            // The user has released all touches while this view is the
            // responder. This typically means a gesture has succeeded
            console.log('end');
          },
          onPanResponderTerminate: (evt, gestureState) => {
            // Another component has become the responder, so this gesture
            // should be cancelled
            console.log('start');
          },
          onShouldBlockNativeResponder: (evt, gestureState) => {
            // Returns whether this component should block native components from becoming the JS
            // responder. Returns true by default. Is currently only supported on android.
            console.log('some');
            return true;
          },
      });
  },

  render: function() {

    console.log(this._panResponder)

    return (
      <View style={styles.container}>

        <View style={styles.circle} {...this._panResponder.panHandlers} />

        <View style={styles.containerSpan}>
          <Text style={styles.span}>Touch start: {this._posX}</Text>
          <Text style={styles.span}>Touch distance: {this._posY}</Text>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  circle: {
    width: 300,
    height: 300,
    backgroundColor: '#ffeeff',
    borderColor: 'black',
    borderWidth: 1
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerSpan: {
    marginTop: 20
  },
  span: {
    textAlign: 'left'
  }
});


AppRegistry.registerComponent('testing', () => testing);
