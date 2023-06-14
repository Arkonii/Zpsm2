import { FlatList, View, Text, TextInput, Button } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { TouchableOpacity } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import styles from '../config/styles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

export default function Restaurant({ route, navigation }) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [cart, setCart] = useState(0);
    const [productId, setProductId] = useState([]);
    const [renderedItems, setRenderedItems] = useState([]);

    const { jsonItem } = route.params;

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

        const getCartFromAsyncStorage = async () => {
            try {
                const value = await AsyncStorage.getItem('cart');
                const value2 = await AsyncStorage.getItem('productIds');
                setProductId(JSON.parse(value2));
                const parsedValue = parseFloat(value);
                setCart(parsedValue || 0);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
        getCartFromAsyncStorage();
    }, [jsonItem.id]);

    useEffect(() => {
        const getRenderedItems = () => {
            const itemsToRender = productId.map((id, index) => ({
                ...data.find(item => item.id === id),
                key: `${id}-${index}`
            })).filter(item => item);
            setRenderedItems(itemsToRender);
        };

        getRenderedItems();
    }, [data, productId]);

    function remove(item) {
        const itemIndex = productId.findIndex(id => id === item.id);
        if (itemIndex !== -1) {
            const updatedProductIds = [...productId];
            updatedProductIds.splice(itemIndex, 1);
            setProductId(updatedProductIds);

            AsyncStorage.setItem('productIds', JSON.stringify(updatedProductIds))
                .then(() => {
                    console.log('productIds updated in AsyncStorage');
                })
                .catch(error => {
                    console.error('Error updating productIds in AsyncStorage:', error);
                });

            setCart(prevCart => {
                const newCart = (parseFloat(prevCart) - parseFloat(item.price)).toFixed(2);

                AsyncStorage.setItem('cart', newCart.toString())
                    .then(() => {
                        console.log('cart updated in AsyncStorage');
                    })
                    .catch(error => {
                        console.error('Error updating cart in AsyncStorage:', error);
                    });

                return newCart;
            });

            setRenderedItems(prevItems => prevItems.filter(prevItem => prevItem.id !== item.id));

            if (updatedProductIds.length === 0) {
                navigation.navigate('Restaurant', { jsonItem });
            }
        }
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
                    onPress={() => remove(item)}
                >
                    <Text style={styles.buttonText}>Usuń</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const filteredData = data.filter(
        item => item.description.toLowerCase().includes(search.toLowerCase())
            || item.body.toLowerCase().includes(search.toLowerCase())
            || item.price.toLowerCase().includes(search.toLowerCase())
    );

    const handleInProgressPress = () => {
        navigation.navigate('Dostawa', { cart });
        //console.log("in progress");
    };

    return (
        <View style={styles.root}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', margin: 10 }}>
                <Button title="Wybór dostawy" onPress={handleInProgressPress} />
                <Text >  </Text>
                <Text style={{ borderWidth: 1, borderColor: 'black', padding: 10 }}>{cart} zł </Text>
            </View>

            <FlatList
                data={renderedItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.key.toString()}
            />
        </View>
    );
}
