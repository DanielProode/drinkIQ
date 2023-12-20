import { Dimensions, Pressable, StyleSheet, Text } from 'react-native';

import { BACKGROUND_COLOR, GREY, SECONDARY_COLOR } from '../constants/styles/colors';
import { FONT_FAMILY_REGULAR, MEDIUM_FONT_SIZE } from '../constants/styles/typography';

interface AnswerButtonProps {
  text: string;
  onPress: () => void;
  isAnswered: boolean;
  style: any;
  textStyle: any;
};

const width = Dimensions.get('window').width;

export default function AnswerButton({ text, onPress, isAnswered, style, textStyle }: AnswerButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [pressed && { opacity: 0.8 }, styles.button, style]}
      onPress={onPress}
      disabled={isAnswered}>
      <Text style={[styles.text, textStyle]} adjustsFontSizeToFit numberOfLines={1}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: SECONDARY_COLOR,
    justifyContent: 'center',
    width: width / 1.7,
    height: 50,
    borderRadius: 5,
    borderColor: GREY,
    borderWidth: 1,
    marginTop: 10,
  },
  text: {
    color: BACKGROUND_COLOR,
    fontSize: MEDIUM_FONT_SIZE,
    textAlign: 'left',
    paddingLeft: 10,
    fontFamily: FONT_FAMILY_REGULAR,
  },
});
