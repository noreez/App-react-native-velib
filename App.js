import React from 'react';  
import {StyleSheet, Text, View,Button} from 'react-native';  
import { createBottomTabNavigator, createAppContainer} from 'react-navigation';  
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';  
import Icon from 'react-native-vector-icons/Ionicons';  

import Map from './map.js';
import HomeScreen from './home.js';

 class ImageScreen extends React.Component {  
    render() {  
        return (  
            <View style={styles.container}>  
                <Text>Image Screen</Text>  
            </View>  
        );  
    }  
}  

const styles = StyleSheet.create({  
    container: {  
        flex: 1,  
        justifyContent: 'center',  
        alignItems: 'center'  
    },  
});  
const TabNavigator = createMaterialBottomTabNavigator(  
    {  
        Home: { screen: HomeScreen,  
            navigationOptions:{  
                tabBarLabel:'Home',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-home'}/>  
                    </View>),  
            }  
        },  
        Profile: { screen: Map,  
            navigationOptions:{  
                tabBarLabel:'Map',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-map'}/>  
                    </View>),  
                activeColor: '#f60c0d',  
                inactiveColor: '#f65a22',  
                barStyle: { backgroundColor: '#f69b31' },  
            }  
        },  
        Image: { screen: ImageScreen,  
            navigationOptions:{  
                tabBarLabel:'List',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-list'}/>  
                    </View>),  
                activeColor: '#615af6',  
                inactiveColor: '#46f6d7',  
                barStyle: { backgroundColor: '#67baf6' },  
            }  
        },   
    },  
    {  
      initialRouteName: "Home",  
      activeColor: '#f0edf6',  
      inactiveColor: '#226557',  
      barStyle: { backgroundColor: '#3BAD87' },  
    },  
);  
  
export default createAppContainer(TabNavigator);  
