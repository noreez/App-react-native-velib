import React, { useEffect, useState } from "react";
import { AsyncStorage, ScrollView, Text, RefreshControl, Button } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import { fetchUpdateAsync, clearUpdateCacheExperimentalAsync } from "expo/build/Updates/Updates";

export const API_URL =  "https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&facet=overflowactivation&facet=creditcard&facet=kioskstate&facet=station_state";


export const get = async ( url, networkPriority = false) => {
    const key = encodeURIComponent(url);
    const value = await AsyncStorage.getItem(key);
    
    try{
        if (value !== null && !networkPriority) {
            return { dataset: JSON.parse(value), from: "Cache"};
        } else {
            const response = await fetch (url);
            const json = await response.json();
            await AsyncStorage.setItem(key, JSON.stringify(json));
            
            return {dataset: json, from: "API"};
        }
    }catch (error) {
        return {
            dataset: JSON.parse(value),
            from: "Cache",
            error: error.message,
        };
    }
}

const Exercice3 = () => {
    const [dataset, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const netInfo = useNetInfo();
    const fetchData = networkPriority => {
        setLoading(true);
        get(API_URL, networkPriority).then(dataset => {
            setData(dataset);
            setLoading(false);
        });
    };
    
    useEffect(() => {
        fetchData();
        fetchData(true);
    }, []);
    
    return (
        <ScrollView
        refreshControl={
            <RefreshControl
            refreshing={loading}
            onRefresh={() => fetchUpdateAsync(true)}
            />
        }
        
        contentContainerStyle={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
        }}
        >
        {!dataset && <Text>Chargement ...</Text>}
        {dataset && (
            <>
            {dataset.dataset && <Text>{dataset.dataset.nhits} résultats</Text> }
            <Text>Form {dataset.form}</Text>
            {dataset.error && <Text>Error: {JSON.stringify(dataset.error)}</Text>}
            </>
            )}
            <Text style={{ color: netInfo.isConnected ? "green" : "red" }}>
            Is online ? {netInfo.isConnected.toString()}
            </Text>
            <Button title="Clear cache" onPress={() => clearUpdateCacheExperimentalAsync(API_URL)}/>
            </ScrollView>
            );
        };
        
        export default Exercice3;