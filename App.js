import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from "./src/auth/login";
import Register from "./src/auth/register";
import Home from "./src/tabs/HomeScreen";


const Stack = createStackNavigator();

export default function App() {
  return (
     <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown: true }} />
          <Stack.Screen name="Home" component={Home} options={{ title: "Inicio", headerShown: true, headerLeft: null, headerTintColor: "#fff", headerStyle: {backgroundColor: "#5ec206ff"} }} />
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
