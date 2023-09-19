import { StyleSheet, Text, View } from 'react-native';

import Button from '../components/Button';
import { useAuth } from '../context/authContext';

export default function Settings(): JSX.Element {
  const { logOut } = useAuth();

  const handleLogout = async () => {
    try {
      const response = await logOut();
      console.log(response)
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.settingsView}>
      <Button text="Profile" />
      <Button marginTop={20} text="Light Mode" />
      <Button marginTop={20} text="Language" />
      <Button marginTop={20} text="Notifications" />
      <Button marginTop={20} text="About" />
      <Button marginTop={20} text="Log Out" onPress={handleLogout} />
      <Text>Welcome to the profile page!</Text>
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
