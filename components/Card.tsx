/* eslint-disable react-hooks/rules-of-hooks */
import { Image } from 'expo-image';
import { onValue, ref, update } from 'firebase/database';
import { useEffect, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View, ImageBackground } from 'react-native';

import AnswerButton from './AnswerButton';
import { BASE_CARD_IMAGE, CARD_PACKS, DEFAULT_CARD_COUNT } from '../constants/general';
import { GREY, LIGHTBLACK, CORRECT, WRONG, SECONDARY_COLOR } from '../constants/styles/colors';
import { FONT_FAMILY_MEDIUM, FONT_FAMILY_REGULAR, HEADER_FONT_SIZE, MEDIUM_LOGO_FONT_SIZE, REGULAR_FONT_SIZE, TITLE_FONT_SIZE } from '../constants/styles/typography';
import { FIREBASE_RTDB } from '../firebaseConfig';
import useGameStore from '../store/gameStore';

interface CardProps {
  questionElement: QuestionsArray;
  cardsLeft: number;
  isTurn: boolean;
  toggleVisibility: () => void;
  updateTurn: () => void;
  handlePoints: (answerState: boolean) => void;
  answeredText: (isAnswerCorrect: boolean) => string;
};

interface QuestionsArray {
  question: string;
  answers: AnswersArray[]
};

export interface AnswersArray {
  text: string;
  isCorrect: boolean;
};

interface UpdateAnswerSelectionInDatabaseParams {
  isAnswered?: boolean;
  selectedAnswerIndex?: number | null;
  isAnswerCorrect?: boolean;
  randomizedAnswerArray?: AnswersArray[];
}

