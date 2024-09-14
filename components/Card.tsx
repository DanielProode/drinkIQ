/* eslint-disable react-hooks/rules-of-hooks */
import { Image, ImageBackground } from 'expo-image';
import { onValue, ref, update } from 'firebase/database';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import AnswerButton from './AnswerButton';
import { DEFAULT_CARD_COUNT } from '../constants/general';
import { ALMOSTBLACK, LIGHTBLACK, CORRECT, WRONG, SECONDARY_COLOR, TRANSPARENTGREY } from '../constants/styles/colors';
import { FONT_FAMILY_MEDIUM, FONT_FAMILY_REGULAR, HEADER_FONT_SIZE, REGULAR_FONT_SIZE, TITLE_FONT_SIZE } from '../constants/styles/typography';
import { useAuth } from '../context/authContext';
import { FIREBASE_DB, FIREBASE_RTDB } from '../firebaseConfig';
import useGameStore from '../store/gameStore';
import useUserStore from '../store/userStore';

interface CardProps {
  questionElement: QuestionElement;
  cardsLeft: number;
  isTurn: boolean;
  toggleVisibility: () => void;
  updateTurn: () => void;
  handlePoints: (answerState: boolean) => void;
  answeredText: (isAnswerCorrect: boolean) => string;
  deckID: string;
};

interface QuestionElement {
  id: number;
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

export default function Card({ questionElement, cardsLeft, isTurn, toggleVisibility, updateTurn, handlePoints, answeredText, deckID }: CardProps) {
    if (!questionElement) {
    return
  }
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [isUpdateCalled, setIsUpdateCalled] = useState(false);
  const [randomizedAnswerArray, setRandomizedAnswerArray] = useState(() => randomize(questionElement.answers));
  const { roomCode } = useGameStore();
  const { authUser } = useAuth();

  const updateAnswerSelectionInDatabase = async (answerParams: UpdateAnswerSelectionInDatabaseParams) => {
    const answersRef = ref(FIREBASE_RTDB, `rooms/${roomCode}/answerSelection`);

    try {
      await update(answersRef, answerParams);
      // console.log(`${JSON.stringify(answerParams)} updated in database`);
    } catch (error) {
      console.error(`Error updating ${JSON.stringify(answerParams)} in database:`, error);
    }
  }

  useEffect(() => {
    // Ensure this function is only called once per card
    if (isTurn && !isUpdateCalled) {
        updatePackPlayedQuestions();
        setIsUpdateCalled(true);
        console.log("Setting value in Zustand!")
    }
}, [isTurn]); // Runs when isTurn changes

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

  //Insert played question ID to pack-specific array under User object
  const updatePackPlayedQuestions = async () => {
    try {
      if (authUser) {
        const userDoc = doc(FIREBASE_DB, 'users', authUser.uid);
        const currentPackPlayed = useUserStore.getState().packs_played[deckID] || [];
        if (!currentPackPlayed.includes(questionElement.id)) {
          await updateDoc(userDoc, {
            [`packs_played.${deckID}`]: arrayUnion(questionElement.id),
          });
  
          // Update Zustand state
          useUserStore.getState().updatePacksPlayed({
            ...useUserStore.getState().packs_played,
            [deckID]: [...currentPackPlayed, questionElement.id],
          });
        }
      } else {
        console.log('User object does not exist');
      }
    } catch (error) {
      console.error('Error updating user data: ', error);
    }
  };
  
  

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
    <Pressable style={styles.backgroundBlur}>
      <View style={{ ...styles.cardView, pointerEvents: isTurn ? 'auto' : 'none' }}>
      <ImageBackground source={require('../assets/images/card_bg2.png')} style={styles.cardImage}>
        <View style={styles.questionBox}>
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
                <Image source={require('../assets/images/check.png')} style={styles.checkIcon}/>
              </Pressable>}
          </View>
          </ImageBackground>
      </View>

    </Pressable>
  );
};

const styles = StyleSheet.create({
  backgroundBlur: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    zIndex: 1,
    backgroundColor: ALMOSTBLACK,
  },
  cardView: {
    alignSelf: 'center',
    width: '90%',
    height: '85%',
    zIndex: 1,
    borderWidth: 5,
    borderColor: SECONDARY_COLOR,
    backgroundColor: TRANSPARENTGREY,
    borderRadius: 15,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  questionBox: {
    marginTop: 10,
    height: 230,
    width: '90%',
    borderRadius: 10,
    borderWidth: 5,
    borderColor: SECONDARY_COLOR,
    alignSelf: 'center',
  },
  questionNumberContainer: {
    height: 30,
    backgroundColor: '#F2F2F298',
    justifyContent: 'center',
  },
  questionNumberText: {
    fontSize: REGULAR_FONT_SIZE,
    fontFamily: FONT_FAMILY_MEDIUM,
    textAlign: 'center',
  },
  questionTextContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F2F2F298',
    borderColor: SECONDARY_COLOR,
  },
  questionText: {
    fontSize: TITLE_FONT_SIZE,
    fontFamily: FONT_FAMILY_REGULAR,
    textAlign: 'center',
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
  nextButtonContainer: {
    flex: 1,
    width: 50,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  nextButton: {
    backgroundColor: '#a0c172',
    borderColor: SECONDARY_COLOR,
    width: 150,
    height: 50,
    borderWidth: 4,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: REGULAR_FONT_SIZE,
    alignSelf: 'center',
  },
  answerButtonView: {
    flex: 4,
    alignSelf: 'center',
    justifyContent: 'center',
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
    width: '100%',
    height: '100%',
    borderRadius: 80,
  },
  checkIcon: {
    width: '70%',
    height: '70%',
  },
});
