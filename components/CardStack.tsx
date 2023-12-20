import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import { onValue, ref, update } from 'firebase/database';
import { collection, getDocs } from 'firebase/firestore';
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Pressable, View, StyleSheet, Text } from 'react-native';

import Card from './Card';
import LoadingScreen from '../components/LoadingScreen';
import { BASE_CARD_IMAGE, CARD_PACKS, DEFAULT_CARD_COUNT } from '../constants/general';
import { SECONDARY_COLOR } from '../constants/styles/colors';
import { FONT_FAMILY_MEDIUM } from '../constants/styles/typography';
import { FIREBASE_DB, FIREBASE_RTDB } from '../firebaseConfig.js';
import useGameStore from '../store/gameStore';


interface CardStackProps {
  onGameOver: () => void;
  points: number;
  drinks: number;
  setPoints: Dispatch<SetStateAction<number>>;
  setDrinks: Dispatch<SetStateAction<number>>;
  updateTurn: () => void;
  isTurn: boolean;
};

export interface QuestionsArray {
  question: string;
  answers: AnswersArray[]
};

interface AnswersArray {
  text: string;
  isCorrect: boolean;
};


export default function CardStack({ onGameOver, setPoints, setDrinks, points, drinks, updateTurn, isTurn }: CardStackProps) {
  const [cardCount, setCardCount] = useState(DEFAULT_CARD_COUNT);
  const [cardImage, setCardImage] = useState(BASE_CARD_IMAGE);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [questionsArray, setQuestionsArray] = useState<QuestionsArray[]>([]);
  const [fetchedQuestions, setFetchedQuestions] = useState<QuestionsArray[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { playableDeckIndex } = useGameStore();
  const questionsCollection = collection(FIREBASE_DB, "packs", CARD_PACKS[playableDeckIndex].id, "questions");
  const { roomCode } = useGameStore();

  const updateCurrentQuestionInDatabase = async (questions: QuestionsArray[]) => {
    const roomRef = ref(FIREBASE_RTDB, `rooms/${roomCode}`);

    try {
      await update(roomRef, { questions, cardCount: DEFAULT_CARD_COUNT, isCardVisible: false, });
      console.log(`Question updated in database`);
    } catch (error) {
      console.error('Error updating current question in database:', error);
    }
  }

  const updateCardCountInDatabase = async () => {
    setCardCount(cardCount - 1);
    const roomRef = ref(FIREBASE_RTDB, `rooms/${roomCode}`);

    try {
      await update(roomRef, { cardCount: cardCount - 1});
      console.log(`Card count updated in database`);
    } catch (error) {
      console.error('Error updating card count in database:', error);
    }
  }

  const updateCardVisibilityInDatabase = async () => {
    setIsCardVisible(!isCardVisible);
    const roomRef = ref(FIREBASE_RTDB, `rooms/${roomCode}`);

    try {
      await update(roomRef, { isCardVisible: !isCardVisible});
      console.log(`Card count updated in database`);
    } catch (error) {
      console.error('Error updating card count in database:', error);
    }
  }

  //Check if local array exists, get it if it does, fetch it with loadQuestions() if it doesn't
  //TODO: In the future, if we want to push an update (version change), then compare if version boolean in AsyncStorage is equal to version name from DB 
  const getArray = async (): Promise<QuestionsArray[]> => {
    try {
      const jsonValue = await AsyncStorage.getItem(CARD_PACKS[playableDeckIndex].id);
      const parsedArray = (jsonValue != null && JSON.parse(jsonValue).length > DEFAULT_CARD_COUNT) ? JSON.parse(jsonValue) : await loadQuestions();
      return Array.isArray(parsedArray) ? parsedArray : [];
    } catch (error) {
      console.error('Error reading questions from array: ', error);
      throw error;
    }
  };

  //Load questions from DB and write questions to new array
  const loadQuestions = async () => {
    try {
      const querySnapshot = await getDocs(questionsCollection);
      const tempQuestionsArray: QuestionsArray[] = [];
      querySnapshot.forEach((question) => {
        const questionData = question.data() as QuestionsArray;
        tempQuestionsArray.push(questionData);
      });
      return tempQuestionsArray;
    } catch (error) {
      console.error('Error loading questions: ', error)
      throw error;
    }
  };

  //Write questions to new array
  const storeArray = async (value: QuestionsArray[]) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(CARD_PACKS[playableDeckIndex].id, jsonValue);
    } catch (error) {
      console.error('Error writing questions to array: ', error)
      throw error;
    }
  }

  const generateRandomNumberArray = (arraySize: number): number[] => {
    const array: number[] = [];
    for (let i = 0; i < DEFAULT_CARD_COUNT; i++) {
      let insertedToArray = false
      while (!insertedToArray) {
        const randomInt = Math.floor(Math.random() * arraySize)
        if (!array.includes(randomInt)) {
          array.push(randomInt);
          insertedToArray = true
        }
      }
    }

    return array;
  }

  const selectPlayableQuestions = (array: QuestionsArray[]) => {
    const tempGameQuestionArray: QuestionsArray[] = [];
    const randomNumberArray = generateRandomNumberArray(array.length);
    randomNumberArray.map((x) => {
      tempGameQuestionArray.push(array[x])
    });

    for (let i = 0; i < randomNumberArray.length; i++) {
      array = array.filter(element => element !== tempGameQuestionArray[i])
    }
    storeArray(array);
    return tempGameQuestionArray;
  }

  const toggleCardVisibility = () => {
    updateCardVisibilityInDatabase();

    if (cardCount === 0) onGameOver()
  }

  function handlePoints(answerState: boolean) {
    if (answerState) {
      setPoints(points + 1);
    } else {
      setDrinks(drinks + 1);
    }
  }

  const handleCardPick = () => {
    if (isTurn) {
      toggleCardVisibility();
      if (cardCount > 0) updateCardCountInDatabase();
    }
  }

  //Currently not in use, card stack
  // useEffect(() => {
  //   if (cardCount < 5 && cardCount > 0) {
  //     setCardImage(BASE_CARD_IMAGE);
  //   }
  // }, [cardCount]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const array = await getArray();
        setQuestionsArray(selectPlayableQuestions(array));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error('Error fetching and storing data: ', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (questionsArray.length > 0) {
      updateCurrentQuestionInDatabase(questionsArray);
    }
  }, [questionsArray]);

  useEffect(() => {
    const roomRef = ref(FIREBASE_RTDB, `rooms/${roomCode}`);
    const unsubscribe = onValue(roomRef, (snapshot) => {
      const roomData = snapshot.val();
      if (roomData) {
        const questionData: QuestionsArray[] = roomData.questions;
        const cardCount: number = roomData.cardCount;
        const isCardVisible: boolean = roomData.isCardVisible;

        setFetchedQuestions(questionData);
        setCardCount(cardCount);
        setIsCardVisible(isCardVisible);
      }
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <>
      {isCardVisible && <Card handlePoints={handlePoints} onClose={() => {toggleCardVisibility(); updateTurn()}} questionElement={fetchedQuestions[cardCount]} cardsLeft={cardCount} />}
      <View style={styles.gameView}>
        <View style={styles.cardViewContainer}>
          <Pressable
            style={styles.cardViewTouchable}
            disabled={isCardVisible}
            onPress={handleCardPick}
          >
            <Image style={styles.cardView} source={cardImage} />
          </Pressable>
        </View>
        <View style={styles.gameDataView}>
          <Text style={styles.gameDataText}>Cards Left: {cardCount}</Text>
          <Text style={styles.gameDataText}>Points: {points - drinks}</Text>
          <Text style={styles.gameDataText}>Drinks: {drinks}</Text>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  gameView: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  cardViewContainer: {
    marginTop: 60,
    width: '90%',
    height: '70%',
    justifyContent: 'center',
  },
  cardViewTouchable: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
  },
  cardView: {
    height: '80%',
    width: '80%',
    contentFit: 'contain',
  },
  gameDataView: {
    marginTop: 50,
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  gameDataText: {
    color: SECONDARY_COLOR,
    fontFamily: FONT_FAMILY_MEDIUM,
    marginTop: 5,
  },
  avatar: {
    flex: 1,
    contentFit: 'contain',
    width: '90%',
    height: '90%',
    alignSelf: 'center',
  },
  drink: {
    position: 'absolute',
    contentFit: 'contain',
    width: '50%',
    height: '50%',
    alignSelf: 'flex-end',
    bottom: 0,
  },
});