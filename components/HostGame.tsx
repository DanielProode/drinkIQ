import React from 'react';
import { StyleSheet, View } from 'react-native';
import Selection from './Selection';
import { StackNavigationProp } from '@react-navigation/stack';

export type HostGameProps = {
    navigation: StackNavigationProp<any>;

};

const HostGame = ({ navigation }: HostGameProps) => {

  return (
    <View style={styles.joinGameView}>
        <Selection gameCode={0} navigation={navigation} hostGame={true}/>
        </View>

  );
};


const styles = StyleSheet.create({
    joinGameView: {
        alignItems: 'center',
        backgroundColor: '#1E1E1E',
        flex: 1,
    },
  });
export default HostGame;

