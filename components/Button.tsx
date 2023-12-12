import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';

const width = Dimensions.get('window').width;

let buttonWidth = 1.3;

let buttonColor = '#000000';

let buttonBrdrColor = '#FFFFFF';

export default function Button({ text, onPress, disabled, marginTop, buttonWidthNumber, buttonBgColor, buttonBorderColor }: any) {

  if (buttonWidthNumber != null) buttonWidth = buttonWidthNumber;
  else buttonWidth = 1.3;

  if (buttonBgColor != null) {
    buttonColor = buttonBgColor;
  } else {
    buttonColor = '#000000';
  }

  if (buttonBorderColor != null) {
    buttonBrdrColor = buttonBorderColor;
  } else {
    buttonBrdrColor = '#FFFFFF';
  }
  

  return (
    <View style={{marginTop}}>
    <Pressable 
    style={({ pressed }) => [
      { opacity: pressed ? 0.5 : 1.0 }
    ]}
      onPress={onPress}
      disabled={disabled}>
      <View style={disabled ? {...styles.btnDisabledContainer, width: width / buttonWidth} : {...styles.btnContainer, width: width / buttonWidth, backgroundColor: buttonColor, borderColor: buttonBrdrColor}}>
        <Text style={disabled ? {...styles.btnText, color: '#FFFFFF30'} : styles.btnText }> {text} </Text>
      </View>
    </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    paddingVertical: 8,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    height: 70,
    justifyContent: 'center',
  },
  btnDisabledContainer: {
    backgroundColor: '#FFFFFF30',
    borderColor: '#FFFFFF30',
    paddingVertical: 8,
    borderRadius: 15,
    borderWidth: 2,
    height: 70,
    justifyContent: 'center',
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 18,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontFamily: 'JosefinSans-Bold',
  },
});
