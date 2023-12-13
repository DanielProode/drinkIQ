import { Image } from 'expo-image';
import { useState } from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';

import AnswerButton from './AnswerButton';
import { QuestionsArray } from './CardStack';
import { ANSWER_PREFIXES, CORRECT_ANSWER_IMAGE, WRONG_ANSWER_IMAGE, BASE_CARD_IMAGE } from '../constants/general';
import useGameStore from '../store/gameStore';

interface CardProps {
  onClose: () => void;
  handlePoints: (answerState: boolean) => void;
  questionElement: QuestionsArray;
  cardsLeft: number;
};

export default function Card({ onClose, handlePoints, questionElement, cardsLeft }: CardProps) {
  const { avatar, playableCardBackground } = useGameStore();
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const correctAnswerIndex = questionElement.answers.findIndex((answer) => answer.isCorrect);

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
          text={ANSWER_PREFIXES[answerIndex] + answer.text}
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
        <Image source={BASE_CARD_IMAGE} style={styles.image}>
          <View style={styles.questionBox}>
            <View style={styles.questionNumberContainer}>
              <Text style={styles.questionNumberText}>Question {10 - cardsLeft}/10</Text>
            </View>
            <View style={styles.questionTextContainer}>
              <Text style={styles.questionText} adjustsFontSizeToFit numberOfLines={5}>
                {isAnswered && (isAnswerCorrect ? "Choose who has to drink!" : "Wrong, take a sip!")}
                {!isAnswered && questionElement.question}
              </Text>
            </View>
            
          </View>
          <View style={styles.answerButtonView}>
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
          </Image>
      </View>
        <View style={styles.deckCircle}>
          <Image style={styles.deckLogo} source={playableCardBackground} />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardView: {
    position: 'absolute',
    alignSelf: 'center',
    top: 110, bottom: 110,
    marginTop: 20,
    width: '95%',
    zIndex: 1,
  },
  questionBox: {
    marginTop: 80,
    width: 280,
    height: 140,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 5,
    borderColor: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  questionNumberContainer: {
    height: 40,
  },
  backgroundBlur: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
    backgroundColor: '#00000099',
  },
  image: {
    resizeMode: 'contain',
    height: '100%',
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
  questionNumberText: {
    fontSize: 18,
    marginTop: 20,
    fontFamily: 'JosefinSans-Medium',
    textAlign: 'center',
  },
  questionTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  questionText: {
    fontSize: 24,
    fontFamily: 'JosefinSans-Regular',
    textAlign: 'center',
  },
  nextButtonContainer: {
    alignSelf: 'flex-end',
    marginTop: 50,
    marginRight: '40%',
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
  answerButtonView: {
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
  deckCircle: {
    flex: 1,
    position: 'absolute',
    marginTop: 130,
    zIndex: 3,
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderRadius: 80,
    borderColor: 'white',
    borderWidth: 2,
    justifyContent: 'flex-start',
  },
  deckLogo: {
    contentFit: '',
    width: '100%',
    height: '100%',
    borderRadius: 80,
  },
  wrongImage: {
    flex: 1,
    contentFit: 'contain',
    width: '80%',
    height: '80%',
    alignSelf: 'center',
  },
});
