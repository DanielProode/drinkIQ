import { Image } from 'expo-image';
import { onValue, ref, update } from 'firebase/database';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import AnswerButton from './AnswerButton';
import { BASE_CARD_IMAGE, CARD_PACKS, DEFAULT_CARD_COUNT } from '../constants/general';
import { ALMOSTBLACK, GREY, LIGHTBLACK, CORRECT, WRONG, SECONDARY_COLOR } from '../constants/styles/colors';
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

export default function Card({ questionElement, cardsLeft, isTurn, toggleVisibility, updateTurn, handlePoints }: CardProps) {
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [randomizedAnswerArray, setRandomizedAnswerArray] = useState(() => randomize(questionElement.answers));
  const { playableDeckIndex, roomCode } = useGameStore();

  const updateAnswerSelectionInDatabase = async (answerParams: UpdateAnswerSelectionInDatabaseParams) => {
    const answersRef = ref(FIREBASE_RTDB, `rooms/${roomCode}/answerSelection`);

    try {
      await update(answersRef, answerParams);
      console.log(`Answer selection variables updated in database`);
    } catch (error) {
      console.error('Error updating answer selection variables in database:', error);
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
    if (randomizedAnswerArray.length > 0) updateAnswerSelectionInDatabase({ randomizedAnswerArray });
  }, [randomizedAnswerArray]);


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
        <AnswerButton key={answerIndex} answer={answer} answerIndex={answerIndex} isAnswered={isAnswered} answerStyle={answerStyle} textStyle={textStyle} handleAnswerSelection={handleAnswerSelection} />
      );
    })
  };

  return (
    <View style={styles.backgroundBlur}>
      <View style={{ ...styles.cardView, pointerEvents: isTurn ? 'auto' : 'none' }}>
        <Image source={BASE_CARD_IMAGE} style={styles.image}>
          <View style={styles.questionBox}>
            <View style={styles.questionNumberContainer}>
              <Text style={styles.questionNumberText}>Question {DEFAULT_CARD_COUNT - cardsLeft} / {DEFAULT_CARD_COUNT} </Text>
            </View>
            <View style={styles.questionTextContainer}>
              <Text style={styles.questionText} adjustsFontSizeToFit numberOfLines={5}>
                {isAnswered && (isAnswerCorrect && isTurn ? "Choose who has to drink!" : "Wrong, take a sip!")}
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
                onPress={handleCloseCard}
              >
                <Text style={styles.nextButtonText}>→</Text>
              </Pressable>}
          </View>
        </Image>
      </View>
      <View style={styles.deckCircle}>
        <Image style={styles.deckLogo} source={CARD_PACKS[playableDeckIndex].image} />
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
    backgroundColor: SECONDARY_COLOR,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: SECONDARY_COLOR,
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
    backgroundColor: ALMOSTBLACK,
  },
  image: {
    contentFit: 'contain',
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
    fontSize: REGULAR_FONT_SIZE,
    marginTop: 20,
    fontFamily: FONT_FAMILY_MEDIUM,
    textAlign: 'center',
  },
  questionTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  questionText: {
    fontSize: TITLE_FONT_SIZE,
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
    zIndex: 2,
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
  answerResult: {
    alignSelf: 'center',
    fontFamily: FONT_FAMILY_MEDIUM,
    marginTop: 200,
    fontSize: HEADER_FONT_SIZE,
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
    borderColor: SECONDARY_COLOR,
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
