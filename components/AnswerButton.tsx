import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';

const width = Dimensions.get('window').width;

export default function AnswerButton({ text, onPress, marginTop, correct, answered, buttonPressed }: any) {
  console.log(buttonPressed);
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

        buttonPressed ? 
        <View style={correct ? styles.correctAnswer : styles.wrongAnswer}>
          <Text style={correct ? styles.btnTextCorrect : styles.btnTextWrong}> {text} </Text>
        </View>

      :

        <View style={styles.answer}>
          <Text style={correct ? styles.btnTextCorrect : styles.btnTextWrong}> {text} </Text>
        </View>
      :
        <View style={styles.answer}>
          <Text style={styles.btnTextCorrect}> {text} </Text>
        </View>

    }
      
    </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  correctAnswer: {
    backgroundColor: '#3DD53A',
    justifyContent: 'center',
    width: width / 1.7,
    height: 50,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,

  },
  wrongAnswer: {
    backgroundColor: '#F07070',
    justifyContent: 'center',
    width: width / 1.7,
    height: 50,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
  },
  answer: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    width: width / 1.7,
    height: 50,
    borderRadius: 5, 
    borderColor: '#D3D3D3',
    borderWidth: 1,
  },
  btnTextCorrect: {
    color: '#1E1E1E',
    fontSize: 16,
    textTransform: 'uppercase',
    textAlign: 'left',
    paddingLeft: 10,
    fontFamily: 'Basic',
  },
  btnTextWrong: {
    color: '#1E1E1E50',
    fontSize: 16,
    textTransform: 'uppercase',
    textAlign: 'left',
    paddingLeft: 10,
    fontFamily: 'Basic',
  },
});
