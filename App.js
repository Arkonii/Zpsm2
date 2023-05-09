import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Restaurants from './components/Restaurants';
import Restaurant from './components/Restaurant';


const Stack = createStackNavigator();

export default function App() {

    fetch('http://localhost:3001', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }})
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Restaurants">
          <Stack.Screen name="Restauracje" component={Restaurants} />
            <Stack.Screen name="Restaurant" component={Restaurant} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
