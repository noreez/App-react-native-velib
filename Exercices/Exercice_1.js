import * as React from 'react';
import {TouchableOpacity, Animated  } from 'react-native';

export default class Exercice1 extends React.Component{
    state = {
        animation: new Animated.Value(0),
    }
    
    onPress = () => {
        Animated.timing(this.state.animation, {
            toValue: 100,
            duration: 2000
        }).start()
    }
    
    render() {
        return (
            <TouchableOpacity style={{flex: 100}} onPress={this.onPress} >
            <Animated.View style={{ flex: this.state.animation, backgroundColor:'powderblue'}}>
            </Animated.View>
            <Animated.View style={{ flex: 100, backgroundColor:'skyblue'}}>
            </Animated.View>
            </TouchableOpacity>
            );
        }
    }