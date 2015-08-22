'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Animated,
  View,
  PanResponder
} = React;

var SQUARE_DIM = 100;

var Square = React.createClass({

  getInitialState () {
    return {
      pan: new Animated.ValueXY()
    };
  },
  componentWillMount () {
    this._panResponder = PanResponder.create({
        onMoveShoudSetResponderCapture: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderGrunt: (e, gestureState) => {
            this.state.pan.setOffset({x: this.state.pan.x.getAnimatedValue(), y: this.state.pan.y.getAnimatedValue()});
            this.state.pan.setValue({x: 0, y: 0});
        },
        onPanResponderMove: Animated.event([
            null, {dx: this.state.pan.x, dy: this.state.pan.y}
        ]),
        onPanResponderRelease: () => {
            this.state.pan.flattenOffset();
        }
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
        <Animated.View
            style={this.getStyle()}
            {...this._panResponder.panHandlers}
        />
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

