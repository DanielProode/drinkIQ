import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';

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
      <Button text="Profile" onPress={() => navigation.navigate('Profile')} />
      <Button marginTop={20} text="Light Mode" />
      <Button marginTop={20} text="Language" />
      <Button marginTop={20} text="Notifications" />
      <Button marginTop={20} text="About" />
      <Button marginTop={20} text="Log Out" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  settingsView: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
