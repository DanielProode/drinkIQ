import { Dimensions, Pressable, StyleSheet, Text } from 'react-native';

import { AnswersArray } from './Card';
import { ANSWER_PREFIXES } from '../constants/general';
import { BACKGROUND_COLOR, GREY } from '../constants/styles/colors';
import { FONT_FAMILY_REGULAR, MEDIUM_FONT_SIZE } from '../constants/styles/typography';

interface AnswerButtonProps {
  answer: AnswersArray;
  answerIndex: number;
  isAnswered: boolean;
  answerStyle: any;
  textStyle: any;
  handleAnswerSelection: (answerIndex: number) => void;
};

const width = Dimensions.get('window').width;

export default function AnswerButton({ answer, answerIndex, isAnswered, answerStyle, textStyle, handleAnswerSelection }: AnswerButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [pressed && { opacity: 0.8 }, styles.button, answerStyle]}
      onPress={() => handleAnswerSelection(answerIndex)}
      disabled={isAnswered}>
      <Text style={[styles.text, textStyle]} adjustsFontSizeToFit numberOfLines={1}>{ANSWER_PREFIXES[answerIndex] + answer.text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    width: width / 1.4,
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
