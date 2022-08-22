/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/screens/LoginScreen';
import PlayerScreen from './src/screens/PlayerScreen';
import LeagueScreen from './src/screens/LeagueScreen';

let ScreenHeight = Dimensions.get("window").height;
const Stack = createNativeStackNavigator();


function App() {

return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Home" component={LoginScreen}/>
        <Stack.Screen name="PlayerScreen" component={PlayerScreen}/>
        <Stack.Screen name="LeagueScreen" component={LeagueScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  bgColor: {
    backgroundColor: '#37003c',
    height: ScreenHeight
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
