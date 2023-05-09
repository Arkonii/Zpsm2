import {FlatList, View, Text, StyleSheet,TextInput,Button} from "react-native";
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import styles from '../config/styles';



export default function Restaurant({ route, navigation }) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');

    //const id = route.params.id;
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
        fetchData();
    }, [jsonItem.id]);

    const renderItem = ({ item }) => {
        return (
            <View style={styles.container}>
                <Text style={styles.author}>{item.body}</Text>
                <Text style={styles.content}>{item.description}</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => console.log(item.body)}
                >
                    <Text style={styles.buttonText}>Dodaj</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const filteredData = data.filter(
        item => item.description.toLowerCase().includes(search.toLowerCase())
            || item.body.toLowerCase().includes(search.toLowerCase())
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
                <Text style={{borderWidth: 1, borderColor: 'black', padding: 10}}> 0.00 zł</Text>
                <Button title="Koszyk"  />
            </View>
            <FlatList
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
}



