import { Dimensions, Pressable, StyleSheet, Text } from 'react-native';

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
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    width: width / 1.7,
    height: 50,
    borderRadius: 5,
    borderColor: '#D3D3D3',
    borderWidth: 1,
    marginTop: 10,
  },
  text: {
    color: '#1E1E1E',
    fontSize: 16,
    textAlign: 'left',
    paddingLeft: 10,
    fontFamily: 'JosefinSans-Regular',
  },
});
