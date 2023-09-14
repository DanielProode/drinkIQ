import { useState } from 'react';
import { Image, StyleSheet, Switch, Text, View } from 'react-native';
import Button from '../components/Button';
import ToggleSwitch from '../components/ToggleSwitch';

export default function Settings(): JSX.Element {

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  
  return (
    <View style={styles.profileView}>
      <Button text="Profile" />
      <Button marginTop={20} text="Light Mode" />

      <ToggleSwitch marginTop={20} text={"Appearance"}></ToggleSwitch>

      <Button marginTop={20} text="Language" />
      <Button marginTop={20} text="Notifications" />
      <Button marginTop={20} text="About" />
      <Button marginTop={20} text="Log Out" />
      <Text>Welcome to the profile page!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  settingsButton: {
    marginTop: 20,
  },
  switchContainer: {
    flexDirection: 'row',
  },
  appearanceText: {
    color: 'white',
    justifyContent: 'center',
  },
  profileView: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
