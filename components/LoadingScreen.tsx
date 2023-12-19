import React from 'react'
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';

import { BACKGROUND_COLOR, WHITE } from '../constants/styles/colors';
import { HEADER_FONT_SIZE } from '../constants/styles/typography';

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
    backgroundColor: BACKGROUND_COLOR
  },
  loadingText: {
    marginTop: 40,
    fontSize: HEADER_FONT_SIZE,
    color: WHITE,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
});