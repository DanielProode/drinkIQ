import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, View, Text } from 'react-native';

import Button from '../components/Button';
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
        <Button marginTop={20} text="Log out" onPress={handleLogout}  />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  settingsView: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
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
  buttonContainer: {
    },
  drinkIQOrange: {
    color: '#F76D31',
    },

});
