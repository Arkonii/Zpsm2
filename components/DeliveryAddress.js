import { FlatList, View, Text, TextInput, Button } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { TouchableOpacity } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import styles from '../config/styles';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DeliveryAddress({ route, navigation }) {
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber] = useState('');

    const [cart, setCart] = useState(0);

    useEffect(() => {
        if (route.params && route.params.cart) {
            setCart(route.params.cart);
        }
    }, [route.params]);

    const handleButtonPress = () => {
        if (city && street && houseNumber) {
            console.log('Button clicked');
            console.log('Miasto:', city);
            console.log('Ulica:', street);
            console.log('Numer domu / lokalu:', houseNumber);
            navigation.navigate('Płatność', { cart });
        } else {
            console.log('Nie wszystkie pola są uzupełnione!');
        }
    };

    return (
        <View style={styles.container2}>
            <View style={{ position: 'absolute', top: 10, right: 10 }}>
                <Text style={{ borderWidth: 1, borderColor: 'black', padding: 10 }}>{cart} zł </Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Miasto"
                    value={city}
                    onChangeText={text => setCity(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Ulica"
                    value={street}
                    onChangeText={text => setStreet(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Numer domu / lokalu"
                    value={houseNumber}
                    onChangeText={text => setHouseNumber(text)}
                />
            </View>
            <Button
                title="Przejdź do płatności"
                onPress={handleButtonPress}
            />
        </View>
    );
}