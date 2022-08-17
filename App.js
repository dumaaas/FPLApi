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

import LoginScreen from './src/screens/LoginScreen';
let ScreenHeight = Dimensions.get("window").height;


function App() {

return (
      <SafeAreaView style={styles.bgColor}>
        <StatusBar barStyle={'dark-content'} />
        <ScrollView>
            <LoginScreen/>
        </ScrollView>
      </SafeAreaView>
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
