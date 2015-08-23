'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Animated,
  View,
  PanResponder
} = React;

var Card = [
    'red',
    'green',
    'blue',
    'purple',
    'orange'
];

var SQUARE_DIM = 100;
var SWIPE_THRESHOLD = 120;

var Square = React.createClass({

  getInitialState () {
    return {
      pan: new Animated.ValueXY(),
      enter: new Animated.Value(0.5),
      card: Card[0]
    };
  },
  goToNextCard () {
    let currentCardIdx = Card.indexOf(this.state.card);
    let newIdx = currentCardIdx + 1;

    this.setState({
        card: Card[newIdx > Card.length - 1 ? 0 : newIdx]
    });
  },
  componentDidMount () {
    this.animateEntrance();
  },
  animateEntrance () {
    Animated.spring(this.state.enter, {
        toValue: 1,
        friction: 8
    }).start();
  },
  componentWillMount () {

    // this.state.pan.x._value === this.state.x.getAnimatedValue()
    console.log('pan.setOffset', this.state.pan.x._value);
    console.log('pan.setOffset', this.state.pan.x.getAnimatedValue());

    this._panResponder = PanResponder.create({
        onMoveShoudSetResponderCapture: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderGrunt: (e, gestureState) => {
            this.state.pan.setOffset({
                x: this.state.pan.x.getAnimatedValue(),
                y: this.state.pan.y.getAnimatedValue()
            });
            this.state.pan.setValue({x: 0, y: 0});
        },
        onPanResponderMove: Animated.event([
            null, {dx: this.state.pan.x, dy: this.state.pan.y}
        ]),
        onPanResponderRelease: (e, gestureState) => {

            this.state.pan.flattenOffset();
            let {vx, vy} = gestureState;

            console.log('gestureState', vx, vy);

            if (Math.abs(this.state.pan.x.getAnimatedValue()) > SWIPE_THRESHOLD) {
                Animated.decay(this.state.pan.x, {
                    velocity: 1
                }).start(() => {

                    console.log('Done x');
                    this.resetState();
                }.bind(this));

                Animated.decay(this.state.pan.y, {
                    velocity: 1
                }).start(() => {

                    console.log('Done y');
                    this.resetState();
                }.bind(this));
            } else {
                Animated.spring(this.state.pan, {
                    toValue: {x: 0, y: 0},
                    friction: 4
                }).start();
            }
        }
    });
  },
  resetState () {
    this.state.pan.setValue({x: 0, y: 0});
    this.state.enter.setValue(0);
    this.goToNextCard();
    this.animateEntrance();
  },
  getStyle () {
    return [
        styles.square,
        {
            transform: [
                {
                    translateX: this.state.pan.x
                },
                {
                    translateY: this.state.pan.y
                },
                {
                    rotate: this.state.pan.x.interpolate({
                        inputRange: [-200, 0, 200],
                        outputRange: ['-30deg', '0deg', '30deg']
                    })
                }
            ]
        },
        {
            opacity: this.state.pan.x.interpolate({
                inputRange: [-200, 0, 200],
                outputRange: [0.5, 1, 0.5]
            })
        }
    ];
  },
  render () {

    return (
      <View style={styles.container}>
        <Animated.View
            style={
                [
                    styles.card,
                    animatedCardStyles,
                    {backgroundColor: this.state.card}
                ]
                {...this._panResponder.panHandlers}
            }
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
    card: {
        width: SQUARE_DIM,
        height: SQUARE_DIM,
        backgroundColor: 'blue'
    }
});

AppRegistry.registerComponent('testing', () => Square);

