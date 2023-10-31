import { collection, getDocs } from 'firebase/firestore';
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Pressable, View, Image, StyleSheet, Text } from 'react-native';

import Card from './Card';
import LoadingScreen from '../components/LoadingScreen';
import { FIREBASE_DB } from '../firebaseConfig.js';

interface CardStackProps {
  onGameOver: () => void;
  points: number;
  drinks: number;
  setPoints: Dispatch<SetStateAction<number>>;
  setDrinks: Dispatch<SetStateAction<number>>;
};

export interface QuestionsArray {
  question: string;
  answers: AnswersArray[]
};

interface AnswersArray {
  text: string;
  isCorrect: boolean;
};

const baseCardImage = require('../assets/images/card_stack_5.png');
const cardImageArray = [
  require('../assets/images/card_stack_1.png'),
  require('../assets/images/card_stack_2.png'),
  require('../assets/images/card_stack_3.png'),
  require('../assets/images/card_stack_4.png'),
  require('../assets/images/card_stack_5.png')
];

export default function CardStack({ onGameOver, setPoints, setDrinks, points, drinks }: CardStackProps) {
  const [cardCount, setCardCount] = useState(10);
  const [cardImage, setCardImage] = useState(baseCardImage);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [questionsArray, setQuestionsArray] = useState<QuestionsArray[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const db = FIREBASE_DB;
  const questionsCollection = collection(db, "packs", "estonia", "questions");

  useEffect(() => {
    async function loadQuestions() {
      try {
        const querySnapshot = await getDocs(questionsCollection);
        const tempQuestionsArray: QuestionsArray[] = [];
        querySnapshot.forEach((question) => {
          const questionData = question.data() as QuestionsArray;
          tempQuestionsArray.push(questionData);
        });
        setQuestionsArray(tempQuestionsArray);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading questions: ', error)
        setIsLoading(false);
      }
    }
    loadQuestions();
  }, []);

  useEffect(() => {
    if (cardCount < 5 && cardCount > 0) {
      setCardImage(cardImageArray[cardCount - 1]);
    }
  }, [cardCount]);

  const toggleCardVisibility = () => {
    setIsCardVisible(!isCardVisible);

    if (cardCount === 0) onGameOver()
  }

  const onDecrement = () => {
    if (cardCount > 0) setCardCount(cardCount - 1)
  };

  function handlePoints (answerState: boolean) {
    if (answerState) {
      setPoints(points + 1);
    } else {
      setDrinks(drinks + 1);
    }
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <>
      {isCardVisible && <Card handlePoints={handlePoints} onClose={toggleCardVisibility} questionElement={questionsArray[cardCount]} />}
      <Text style={styles.cardsLeft}>Cards Left: {cardCount}</Text>
      <Text style={styles.cardsLeft}>Points: {points - drinks}</Text>
      <Text style={styles.cardsLeft}>Drinks: {drinks}</Text>
      <View style={styles.cardViewContainer}>
        <Pressable
          style={styles.cardViewTouchable}
          onPress={() => {
            toggleCardVisibility()
            onDecrement()
          }}
        >
          <Image style={styles.cardView} source={cardImage} />
        </Pressable>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  cardViewContainer: {
    marginTop: 50,
    height: 400,
  },
  cardViewTouchable: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  cardView: {
    flex: 1,
    resizeMode: 'contain',
  },
  cardsLeft: {
    marginTop: 15,
    fontSize: 25,
    color: 'white',
    fontFamily: 'Basic',
  }
});