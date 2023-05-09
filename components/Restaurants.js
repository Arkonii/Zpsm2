import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import {postData , getData} from '../config/server';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import styles from '../config/styles';
export default function Restaurants({ navigation }) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        getData('restaurants')
            .then(async (data) => {
                try {
                    setData(data);
                    setIsLoading(false);
                    console.log(data);
                } catch (error) {
                    console.log(error);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    if (isLoading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    const buttonPress = (item) => {
        console.log(`Clicked button with id: ${item}`);
        navigation.navigate("Restaurant",{jsonItem: item});
    };

    const renderItem = ({ item }) => {
        return (
            <View style={styles.container}>
                <Text style={styles.author}>{item.title}</Text>
                <Text style={styles.content}>{item.body}</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => buttonPress(item)}
                >
                    <Text style={styles.buttonText}>Wybierz</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const filteredData = data.filter(
        item => item.title.toLowerCase().includes(search.toLowerCase())
            || item.body.toLowerCase().includes(search.toLowerCase())
    );

    return(
        <View style={styles.root}>
            <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1, margin: 10}}
                onChangeText={(text) => setSearch(text)}
                value={search}
                placeholder="Wyszukaj..."
            />
            <FlatList
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    )
}

