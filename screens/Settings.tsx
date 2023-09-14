import { StyleSheet, Text, View } from 'react-native';

import Button from '../components/Button';

export default function Settings(): JSX.Element {


  
  return (
    <View style={styles.settingsView}>
      <Button text="Profile" />
      <Button marginTop={20} text="Light Mode" />
      <Button marginTop={20} text="Language" />
      <Button marginTop={20} text="Notifications" />
      <Button marginTop={20} text="About" />
      <Button marginTop={20} text="Log Out" />
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
