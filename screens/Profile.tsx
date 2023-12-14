import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, View, Text } from 'react-native';

import Button from '../components/Button';
import useUserStore from "../store/userStore";


interface ProfileProps {
  navigation: NativeStackNavigationProp<any>;
}

export default function Profile({ navigation }: ProfileProps ) {

  const { username, games_won, total_drinks, total_points, packs_owned } = useUserStore();

  return (
    <View style={styles.profileView}>
      <Text style={styles.drinkIQLogo}>Drink<Text style={styles.drinkIQOrange}>IQ</Text></Text>
      <Text style={styles.profileNameText}>Nickname: {username}</Text>
      <View style={styles.profileData}>
        <View style={styles.row}>
          <View style={styles.gamesWon}>
            <Text style={styles.numberText}>{games_won}</Text>
            <Text style={styles.descriptionText}>Games Won</Text>
          </View>
          <View style={styles.gamesWon}>
            <Text style={styles.numberTextOrange}>0</Text>
            <Text style={styles.descriptionText}>Games Played</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.gamesWon}>
            <Text style={styles.numberTextOrange}>{total_drinks}</Text>
            <Text style={styles.descriptionText}>Drinks taken</Text>
          </View>
          <View style={styles.gamesWon}>
            <Text style={styles.numberText}>{total_points}</Text>
            <Text style={styles.descriptionText}>Total points</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.gamesWon}>
            <Text style={styles.numberText}>0</Text>
            <Text style={styles.descriptionText}>Friends</Text>
          </View>
          <View style={styles.gamesWon}>
            <Text style={styles.numberTextOrange}>{packs_owned.length}</Text>
            <Text style={styles.descriptionText}>Packs owned</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button marginTop={20} text="Settings" onPress={() => {
            navigation.navigate('Settings');}}  />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileView: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  drinkIQLogo: {
    fontFamily: 'JetbrainsMono-Bold',
    marginTop: 55,
    alignSelf: 'flex-start',
    marginLeft: 30,
    fontSize: 30,
    color: '#F2F2F2',
    letterSpacing: 3,
    },
  drinkIQOrange: {
    color: '#F76D31',
    },
  profileNameText: {
    fontFamily: 'JetbrainsMono-Bold',
    color: 'white',
    marginTop: 40,
    fontSize: 28,
    },
  profileData: {
    width: '100%',
    marginTop: -40,
    },
    row: {
    marginTop: 60,
    justifyContent: 'space-around',
    alignSelf: 'center',
    width: '90%',
    flexDirection: 'row',
    alignContent: 'center',
    },
  gamesWon: {
    flexDirection: 'column',
    width: 200,
    height: 80,
  },
  numberText: {
    fontSize: 70,
    fontFamily: 'JosefinSans-Bold',
    color: 'white',
    textAlign: 'center',
  },
  numberTextOrange: {
    fontSize: 70,
    fontFamily: 'JosefinSans-Bold',
    color: '#F76D31',
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 20,
    fontFamily: 'JosefinSans-Regular',
    color: 'white',
    textAlign: 'center',
  },
  buttonContainer: {
    marginBottom: 60,
  },

});
