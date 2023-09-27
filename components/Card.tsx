import { useState } from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View, Image } from 'react-native';

import AnswerButton from './AnswerButton';

export default function Card(props: { visibility: any, questionElement: any, avatar: any, drink: any }){

  const { visibility, questionElement, avatar, drink } = props;

  const answersArray = [questionElement.answer1, questionElement.answer2, questionElement.answer3, questionElement.answer4];

  const correct = questionElement.correct;

  const [ answered, setAnswered ] = useState(false);

  const [ buttonPressed, setButtonPressed ] = useState(false);

  const [ answerCorrectness , setAnswerCorrectness ] = useState(Boolean);

  const prefixes = ["a. ", "b. ", "c. ", "d. "];

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
          const text = prefixes[index] + answer
          
          return (
            <AnswerButton
              marginTop={10}
              text={text}
              key={index}
              buttonPressed={buttonPressed}
              correct={checkAnswer(index)}
              answered={answered}
              onPress={() => {
                setButtonPressed(true);
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
        <ImageBackground source={require('../assets/images/estonian_background.jpg')} resizeMode="cover" style={styles.image}>
        <View style={styles.avatarView}>
          <Image style={styles.avatarImage} source={avatar}></Image>
        </View>
        
        <View style={styles.questionBox}>


          <Text style={styles.questionText}>{answered ? 
            
          answerCorrectness ? "Choose who has to drink!" : "You drink!"

          :

          questionElement.question
          
          }</Text>
        </View>
        
      <View style={styles.buttonView}>
        <ShowButtons answersArray={answersArray} />
      </View>

      <View style={styles.nextButtonContainer}>

        { answered ? 
          <Pressable style={({ pressed }) => [
            { opacity: pressed ? 0.5 : 1.0 }, styles.nextButton
          ]}
                    onPress={() => visibility(false)}>
            <Text style={styles.nextButtonText}>{'-->'}</Text>
          </Pressable>

        :
            <></>
            }
      </View>

        </ImageBackground>
    </View>

    { answered && answerCorrectness ? 
        <View style={styles.statusCircle}>
          <Image style={styles.correctImage} source={require('../assets/images/correct.png')} />
        </View>
      : 
      <></>
      }

        { answered && !answerCorrectness ? 
        <View style={styles.statusCircle}>
          <Image style={styles.wrongImage} source={require('../assets/images/wrong.png')} />
        </View>
      
      : 
      <></>
      }



    </View>

    
  );
}

const styles = StyleSheet.create({
  cardView: {
    position: 'absolute',
    alignSelf: 'center',
    top: 120, bottom: 150,
    marginTop: 20,
    width: '85%',
    zIndex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    borderRadius: 20,
    borderColor: 'white',
    borderWidth: 10,
  },
  questionBox: {
    marginTop: 80,
    width: 280,
    height: 140,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 20,
    borderColor: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  avatarView: {
    position: 'absolute',
    zIndex: 3,
    marginTop: 50,
    backgroundColor: 'white',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: '#3395EF',
    borderWidth: 3,
  },
  avatarImage: {
    flex: 1,
    resizeMode: 'contain',
    width: '70%',
    height: '70%',
    alignSelf: 'center',
  },
  backgroundBlur: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
    backgroundColor: '#00000099',
  },
  image: {
    flex: 1,
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
    fontSize: 24,
    fontFamily: 'Basic',
    textAlign: 'left',
  },
  nextButtonContainer: {
    alignSelf: 'flex-end',
    marginTop: 5,
    marginRight: 10,
    width: 50,
    height: 50,
    justifyContent: 'center',
    zIndex: 2,
  },
  nextButton: {
    backgroundColor: 'white',
    borderColor: '#D3D3D3',
    flex: 1,
    borderWidth: 1,
    borderRadius: 50,
  },
  nextButtonText: {
    fontFamily: 'Basic',
    fontSize: 30,
  },
  buttonView: {
    marginTop: 20,
    alignSelf: 'center',
  },
  answerResult: {
    alignSelf: 'center',
    fontFamily: 'Basic',
    marginTop: 200,
    fontSize: 20,
    color: 'red',
    zIndex: 3,
  },
  statusCircle: {
    flex: 1,
    position: 'absolute',
    marginTop: 160,
    zIndex: 3,
    width: 130,
    height: 130,
    alignSelf: 'center',
    justifyContent: 'flex-start',
  },
  correctImage: {
    flex: 1,
    resizeMode: 'contain',
    width: '80%',
    height: '80%',
    alignSelf: 'center',
  },
  wrongImage: {
    flex: 1,
    resizeMode: 'contain',
    width: '80%',
    height: '80%',
    alignSelf: 'center',
  },
});
