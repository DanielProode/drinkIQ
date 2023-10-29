import { useState } from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View, Image } from 'react-native';

import AnswerButton from './AnswerButton';
import { QuestionsArray } from './CardStack';
import { useGame } from '../context/gameContext';

interface CardProps {
  onClose: () => void;
  handlePoints: (answerState: boolean) => void;
  questionElement: QuestionsArray;
};

export default function Card({ onClose, handlePoints, questionElement }: CardProps) {
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const correctAnswerIndex = questionElement.answers.findIndex((answer) => answer.isCorrect);
  const prefixes = ["a. ", "b. ", "c. ", "d. "];
  const { avatar } = useGame();

  const handleAnswerSelection = (answerIndex: number) => {
    if (!isAnswered) {
      setSelectedAnswerIndex(answerIndex);
    };

    const selectedAnswer = questionElement.answers[answerIndex];

    if (!selectedAnswer.isCorrect) {
      setIsAnswerCorrect(false);
      handlePoints(false);
    } else {
      setIsAnswerCorrect(true);
      handlePoints(true);
    };
    setIsAnswered(true);
  };

  const renderAnswers = () => {
    return questionElement.answers.map((answer, answerIndex) => {
      const isSelected = answerIndex === selectedAnswerIndex;
      const isCorrect = answerIndex === correctAnswerIndex;
      const answerStyle = [
        isSelected && (isCorrect ? { backgroundColor: '#A0E595' } : { backgroundColor: '#F07070' }),
        isAnswered && !isSelected && answer.isCorrect && { backgroundColor: '#A0E595' },
      ];
      const textStyle = [
        !isCorrect && isAnswered && { color: '#00000050' }
      ];
      return (
        <AnswerButton
          key={answerIndex}
          isAnswered={isAnswered}
          text={prefixes[answerIndex] + answer.text}
          style={answerStyle}
          textStyle={textStyle}
          onPress={() => { 
            handleAnswerSelection(answerIndex);
            setIsAnswered(true);
          }}
        />
      );
    });
  };

  return (
    <View style={styles.backgroundBlur}>
      <View style={styles.cardView}>
        <ImageBackground source={require('../assets/images/estonian_background.jpg')} resizeMode="cover" style={styles.image}>
          <View style={styles.avatarView}>
            <Image style={styles.avatarImage} source={avatar} />
          </View>
          <View style={styles.questionBox}>
            <Text style={styles.questionText}>
              {isAnswered && (isAnswerCorrect ? "Choose who has to drink!" : "You drink!")}
              {!isAnswered && questionElement.question}
            </Text>
          </View>
          <View style={styles.buttonView}>
            {renderAnswers()}
          </View>
          <View style={styles.nextButtonContainer}>
            {isAnswered &&
              <Pressable
                style={({ pressed }) => [
                  { opacity: pressed ? 0.5 : 1.0 },
                  styles.nextButton,
                ]}
                onPress={onClose}
              >
                <Text style={styles.nextButtonText}>→</Text>
              </Pressable>}
          </View>
        </ImageBackground>
      </View>
      {isAnswered && (
        <View style={styles.statusCircle}>
          {isAnswerCorrect ? (
            <Image style={styles.correctImage} source={require('../assets/images/correct.png')} />
          ) : (
            <Image style={styles.wrongImage} source={require('../assets/images/wrong.png')} />
          )}
        </View>
      )}
    </View>
  );
};

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
    marginTop: 30,
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
    fontSize: 38,
    alignSelf: 'center',
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
