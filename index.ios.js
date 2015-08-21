'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  PanResponder,
  View
} = React;

var Pan = React.createClass({

  componentWillMount: function () {

    this._panResponder = PanResponder.create({
          onStartShouldSetPanResponder: (evt, gestureState) => true,
          onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
          onMoveShouldSetPanResponder: (evt, gestureState) => true,
          onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
          onPanResponderGrant: (evt, gestureState) => console.log('start'),
          onPanResponderMove: (evt, gestureState) => console.log('move'),
          onPanResponderTerminationRequest: (evt, gestureState) => true,
          onPanResponderRelease: (evt, gestureState) => console.log('end'),
          onPanResponderTerminate: (evt, gestureState) => console.log('start'),
          onShouldBlockNativeResponder: (evt, gestureState) => true
      });
  },

  render: function() {

    return (
      <View style={styles.container}>
        <View style={styles.circle} {...this._panResponder.panHandlers} />
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
  }
});


AppRegistry.registerComponent('testing', () => Pan);
