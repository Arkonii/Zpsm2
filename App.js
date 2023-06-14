import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Restaurants from './components/Restaurants';
import Restaurant from './components/Restaurant';
import ShoppingCart from './components/ShoppingCart';
import Delivery from './components/Delivery';
import DeliveryAddress from './components/DeliveryAddress';
import Payment from './components/Payment';



const Stack = createStackNavigator();

export default function App() {

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Restaurants">
            <Stack.Screen name="Restauracje" component={Restaurants} />
            <Stack.Screen name="Restaurant" component={Restaurant} />
            <Stack.Screen name="Koszyk" component={ShoppingCart} />
            <Stack.Screen name="Dostawa" component={Delivery} />
            <Stack.Screen name="Dostawa na adres" component={DeliveryAddress} />
            <Stack.Screen name="Płatność" component={Payment} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

