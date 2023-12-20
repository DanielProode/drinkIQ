import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';

import { SECONDARY_COLOR, BLACK, LIGHTGREY } from '../constants/styles/colors';
import { FONT_FAMILY_BOLD, REGULAR_FONT_SIZE } from '../constants/styles/typography';


const width = Dimensions.get('window').width;

let buttonWidth = 1.3;

let buttonColor = BLACK;

let buttonBrdrColor = SECONDARY_COLOR;

export default function Button({ text, onPress, disabled, marginTop, buttonWidthNumber, buttonBgColor, buttonBorderColor }: any) {

  if (buttonWidthNumber != null) buttonWidth = buttonWidthNumber;
  else buttonWidth = 1.3;

  if (buttonBgColor != null) {
    buttonColor = buttonBgColor;
  } else {
    buttonColor = BLACK;
  }

  if (buttonBorderColor != null) {
    buttonBrdrColor = buttonBorderColor;
  } else {
    buttonBrdrColor = SECONDARY_COLOR;
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
        <Text style={disabled ? {...styles.btnText, color: LIGHTGREY} : styles.btnText }> {text} </Text>
      </View>
    </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    borderColor: SECONDARY_COLOR,
    paddingVertical: 8,
    borderRadius: 15,
    borderWidth: 2,
    height: 70,
    justifyContent: 'center',
  },
  btnDisabledContainer: {
    backgroundColor: LIGHTGREY,
    borderColor: LIGHTGREY,
    paddingVertical: 8,
    borderRadius: 15,
    borderWidth: 2,
    height: 70,
    justifyContent: 'center',
  },
  btnText: {
    color: SECONDARY_COLOR,
    fontSize: REGULAR_FONT_SIZE,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontFamily: FONT_FAMILY_BOLD,
  },
});
