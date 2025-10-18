import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Login from "./src/auth/login";
import Register from "./src/auth/register";
import Home from "./src/tabs/HomeScreen";
import { AlertNotificationRoot } from 'react-native-alert-notification';
import BottomNavigator from './src/components/BottomNavigation';


const Stack = createStackNavigator();

export default function App() {
  return (
    <AlertNotificationRoot>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown: true }} />
         <Stack.Screen 
            name="Tabs" 
            component={BottomNavigator} 
            options={({ route }) => {
              const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
              let title = 'Inicio';
              if (routeName === 'Ajustes') {
                title = 'Ajustes';
              }
              return {
                headerShown: true,
                headerLeft: null,
                title,
                headerTintColor: "#fff",
                headerStyle: { backgroundColor: "#5ec206ff" },
              };
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>   
    </AlertNotificationRoot>
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
