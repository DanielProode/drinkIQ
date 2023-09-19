import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';

const width = Dimensions.get('window').width;

export default function AnswerButton({ text, onPress, marginTop, correct, answered }: any) {
  return (
    <View style={{marginTop}}>
    <Pressable 
    style={({ pressed }) => [
      { opacity: pressed ? 0.5 : 1.0 }
    ]}
      onPress={onPress}
      disabled={answered}>
        { 
        answered ? 

        <View style={correct ? styles.correctAnswer : styles.wrongAnswer}>
        <Text style={styles.btnText}> {text} </Text>
      </View>

      :

      <View style={styles.answer}>
      <Text style={styles.btnText}> {text} </Text>
    </View>

    }
      
    </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  correctAnswer: {
    backgroundColor: 'green',
    paddingVertical: 8,
    width: width / 1.3,
    borderRadius: 5,
  },
  wrongAnswer: {
    backgroundColor: 'red',
    paddingVertical: 8,
    width: width / 1.3,
    borderRadius: 5,
  },
  answer: {
    backgroundColor: '#FFFFFF',
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
