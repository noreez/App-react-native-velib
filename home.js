
import * as React from 'react';
import {Alert, StyleSheet, Button, View, Text, TouchableOpacity, Animated,  FlatList, ActivityIndicator, Dimensions  } from 'react-native';
import MapView from 'react-native-maps';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';



class HomeScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
            title="Settings"
            onPress={() => this.props.navigation.navigate('Details')}
            />
            </View>
            );
        }
    }
    
    class DetailsScreen extends React.Component {
        render() {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Details Screen</Text>
                <Button
                title="Go to Moving Screen"
                onPress={() => this.props.navigation.navigate('Move')}
                />
                
                <Button
                title="Go to Same Page"
                onPress={() => this.props.navigation.push('Details')}
                />
                
                <Button
                title="Go to Detail View"
                onPress={() => this.props.navigation.push('Composant')}
                />
                
                <Button
                title="Go to Data"
                onPress={() => this.props.navigation.push('Data')}
                />
                
                <Button
                title="Go to Home"
                onPress={() => this.props.navigation.navigate('Home')}
                />
                
                </View>
                );
            }
        }
        
        class MovingScreen extends React.Component{
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
            
            class DetailView extends React.Component {
                
                
                render() {
                    return (
                        <View>
                        
                        <MapView
                        style={{ height:200 }}
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
                            
                            <Text>{this.props.station_name}</Text>
                            <Text>{this.props.station_state}</Text>
                            <Text>{this.props.nbbike}</Text>
                            <Text>{this.props.nbedock}</Text>
                            <Text>{this.props.credit_card}</Text>
                            </View>
                            
                            );
                        }
                    }
                    
                    // Specifies the default values for props:
                    DetailView.defaultProps = {
                        station_name: 'Benjamin Godard - Victor Hugo',
                        station_state: 'Operative',
                        nbbike: 2,
                        nbedock: 2,
                        credit_card: "yess"
                    };
                    
                    
                    
                    class DisplayData extends React.Component{
                        constructor(props){
                            super(props);
                            this.state ={ isLoading: true}
                        }
                        
                        componentDidMount(){
                            return fetch('https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel')
                            .then((response) => response.json())
                            .then((responseJson) => {
                                
                                this.setState({
                                    isLoading: false,
                                    dataSource: (responseJson.records),
                                }, function(){
                                    
                                });
                                
                            })
                            .catch((error) =>{
                                console.error(error);
                            });
                        }
                        
                        render(){
                            
                            if(this.state.isLoading){
                                return(
                                    <View style={{flex: 1, padding: 200}}>
                                    <ActivityIndicator/>
                                    </View>
                                    )
                                }
                                
                                return(
                                    <View style={{flex: 1, paddingTop:20, marginTop:20}}>
                                    <Text>Station Name</Text>
                                    <FlatList style={{marginTop: 60}}
                                    data={this.state.dataSource}
                                    renderItem={({item}) => 
                                    <Text>{item.fields.station_name} - {item.fields.station_state} - {item.fields.nbedock} </Text>
                                }
                                keyExtractor={({id}, index) => id}
                                />
                                </View>
                                );
                            }
                        }
                        
                        const RootStack = createStackNavigator({
                            Home: HomeScreen,
                            Details: DetailsScreen,
                            Move: MovingScreen,
                            Data: DisplayData,
                            Composant: DetailView,
                        });
                        
                        export default createAppContainer(RootStack);
                        
                        