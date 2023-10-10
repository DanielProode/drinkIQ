import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { Pressable, View, Image, StyleSheet, Text, ImageSourcePropType } from 'react-native';

import Card from './Card';
import LoadingScreen from '../components/LoadingScreen';
import { FIREBASE_DB } from '../firebaseConfig.js';

interface CardStackProps {
  onGameOver: () => void;
  avatar: ImageSourcePropType;
  drink: ImageSourcePropType;
};

export interface QuestionsArray {
  question: string;
  answers: AnswersArray[]
};

interface AnswersArray {
  text: string;
  isCorrect: boolean;
};

const baseCardImage = require('../assets/images/card5_icon.png');
const cardImageArray = [
  require('../assets/images/card1_icon.png'),
  require('../assets/images/card2_icon.png'),
  require('../assets/images/card3_icon.png'),
  require('../assets/images/card4_icon.png'),
  require('../assets/images/card5_icon.png')
];

export default function CardStack({ onGameOver, avatar, drink }: CardStackProps) {
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

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <>
      {isCardVisible && <Card onClose={toggleCardVisibility} questionElement={questionsArray[cardCount]} avatar={avatar} drink={drink} />}
      <Text style={styles.cardsLeft}>Cards Left: {cardCount}</Text>
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
    marginTop: 130,
    width: 220,
    height: 300,
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
    marginTop: 30,
    fontSize: 25,
    color: 'white',
    fontFamily: 'Basic',
  }
});