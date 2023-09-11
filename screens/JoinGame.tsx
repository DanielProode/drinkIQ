import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';

import Selection from './Selection';

export type JoinGameProps = {
  route: RouteProp<{
    JoinGame: {
      gameCode: number;
    }
  }>;
  navigation: NativeStackNavigationProp<any>;
};

export default function JoinGame({ route, navigation }: JoinGameProps) {
  const { gameCode } = route.params;
  
  return (
    <View style={styles.joinGameView}>
      <Selection gameCode={gameCode} navigation={navigation} hostGame={false} />
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
