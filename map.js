import React from 'react';
import {Image } from 'react-native';
import MapView from 'react-native-maps';
import {View,StyleSheet,LATITUDE_DELTA,LONGITUDE_DELTA} from "react-native";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      region: {
        latitude: "",
        longitude: "",
        latitudeDelta: 0.001,
        longitudeDelta: 0.010,
      },
      markers: [],
      loaded: false
    }
    
  }
  
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        },
        () => {                   
          this.getLocations();    
        }); 
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
      );
    }
    
    
    getLocations(){
      return fetch('https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&facet=overflowactivation&facet=creditcard&facet=kioskstate&facet=station_state&geofilter.distance='+this.state.region.latitude+'%2C'+this.state.region.longitude+'%2C2000')
      .then(response => response.json())
      .then(responseData =>{
        var markers = [];
        
        for (var i = 0; i < responseData.records.length; i++) {
          var coords = responseData.records[i].geometry.coordinates;
          var marker = {
            coordinate: {
              latitude: coords[1],
              longitude: coords[0],
            },
            station_name: responseData.records[i].fields.station_name +"("+parseInt(responseData.records[i].fields.dist)+" m )",
            nbebike: responseData.records[i].fields.nbebike+"/"+responseData.records[i].fields.nbfreeedock
          }
          markers.push(marker);
          
        }
        this.setState({
          markers: markers,
          loaded: true,
        });
      }
      ).done();
    }   
    
    render() {
      
      
      return (
        <View style={styles.container}>
        <MapView.Animated
        style={styles.map}
        region={this.state.region}
        showsUserLocation={true}
        >
        
        {this.state.markers.map(marker => (
          <MapView.Marker
          coordinate={marker.coordinate}
          title={marker.station_name}
          description={marker.nbebike}>
            
          <Image source={require('./logo-velo-1.jpg')} style={{ width: 40, height: 40 }} />
          
          </MapView.Marker>
          
          
          ))}
          </MapView.Animated>
          
          </View>
          );
        }
      }
      
      export default App;
      
      const styles = StyleSheet.create({
        container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ecf0f1',
        },
        map: {
          width: "100%",
          height: "100%",
        },
      })