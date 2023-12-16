import React from 'react'
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';

export default function LoadingScreen() {
  return (
    <View style={[styles.container]}>
      <ActivityIndicator size="large" color="white" />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#1E1E1E'
  },
  loadingText: {
    marginTop: 40,
    fontSize: 20,
    color: 'white',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
});