import { FlatList, View, Text, TextInput, Button } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { TouchableOpacity } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import styles from '../config/styles';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Restaurant({ route, navigation }) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [cart, setCart] = useState(0);
    const [productId, setProductId] = useState([]);

    const { jsonItem } = route.params;

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:3001/dishes?restaurantId=${jsonItem.id}`);
            const json = await response.json();
            setData(json);
            navigation.setOptions({
                title: jsonItem.title,
            });
            setIsLoading(false);
        } catch (error) {
            console.error('Error:', error);
        }
    }, [jsonItem.id]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/dishes?restaurantId=${jsonItem.id}`);
                const json = await response.json();
                setData(json);
                navigation.setOptions({
                    title: jsonItem.title,
                });
                setIsLoading(false);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();

        const getCartFromAsyncStorage = async () => {
            try {
                const value = await AsyncStorage.getItem('cart');
                const value2 = await AsyncStorage.getItem('productIds');
                if (value !== null && value2 !== null) {
                    setCart(parseFloat(value));
                    setProductId(JSON.parse(value2));
                   // console.log(value2);
                   // console.log(productId);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        const unsubscribe = navigation.addListener('focus', () => {
            getCartFromAsyncStorage();
        });

        return unsubscribe;
    }, [navigation, jsonItem.id]);

    function add(item) {
        setCart((parseFloat(cart) + parseFloat(item.price)).toFixed(2));
        setProductId([...productId, item.id]);
    }

    const renderItem = ({ item }) => {
        return (
            <View style={styles.container}>
                <Text style={styles.author}>{item.body}</Text>
                <Text style={styles.content}>{item.description}</Text>
                <Text style={styles.priceText}>{item.price ? item.price : 'Brak ceny'}</Text>
                <Text style={styles.priceText}>{" zł "}</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => add(item)}
                >
                    <Text style={styles.buttonText}>Dodaj</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const filteredData = data.filter(
        item => item.description.toLowerCase().includes(search.toLowerCase())
            || item.body.toLowerCase().includes(search.toLowerCase()) || item.price.toLowerCase().includes(search.toLowerCase())
    );

    const goToShoppingCart = async () => {
        if(cart!=0) {
            try {
                await AsyncStorage.setItem('cart', cart.toString());
                await AsyncStorage.setItem('productIds',JSON.stringify(productId));
                console.log(await AsyncStorage.getItem('productIds'));
                console.log(productId);
                navigation.navigate('Koszyk',{ jsonItem });

            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [fetchData])
    );

    return (
        <View style={styles.root}>
            <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, flex: 1, marginRight: 10 }}
                    onChangeText={text => setSearch(text)}
                    value={search}
                    placeholder="Wyszukaj..."
                />
                <Button title="Koszyk" onPress={goToShoppingCart} />
                <Text >  </Text>
                <Text style={{ borderWidth: 1, borderColor: 'black', padding: 10 }}>{cart} zł </Text>
            </View>
            <FlatList
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
}
