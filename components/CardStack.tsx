import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import { onValue, ref, update } from 'firebase/database';
import { collection, getDocs } from 'firebase/firestore';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { Pressable, View, StyleSheet, Text, Dimensions, useWindowDimensions } from 'react-native';

import Card from './Card';
import LoadingScreen from '../components/LoadingScreen';
import { BASE_CARD_IMAGE, CARD_PACKS, DEFAULT_CARD_COUNT } from '../constants/general';
import { SECONDARY_COLOR } from '../constants/styles/colors';
import { FONT_FAMILY_MEDIUM } from '../constants/styles/typography';
import { FIREBASE_DB, FIREBASE_RTDB } from '../firebaseConfig.js';
import useGameStore from '../store/gameStore';

interface CardStackProps {
  points: number;
  drinks: number;
  isTurn: boolean;
  onGameOver: () => void;
  setPoints: Dispatch<SetStateAction<number>>;
  setDrinks: Dispatch<SetStateAction<number>>;
  updateTurn: () => void;
  answeredText: (isAnswerCorrect: boolean) => string;
  setCardLocation: (measure: Measurements) => void;
};


type Measurements = {
  height: number;
  width: number;
  x: number;
  y: number;
  pageX: number;
  pageY: number;
};

const defaultMeasurements = {
  height: 0,
  width: 0,
  x: 0,
  y: 0,
  pageX: 0,
  pageY: 0,
};

export interface QuestionsArray {
  question: string;
  answers: AnswersArray[]
};

interface AnswersArray {
  text: string;
  isCorrect: boolean;
};

interface UpdateCardsInfoInDatabaseParams {
  questionsArray?: QuestionsArray[];
  cardCount?: number;
  isCardVisible?: boolean;
}

export default function CardStack({ drinks, points, isTurn, onGameOver, setPoints, setDrinks, updateTurn, answeredText, setCardLocation }: CardStackProps) {
  const [cardCount, setCardCount] = useState(DEFAULT_CARD_COUNT);
  const [cardImage] = useState(BASE_CARD_IMAGE);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [questionsArray, setQuestionsArray] = useState<QuestionsArray[]>([]);
  const [fetchedQuestions, setFetchedQuestions] = useState<QuestionsArray[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { playableDeckIndex } = useGameStore();
  const questionsCollection = collection(FIREBASE_DB, "packs", CARD_PACKS[playableDeckIndex].id, "questions");
  const { roomCode } = useGameStore();
  const [measure, setMeasure] = useState<Measurements>(defaultMeasurements);
  const viewRef = useRef<View>(null);
  const {height, width} = useWindowDimensions();
  console.log("Scale: ", height, width);

  const centerPoint = {x: width / 2, y: height / 2}

  const updateCardParamsInDatabase = async (cardParams: UpdateCardsInfoInDatabaseParams) => {
    const roomRef = ref(FIREBASE_RTDB, `rooms/${roomCode}`);

    try {
      await update(roomRef, cardParams);
      //console.log(`${JSON.stringify(cardParams)} updated in database`);
    } catch (error) {
      console.error(`Error updating ${JSON.stringify(cardParams)} in database:`, error);
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
    updateCardParamsInDatabase({ isCardVisible: !isCardVisible })

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
    if (isTurn && cardCount > 0) {
      toggleCardVisibility();
      updateCardParamsInDatabase({ cardCount: cardCount - 1 });
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
  console.log("Screen: ", centerPoint)
  useEffect(() => {
    
    if (questionsArray.length > 0 && isTurn) {
      updateCardParamsInDatabase({ questionsArray, cardCount: DEFAULT_CARD_COUNT, isCardVisible: false })
    }
  }, [questionsArray]);

  useEffect(() => {
    if (viewRef.current) {
      viewRef.current.measure((x, y, width, height, pageX, pageY) => {
        console.log('Absolute coordinates: ',"x: " , x, "y: " , y, width, height, pageX, pageY );
      });
    }
  }, []);



  useEffect(() => {
    const roomRef = ref(FIREBASE_RTDB, `rooms/${roomCode}`);
    const unsubscribe = onValue(roomRef, (snapshot) => {
      const roomData = snapshot.val();
      if (roomData) {
        const questionData: QuestionsArray[] = roomData.questionsArray;
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
      {isCardVisible && <Card handlePoints={handlePoints} toggleVisibility={toggleCardVisibility} updateTurn={updateTurn} questionElement={fetchedQuestions[cardCount]} cardsLeft={cardCount} isTurn={isTurn} answeredText={answeredText} />}
      <View style={styles.gameView}>
        <View style={styles.cardViewContainer}>
          <Pressable
            style={styles.cardViewTouchable}
            disabled={isCardVisible}
            onPress={handleCardPick}
            ref={viewRef}
            
          >
            <Image style={styles.cardView} source={cardImage}
        />
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
  text: {
    fontSize: 50,
    color: 'white',
    position: 'absolute',
    backgroundColor: 'pink',
  },
  gameView: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  cardViewContainer: {
    marginTop: 40,
    width: '90%',
    height: '70%',
    justifyContent: 'center',
  },
  cardViewTouchable: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
    zIndex: 1,
  },
  cardView: {
    position: 'absolute',
    zIndex: 4,
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '60%',
    aspectRatio: 1/1.9,
    contentFit: 'contain',
  },
  gameDataView: {
    bottom: 10,
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