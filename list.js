import React from 'react';
import { Button, Text, StyleSheet, View, FlatList } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { ListItem } from "react-native-elements"
import { createAppContainer } from 'react-navigation';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';  


class ListScreen extends React.Component {
    constructor() {
        super();

        this.state = {
            dataSource: [],
        };
        this.getRemoteData();
    }
    static navigationOptions = {
        title: 'Home',
    };
    
    getRemoteData = () => {
        const url = "https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&facet=overflowactivation&facet=creditcard&facet=kioskstate&facet=station_state";
        fetch(url)
        .then(response => response.json())
        .then(response => {
            this.setState({
                dataset: response.records
            });
        })
        .catch(error => {
            console.log("get data error from:" + url + " error:" + error);
        });
    };
    
    item = (item) => { 
        return <ListItem
        roundAvatar
        subtitle={item.fields.station_name}
        onPress={() => this.onPress(item)}
        />;
    }
    
    onPress = (item) => {
        this.props.navigation.navigate('Detail', {item: item})
    }
    
    render() {
        return (
            <View>
            <FlatList
            data={this.state.dataset}
            renderItem={({item}) => this.item(item)}
            />
            </View>
            );
        }
    }
    
    class DetailScreen extends React.Component {

        render() {
            const item = this.props.navigation.state.params.item;
            return (
                <View style={styles.container}>
                
                <MapView style={styles.map}
                initialRegion={{
                    latitude: item.geometry.coordinates[1],
                    longitude: item.geometry.coordinates[0],
                    latitudeDelta: 0.002,
                    longitudeDelta: 0.001,
                }}
                >
                <MapView.Marker
                coordinate={{latitude: item.geometry.coordinates[1],
                    longitude: item.geometry.coordinates[0]}}
                    title={item.fields.station_name}
                    description={item.fields.station_state}
                    />
                    </MapView>
                    <Icon size={25} name={'ios-flag'}/>  
                    <Text style={styles.text}>Name : {item.fields.station_name}</Text>
                    <Icon size={25} name={'ios-alert'}/>  
                    <Text style={styles.text}>Etat des stations: {item.fields.station_state}</Text>
                    <Icon size={25} name={'ios-sync'}/>  
                    <Text style={styles.text}>Nombre de bornes en station: {item.fields.nbedock}</Text>
                    <Icon size={25} name={'ios-checkbox'}/>  
                    <Text style={styles.text}>Nombre de bornes disponible: {item.fields.nbfreeedock}</Text>
                    <Icon size={25} name={'ios-swap'}/>  
                    <Text style={styles.text}>Etat du totem: {item.fields.station_type}</Text>
                    
                    <Button title="Home" onPress={this._goHome} />
                    </View>
                    );
                }
                _goHome = async () => {
                    this.props.navigation.navigate('Home');
                };
            }
            
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
            
            const RootStack = createStackNavigator({
                Home: ListScreen,
                Detail: DetailScreen,
            });
            
            export default createAppContainer(RootStack);
            