const randomize = (array: AnswersArray[]) => {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function Card({ questionElement, cardsLeft, isTurn, toggleVisibility, updateTurn, handlePoints, answeredText }: CardProps) {
  if (!questionElement) {
    return
  }
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [randomizedAnswerArray, setRandomizedAnswerArray] = useState(() => randomize(questionElement.answers));
  const { playableDeckIndex, roomCode } = useGameStore();

  const updateAnswerSelectionInDatabase = async (answerParams: UpdateAnswerSelectionInDatabaseParams) => {
    const answersRef = ref(FIREBASE_RTDB, `rooms/${roomCode}/answerSelection`);

    try {
      await update(answersRef, answerParams);
      //console.log(`${JSON.stringify(answerParams)} updated in database`);
    } catch (error) {
      console.error(`Error updating ${JSON.stringify(answerParams)} in database:`, error);
    }
  }

  const handleAnswerSelection = (answerIndex: number) => {
    if (!isAnswered) {
      setSelectedAnswerIndex(answerIndex);
      updateAnswerSelectionInDatabase({ selectedAnswerIndex: answerIndex });
    };

    const selectedAnswer = randomizedAnswerArray[answerIndex];
    const isCorrect = selectedAnswer.isCorrect;

    setIsAnswerCorrect(isCorrect);
    handlePoints(isCorrect);
    setIsAnswered(true);
    updateAnswerSelectionInDatabase({ isAnswerCorrect: isCorrect, isAnswered: true });
  };

  const handleCloseCard = () => {
    toggleVisibility();
    updateTurn();
    updateAnswerSelectionInDatabase({ selectedAnswerIndex: null, isAnswered: false });
  };

  useEffect(() => {
    if (randomizedAnswerArray.length > 0 && isTurn) updateAnswerSelectionInDatabase({ randomizedAnswerArray });
  }, []);


  useEffect(() => {
    const answersRef = ref(FIREBASE_RTDB, `rooms/${roomCode}/answerSelection`);
    const unsubscribe = onValue(answersRef, (snapshot) => {
      const answersData = snapshot.val();
      if (answersData) {
        const isAnsweredData: boolean = answersData.isAnswered;
        const selectedAnswerIndexData: number = answersData.selectedAnswerIndex;
        const isAnswerCorrect: boolean = answersData.isAnswerCorrect;
        const answersArray: AnswersArray[] = answersData.randomizedAnswerArray;

        setRandomizedAnswerArray(answersArray);
        setIsAnswered(isAnsweredData);
        setSelectedAnswerIndex(selectedAnswerIndexData);
        setIsAnswerCorrect(isAnswerCorrect);
      }
    });

    return () => unsubscribe();
  }, []);

  const renderAnswers = () => {
    return randomizedAnswerArray.map((answer, answerIndex) => {
      const correctAnswerIndex = randomizedAnswerArray.findIndex((answer) => answer.isCorrect);
      const isSelected = answerIndex === selectedAnswerIndex;
      const isCorrect = answerIndex === correctAnswerIndex;
      const answerStyle = [
        isSelected && (isCorrect ? { backgroundColor: CORRECT } : { backgroundColor: WRONG }),
        isAnswered && !isSelected && answer.isCorrect && { backgroundColor: CORRECT },
      ];
      const textStyle = [
        !isCorrect && isAnswered && { color: LIGHTBLACK }
      ];
      return (
        <AnswerButton parentWidth={measure.width} key={answerIndex} answer={answer} answerIndex={answerIndex} isAnswered={isAnswered} answerStyle={answerStyle} textStyle={textStyle} handleAnswerSelection={handleAnswerSelection} />
      );
    })
  };

  type Measurements = {
    height: number;
    width: number;
    x: number;
    y: number;
  };

  const defaultMeasurements = {
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  };

  const [measure, setMeasure] = useState<Measurements>(defaultMeasurements);

  return (
    <View style={styles.backgroundElement}>
      <View style={styles.backgroundBlur}>
        <View style={styles.deckCircle}>
          <Image style={styles.deckLogo} source={CARD_PACKS[playableDeckIndex].image} />
        </View>


        <View style={{ ...styles.cardView, pointerEvents: isTurn ? 'auto' : 'none' }}>
          <Image source={BASE_CARD_IMAGE} style={styles.backgroundImage} 
          onLayout={({ nativeEvent }) =>
            {
            setMeasure(nativeEvent.layout);
          }
        }/>
          
            <View style={{ ...styles.questionBox, width: measure.width - 30, height: measure.width * 0.6 }}>
              <View style={styles.questionNumberContainer}>
                <Text style={styles.questionNumberText}>Question {DEFAULT_CARD_COUNT - cardsLeft} / {DEFAULT_CARD_COUNT} </Text>
              </View>
              <View style={styles.questionTextContainer}>
                <Text style={styles.questionText} adjustsFontSizeToFit numberOfLines={5}>
                  {isAnswered && answeredText(isAnswerCorrect)}
                  {!isAnswered && questionElement.question}
                </Text>
              </View>

            </View>
            <View style={{ ...styles.answerButtonView }}>
              {renderAnswers()}
            </View>
            <View style={styles.nextButtonContainer}>
              {isAnswered &&
                <Pressable
                  style={({ pressed }) => [
                    { opacity: pressed ? 0.5 : 1.0 },
                    styles.nextButton,
                  ]}
                  onPress={()=>{ handleCloseCard(); console.log("Card element measurements: " , measure); }}
                >
                  <Text style={styles.nextButtonText}>→</Text>
                </Pressable>}
            </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundElement: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  backgroundBlur: {
    flex: 1,
    zIndex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  deckCircle: {
    marginTop: 70,
    zIndex: 3,
    width: 100,
    aspectRatio: 1,
    alignSelf: 'center',
    borderRadius: 80,
    borderColor: SECONDARY_COLOR,
    borderWidth: 2,
  },
  deckLogo: {
    contentFit: 'cover',
    width: '100%',
    height: '100%',
    borderRadius: 80,
  },
  cardView: {
    flex: 1,
    marginTop: -80,
    alignSelf: 'center',
    justifyContent: 'center',
    zIndex: 2,
    width: '100%',
    marginBottom: 40,
  },
  backgroundImage: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 0,
    flex: 1,
    width: '80%',
    aspectRatio: 1/1.9,
  },
  questionBox: {
    marginTop: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: SECONDARY_COLOR,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: SECONDARY_COLOR,
    alignSelf: 'center',
  },
  questionNumberContainer: {
    flex: 1,
  },
  questionNumberText: {
    alignSelf: 'center',
    fontSize: HEADER_FONT_SIZE,
    marginTop: 20,
    fontFamily: FONT_FAMILY_MEDIUM,
    textAlign: 'center',
    flex: 1,
  },
  questionTextContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  questionText: {
    fontSize: Platform.OS === 'android' ? 18 : TITLE_FONT_SIZE,
    fontFamily: FONT_FAMILY_REGULAR,
    textAlign: 'center',
  },
  nextButtonContainer: {
    alignSelf: 'flex-end',
    marginTop: 50,
    marginRight: '40%',
    width: 50,
    height: 50,
    justifyContent: 'center',
    zIndex: 3,
  },
  nextButton: {
    backgroundColor: SECONDARY_COLOR,
    borderColor: GREY,
    flex: 1,
    borderWidth: 1,
    borderRadius: 50,
  },
  nextButtonText: {
    fontSize: MEDIUM_LOGO_FONT_SIZE,
    alignSelf: 'center',
  },
  answerButtonView: {
    marginTop: 20,
    alignSelf: 'center',
  },
});
