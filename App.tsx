import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Menu from './components/Menu';
import LoginPage from './components/LoginPage';
import Historique from './components/Historique';

const Stack = createStackNavigator();

export default function App() {
  return (
<NavigationContainer>  
      <Stack.Navigator screenOptions={{headerTransparent: true, headerTitle: 'Iplanting', headerTintColor: '#fff', headerPressOpacity:0.2}}
      initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Historique" component={Historique} />
      </Stack.Navigator> 
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}


