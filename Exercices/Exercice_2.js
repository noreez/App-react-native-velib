
import * as React from 'react';
import { Button, View, Text} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/Ionicons';  

import Exercice1 from './Exercice_1.js';
import Exercice3 from './Exercice_3.js';
import Exercice4 from './Exercice_4.js';


class HomeScreen extends React.Component {
    render() {
        return (
            
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            
            <Icon size={150} name={'ios-bicycle'}/>  
            
            
            <Text>Bievenue  sur la page d'accueil</Text>
            
            <Button
            title="Accéder aux exercices"
            onPress={() => this.props.navigation.navigate('Details')}
            />
            
            </View>
            );
        }
    }
    
    class Exercice2 extends React.Component {
        render() {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Exercices</Text>
                <Button
                title="Exercice 1"
                onPress={() => this.props.navigation.navigate('Move')}
                />
                
                <Button
                title="Exercice 2"
                onPress={() => this.props.navigation.push('Details')}
                />
                
                <Button
                title="Exercice 3"
                onPress={() => this.props.navigation.navigate('Cache')}
                />
                
                <Button
                title="Exercice 4"
                onPress={() => this.props.navigation.navigate('Composant')}
                />
                
                <Button
                title="Retourner sur la page d'accueil"
                onPress={() => this.props.navigation.navigate('Home')}
                />
                
                </View>
                );
            }
        }
        
        const RootStack = createStackNavigator({
            Home: HomeScreen,
            Move: Exercice1,
            Details: Exercice2,
            Cache: Exercice3,
            Composant: Exercice4,
        });
        
        export default createAppContainer(RootStack);