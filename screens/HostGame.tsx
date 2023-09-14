import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Selection from './Selection';


export type HostGameProps = {
  navigation: NativeStackNavigationProp<any>;
};

export default function HostGame({ navigation }: HostGameProps) {

  const [newGameCode, setGameCode] = useState(0);

  const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// In the future, check if active game already exists with generated code

  const generateGameCode = () => {
    const generatedGameCode = randomInt(100000, 999999);
    setGameCode(generatedGameCode);
  };

  if (newGameCode === 0) {
    generateGameCode();
  }


  return (
    <View style={styles.joinGameView}>
      <Selection gameCode={newGameCode} navigation={navigation} hostGame/>
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
