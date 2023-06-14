import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { getData } from '../config/server';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import styles from '../config/styles';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Restaurants({ navigation }) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [cart, setCart] = useState(0);

    const resetCartFromAsyncStorage = async () => {
        try {
            const value = await AsyncStorage.getItem('cart');
            const value2 = await AsyncStorage.getItem('productsId');
            if (value !== null && value2!==null) {
                setCart(parseFloat(value));
            }
        } catch (error) {
            console.error('Error:', error);
        }
        try {
            await AsyncStorage.setItem('cart', '0');
            await AsyncStorage.setItem('productIds', JSON.stringify([]));
        } catch (error) {
            console.error('Error:', error);
        }
        console.log("czyszczenie");
    };

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

        resetCartFromAsyncStorage();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            resetCartFromAsyncStorage();
        }, [])
    );

    if (isLoading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    const buttonPress = (item) => {
        console.log(`Clicked button with id: ${item.id}`);
        navigation.navigate("Restaurant", { jsonItem: item });
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

    return (
        <View style={styles.root}>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10 }}
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
    );
}
