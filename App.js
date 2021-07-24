import { StatusBar } from 'expo-status-bar';
import LibScreen from './screens-test/LibScreen';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {colors} from './lib/colors';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{ color: colors.primaryOff }}>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <LibScreen />
    </View>
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
