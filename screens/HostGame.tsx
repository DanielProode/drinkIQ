import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';

import Selection from './Selection';

export type HostGameProps = {
  navigation: NativeStackNavigationProp<any>;
};

export default function HostGame({ navigation }: HostGameProps) {

  return (
    <View style={styles.joinGameView}>
      <Selection gameCode={0} navigation={navigation} hostGame/>
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
