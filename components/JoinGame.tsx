import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Selection from './Selection';

export type JoinGameProps = {
    route: RouteProp<{ JoinGame: {  gameCode: number;
                                    }}>;
    navigation: StackNavigationProp<any>;

};

const JoinGame = ({ route, navigation }: JoinGameProps) => {
    const { gameCode } = route.params;
    return (
        <View style={styles.joinGameView}>
            <Selection gameCode={gameCode} navigation={navigation} hostGame={false}/>
        </View>

  );
};


const styles = StyleSheet.create({
    joinGameView: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#1E1E1E',
    },
  });
export default JoinGame;
