import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';

const width = Dimensions.get('window').width;

export default function Button({ text, onPress, disabled, marginTop }: any): JSX.Element {
  return (
    <View style={{marginTop}}>
    <Pressable 
    style={({ pressed }) => [
      { opacity: pressed ? 0.5 : 1.0 }
    ]}
      onPress={onPress}
      disabled={disabled}>
      <View style={disabled ? styles.btnDisabledContainer : styles.btnContainer}>
        <Text style={styles.btnText}> {text} </Text>
      </View>
    </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    width: width / 1.3,
    borderRadius: 5,
  },
  btnDisabledContainer: {
    backgroundColor: '#FFFFFF50',
    paddingVertical: 8,
    width: width / 1.3,
    borderRadius: 5,
  },
  btnText: {
    color: '#1E1E1E',
    fontSize: 16,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontFamily: 'Basic',
  },
});
