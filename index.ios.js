'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Animated,
  View
} = React;

var SQUARE_DIM = 100;

var Square = React.createClass({

  getInitialState () {
    return {
      pan: new Animated.ValueXY()
    };
  },
  getStyle () {
    return [
        styles.square,
        {transform: this.state.pan.getTranslateTransform()}
    ];
  },
  render () {

    return (
      <View style={styles.container}>
        <Animated.View style={this.getStyle()} />
      </View>
    );
  }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    square: {
        width: SQUARE_DIM,
        height: SQUARE_DIM,
        backgroundColor: 'blue'
    }
});

AppRegistry.registerComponent('testing', () => Square);

