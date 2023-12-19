import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, View, Text } from 'react-native';

import Button from '../components/Button';
import { BACKGROUND_COLOR, ORANGE, WHITE } from '../constants/styles/colors';
import { LOGO_FONT_FAMILY_REGULAR, REGULAR_LOGO_FONT_SIZE } from '../constants/styles/typography';
import { useAuth } from '../context/authContext';


interface SettingsProps {
  navigation: NativeStackNavigationProp<any>;
}

export default function Settings({ navigation }: SettingsProps ) {
  const { logOut } = useAuth();

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.settingsView}>
      <Text style={styles.drinkIQLogo}>Drink<Text style={styles.drinkIQOrange}>IQ</Text></Text>
      <View style={styles.buttonContainer}>
        <Button marginTop={20} text="Clear cache [TESTING]" onPress={() => AsyncStorage.clear()} />
        <Button marginTop={20} text="Log out" onPress={handleLogout}  />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  settingsView: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: 'center',
  },
  drinkIQLogo: {
    fontFamily: LOGO_FONT_FAMILY_REGULAR,
    marginTop: 55,
    alignSelf: 'flex-start',
    marginLeft: 30,
    fontSize: REGULAR_LOGO_FONT_SIZE,
    color: WHITE,
    letterSpacing: 3,
    },
  buttonContainer: {
    justifyContent: 'center',
    flex: 1,
    },
  drinkIQOrange: {
    color: ORANGE,
    },
});