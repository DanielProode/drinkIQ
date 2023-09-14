import { useState } from 'react';
import { Dimensions, Pressable, StyleSheet, Switch, Text, View } from 'react-native';

const width = Dimensions.get('window').width;

export default function Button({ text, marginTop }: any) {

    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);


    
  return (
    <View style={{marginTop}}>
    <Pressable 
      onPress={toggleSwitch}>
      <View style={styles.btnContainer}>
        <Text style={styles.btnText}> {text} </Text>

        <Switch
        style={styles.switchButton}
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      
      </View>
    </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    paddingVertical: 8,
    width: width / 1.3,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchButton: {
    right: 5,
    position: 'absolute',
  },
  btnText: {
    color: '#1E1E1E',
    fontSize: 16,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontFamily: 'Basic',
    
  },
});
