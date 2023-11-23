
import { useEffect } from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';

import { useAuth } from '../context/authContext';
import useUserStore from '../store/userStore';

export default function Profile() {
  const { listenToUserData } = useAuth();
  const { username, games_won, total_points, total_drinks, packs_owned } = useUserStore();
  const editImage = require('../assets/images/edit_button.png');

  useEffect(() => {
    const unsubscribe = listenToUserData();
    return () => unsubscribe();
  }, [])

  return (
    <View style={styles.profileView}>
      <View style={styles.logoView}>
        <Text style={styles.drinkIQLogo}>DRINKIQ</Text>
      </View>
      <View style={styles.textView}>
        <View style={styles.textRow}>
          <Text style={styles.text}>Username: </Text>
          <Pressable style={({ pressed }) => [
            { opacity: pressed ? 0.5 : 1.0 }
          ]}>
            <Text style={styles.text}>{username} <Image style={styles.edit} source={editImage} /></Text>
          </Pressable>
        </View>

        <View style={styles.textRow}>
          <Text style={styles.text}>Games won: </Text>
          <Text style={styles.text}>{games_won}</Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.text}>Total points: </Text>
          <Text style={styles.text}>{total_points}</Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.text}>Total drinks: </Text>
          <Text style={styles.text}>{total_drinks}</Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.text}>Packs owned: </Text>
          <Text style={styles.text}>{packs_owned}</Text>
        </View>



      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  profileView: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoView: {
    alignContent: 'center',
    flex: 1,
  },
  drinkIQLogo: {
    fontFamily: 'Knewave',
    marginTop: 50,
    fontSize: 30,
    color: 'white',
  },
  textView: {
    flex: 2,
  },
  textRow: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  edit: {
    width: 25,
    height: 25,
  },
  text: {
    marginBottom: 20,
    fontFamily: 'Basic',
    fontSize: 24,
    color: 'white',
  },
});
