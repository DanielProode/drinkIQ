import { useState } from 'react';
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native';
import AnswerButton from './AnswerButton';

import Button from './Button';

export default function Card(props: { visibility: any, questionElement: any }){

  const { visibility, questionElement } = props;

  const answersArray = [questionElement.answer1, questionElement.answer2, questionElement.answer3, questionElement.answer4];

  const correct = questionElement.correct;

  const [ answered, setAnswered ] = useState(false);

  const [ answerCorrectness , setAnswerCorrectness ] = useState(Boolean);



  interface Answers {
    answer1: string,
    answer2: string,
    answer3: string,
    answer4: string,
  }
  
  interface ShowAnswersProps {
    answersArray: Answers[];
  }

  const checkAnswer = (answer: number) => {

    answer += 1;
    if (answer === correct) {
        return true;
    } else {
        return false;
          }
  };


  const ShowButtons = ({ answersArray }: ShowAnswersProps) => {
    return (
      <>
        {answersArray.map((answer, index) => {
          return (
            <AnswerButton
              marginTop={20}
              text={answer}
              key={index}
              correct={checkAnswer(index)}
              answered={answered}
              onPress={() => {
                setAnswered(true);
                setAnswerCorrectness(checkAnswer(index));
              }}
            />
          );
        })}
      </>
    );
  };    

  return (
    <View style={styles.backgroundBlur}>
    <View style={styles.cardView}>

        

        <Text style={styles.questionText}>{questionElement.question}</Text>

        <View style={styles.buttonView}>
        <ShowButtons answersArray={answersArray} />
        
        



</View>


    </View>

    <View style={styles.nextButtonContainer}>

   

    { answered ? <Button text={"NEXT CARD"} marginTop={20} onPress={() => visibility(false)} />: 
        
        <></>
        
        }

        { answered && answerCorrectness ? 
        <Text style={styles.answerResult}>Answer was correct!</Text>
      
      : 
      <></>
      }

        { answered && !answerCorrectness ? 
        <Text style={styles.answerResult}>Answer was incorrect!</Text>
      
      : 
      <></>
      }
    </View>

    </View>

    
  );
}

const styles = StyleSheet.create({
  cardView: {
    position: 'absolute',
    alignItems: 'center',
    alignSelf: 'center',
    top: 150, bottom: 150,
    marginTop: 20,
    width: '85%',
    zIndex: 1,
    headerBackVisible: false,
    backgroundColor: 'grey',
    justifyContent: 'space-between',
    borderRadius: 20,
  },
  backgroundBlur: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
    backgroundColor: '#00000099',
  },
  background: {
    position: 'absolute',
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 20,
  },
  questionText: {
    marginTop: 130,
    fontSize: 30,
    fontFamily: 'Basic',
    textAlign: 'center',
  },
  nextButtonContainer: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 200,
    zIndex: 2,
  },
  buttonView: {
    marginBottom: 20,
  },
  answerResult: {
    alignSelf: 'center',
    fontFamily: 'Basic',
    fontSize: 20,
    marginTop: 10,
  },
});
