import { FlatList, View, Text, TextInput, Button } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { TouchableOpacity } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import styles from '../config/styles';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Payment({ route, navigation }) {
    const [cart, setCart] = useState(0);
    //const cart = route.params;

    useEffect(() => {
        if (route.params && route.params.cart) {
            setCart(route.params.cart);
        }
    }, [route.params]);
    const handleButtonPress1 = () => {
        navigation.navigate('Restauracje');
    };

    return (
        <View style={styles.container2}>
            <View style={{ position: 'absolute', top: 10, right: 10 }}>
                <Text style={{ borderWidth: 1, borderColor: 'black', padding: 10 }}>{cart} zł </Text>
            </View>
            <Button
                title="Płatność gotówką"
                onPress={handleButtonPress1}
            />
            <View style={styles.buttonSpacer} />
            <Button
                title="Płatność kartą"
                onPress={handleButtonPress1}
            />
        </View>
    );
}