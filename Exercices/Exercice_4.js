
import * as React from 'react';
import {Text, View,StyleSheet} from 'react-native';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';  


export default class Exercice4 extends React.Component {
    
    render() {
        return (
            
            <View style={styles.container}>
            
            <MapView style={styles.map}
            
            initialRegion={{
                latitude: 48.848698,
                longitude: 2.388321,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            >
            <MapView.Marker
            coordinate={{latitude: 48.848698,
                longitude: 2.388321,}}
                title={"Benjamin Godard - Victor Hugo"}
                description={"Station Vélib"}
                />
                </MapView>
                
                <Icon size={25} name={'ios-flag'}/>  
                <Text style={styles.text}>Name : {this.props.station_name}</Text>
                <Icon size={25} name={'ios-alert'}/>  
                <Text style={styles.text}>Etat des stations: {this.props.station_state}</Text>
                <Icon size={25} name={'ios-sync'}/>  
                <Text style={styles.text}>Nombre de bornes en station: {this.props.nbedock}</Text>
                <Icon size={25} name={'ios-checkbox'}/>  
                <Text style={styles.text}>Nombre de bornes disponible: {this.props.nbfreeedock}</Text>
                <Icon size={25} name={'ios-swap'}/>  
                <Text style={styles.text}>Etat du totem: {this.props.station_type}</Text>
                
                </View>
                
                
                );
            }
        }
        
        // Specifies the default values for props:
        Exercice4.defaultProps = {
            station_name: 'Benjamin Godard - Victor Hugo',
            station_state: 'Operative',
            nbbike: 2,
            nbedock: 2,
            station_type: "yes"
        };

        styles = StyleSheet.create({
            container: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            },
            text: {
                fontSize: 16,
            },
            map: {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 470,
            }
        });