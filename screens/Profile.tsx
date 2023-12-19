import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, View, Text } from 'react-native';

import Button from '../components/Button';
import { WHITE, ORANGE, BACKGROUND_COLOR } from '../constants/styles/colors';
import { BIG_LOGO_FONT_SIZE, FONT_FAMILY_BOLD, FONT_FAMILY_REGULAR, HEADER_FONT_SIZE, LOGO_FONT_FAMILY_REGULAR, REGULAR_LOGO_FONT_SIZE } from '../constants/styles/typography';
import useUserStore from "../store/userStore";


interface ProfileProps {
  navigation: NativeStackNavigationProp<any>;
}

export default function Profile({ navigation }: ProfileProps) {

  const { username, games_won, total_drinks, total_points, packs_owned } = useUserStore();

  return (
    <View style={styles.profileView}>
      <Text style={styles.drinkIQLogo}>Drink<Text style={styles.drinkIQOrange}>IQ</Text></Text>
      <Text style={styles.profileNameText}>Nickname: {username}</Text>
      <View style={styles.profileData}>
        <View style={styles.row}>
          <View style={styles.rowElement}>
            <Text style={styles.numberText}>{games_won}</Text>
            <Text style={styles.descriptionText}>Games Won</Text>
          </View>
          <View style={styles.rowElement}>
            <Text style={styles.numberTextOrange}>0</Text>
            <Text style={styles.descriptionText}>Games Played</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.rowElement}>
            <Text style={styles.numberTextOrange}>{total_drinks}</Text>
            <Text style={styles.descriptionText}>Drinks taken</Text>
          </View>
          <View style={styles.rowElement}>
            <Text style={styles.numberText}>{total_points}</Text>
            <Text style={styles.descriptionText}>Total points</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.rowElement}>
            <Text style={styles.numberText}>0</Text>
            <Text style={styles.descriptionText}>Friends</Text>
          </View>
          <View style={styles.rowElement}>
            <Text style={styles.numberTextOrange}>{packs_owned.length}</Text>
            <Text style={styles.descriptionText}>Packs owned</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button marginTop={20} text="Settings" onPress={() => {
          navigation.navigate('Settings');
        }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileView: {
    backgroundColor: BACKGROUND_COLOR,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  drinkIQLogo: {
    color: WHITE,
    fontSize: REGULAR_LOGO_FONT_SIZE,
    fontFamily: LOGO_FONT_FAMILY_REGULAR,
    marginTop: 55,
    alignSelf: 'flex-start',
    marginLeft: 30,
    letterSpacing: 3,
  },
  drinkIQOrange: {
    color: ORANGE,
  },
  profileNameText: {
    fontSize: HEADER_FONT_SIZE,
    fontFamily: LOGO_FONT_FAMILY_REGULAR,
    color: WHITE,
    marginTop: 40,
    marginBottom: 20,
  },
  profileData: {
    width: '90%',
    marginTop: -40,
  },
  row: {
    marginTop: 40,
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    width: '90%',
    flexDirection: 'row',
  },
  rowElement: {
    flexDirection: 'column',
    width: 200,
  },
  numberTextOrange: {
    color: ORANGE,
    fontSize: BIG_LOGO_FONT_SIZE,
    fontFamily: FONT_FAMILY_BOLD,
    textAlign: 'center',
  },
  numberText: {
    color: WHITE,
    fontSize: BIG_LOGO_FONT_SIZE,
    fontFamily: FONT_FAMILY_BOLD,
    textAlign: 'center',
  },
  descriptionText: {
    color: WHITE,
    fontSize: HEADER_FONT_SIZE,
    fontFamily: FONT_FAMILY_REGULAR,
    textAlign: 'center',
  },
  buttonContainer: {
    marginBottom: 60,
  },

});
