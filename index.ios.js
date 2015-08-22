'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var {
  AppRegistry,
  StyleSheet,
  Animated,
  View
} = React;

var {
    width,
    height
} = Dimensions.get('window');

var SQUARE_DIM = 60;
var SPRING_CONFIG = {tension: 2, friction: 3};

var Square = React.createClass({

  getInitialState () {
    return {
      pan: new Animated.ValueXY()
    };
  },
  componentDidMount () {

    Animated.sequence([
        Animated.spring(this.state.pan, {
            ...SPRING_CONFIG,
            toValue: {x: 0, y: height - SQUARE_DIM}
        }),
        Animated.spring(this.state.pan, {
            ...SPRING_CONFIG,
            toValue: {x: width - SQUARE_DIM, y: height - SQUARE_DIM}
        }),
        Animated.spring(this.state.pan, {
            ...SPRING_CONFIG,
            toValue: {x: width - SQUARE_DIM, y: 0}
        }),
        Animated.spring(this.state.pan, {
            ...SPRING_CONFIG,
            toValue: {x: 0, y: 0}
        })
    ]).start(function (obj) {

        console.log('Completation callback: ', obj);
    });
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
        flex: 1
    },
    square: {
        width: SQUARE_DIM,
        height: SQUARE_DIM,
        backgroundColor: 'blue'
    }
});

AppRegistry.registerComponent('testing', () => Square);

