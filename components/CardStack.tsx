import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import { onValue, ref, update } from 'firebase/database';
import { collection, getDocs } from 'firebase/firestore';
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Pressable, View, StyleSheet, Text } from 'react-native';

import Card from './Card';
import PlayerAroundTable from './PlayerAroundTable';
import LoadingScreen from '../components/LoadingScreen';
import { BASE_CARD_IMAGE, CARD_PACKS, DEFAULT_CARD_COUNT } from '../constants/general';
import { SECONDARY_COLOR } from '../constants/styles/colors';
import { FONT_FAMILY_MEDIUM } from '../constants/styles/typography';
import { FIREBASE_DB, FIREBASE_RTDB } from '../firebaseConfig.js';
import { Player } from '../screens/Lobby';
import useGameStore from '../store/gameStore';

interface CardStackProps {
  points: number;
  drinks: number;
  isTurn: boolean;
  fetchedPlayers: Player[];
  onGameOver: () => void;
  setPoints: Dispatch<SetStateAction<number>>;
  setDrinks: Dispatch<SetStateAction<number>>;
  updateTurn: () => void;
  answeredText: (isAnswerCorrect: boolean) => string;
  currentTurn: string;
  isCurrentPlayersTurn: boolean;
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

export default function CardStack({ drinks, points, isTurn, fetchedPlayers, onGameOver, setPoints, setDrinks, updateTurn, answeredText, currentTurn, isCurrentPlayersTurn }: CardStackProps) {
  const [cardCount, setCardCount] = useState(DEFAULT_CARD_COUNT);
  const [cardImage] = useState(BASE_CARD_IMAGE);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [questionsArray, setQuestionsArray] = useState<QuestionsArray[]>([]);
  const [fetchedQuestions, setFetchedQuestions] = useState<QuestionsArray[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { playableDeckIndex } = useGameStore();
  const questionsCollection = collection(FIREBASE_DB, "packs", CARD_PACKS[playableDeckIndex].id, "questions");
  const { roomCode } = useGameStore();

  const updateCardParamsInDatabase = async (cardParams: UpdateCardsInfoInDatabaseParams) => {
    const roomRef = ref(FIREBASE_RTDB, `rooms/${roomCode}`);

    try {
      await update(roomRef, cardParams);
      console.log(`${JSON.stringify(cardParams)} updated in database`);
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

  useEffect(() => {
    if (questionsArray.length > 0 && isTurn) {
      updateCardParamsInDatabase({ questionsArray, cardCount: DEFAULT_CARD_COUNT, isCardVisible: false })
    }
  }, [questionsArray]);

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

  /**
   *         <View style={styles.cardViewContainer}>
          <Pressable
            style={styles.cardViewTouchable}
            disabled={isCardVisible}
            onPress={handleCardPick}
          >
            <Image style={styles.cardView} source={cardImage} />
          </Pressable>
        </View>
   */

        /*
        {fetchedPlayers.map((player, index) => */

  return (
    <>
      {isCardVisible && <Card handlePoints={handlePoints} toggleVisibility={toggleCardVisibility} updateTurn={updateTurn} questionElement={fetchedQuestions[cardCount]} cardsLeft={cardCount} isTurn={isTurn} answeredText={answeredText} />}
      <View style={styles.gameView}>
        <View style={styles.elementContainer}>
          <View style={styles.leftSection}>
            {fetchedPlayers[6] && <PlayerAroundTable key={6} player={fetchedPlayers[6]} currentTurn={currentTurn} />}
            {fetchedPlayers[0] && <PlayerAroundTable key={0} player={fetchedPlayers[0]} currentTurn={currentTurn} />}
            {fetchedPlayers[5] && <PlayerAroundTable key={5} player={fetchedPlayers[5]} currentTurn={currentTurn} />}
          </View>

          <View style={styles.middleSection}>
            <View style={styles.middleTop}>
              {fetchedPlayers[2] && <PlayerAroundTable key={2} player={fetchedPlayers[2]} currentTurn={currentTurn} />}
            </View>

            <Pressable
              style={styles.cardViewTouchable}
              disabled={isCardVisible}
              onPress={handleCardPick}
            >
              <Image style={styles.cardImage} source={cardImage} />
            </Pressable>

            <View style={styles.middleBottom}>
              {fetchedPlayers[3] && <PlayerAroundTable key={3} player={fetchedPlayers[3]} currentTurn={currentTurn} />}
            </View>
          </View>

          <View style={styles.rightSection}>
            {fetchedPlayers[4] && <PlayerAroundTable key={4} player={fetchedPlayers[4]} currentTurn={currentTurn} />}
            {fetchedPlayers[1] && <PlayerAroundTable key={1} player={fetchedPlayers[1]} currentTurn={currentTurn} />}
            {fetchedPlayers[7] && <PlayerAroundTable key={7} player={fetchedPlayers[7]} currentTurn={currentTurn} />}
          </View>
        </View>
        

        <View style={styles.gameDataView}>
          {isCurrentPlayersTurn ? <Text style={styles.gameDataText}>Wake up! It's your turn!</Text> : null}
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
    justifyContent: 'space-evenly',
    
  },
  elementContainer: {
    flex: 6,
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftSection: {
    flex: 1,
    marginLeft: '2%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  rightSection: {
    flex: 1,
    marginRight: '2%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  middleSection: {
    marginTop: '10%',
    marginBottom: '10%',
    flex: 4,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  middleTop: {
    flex: 1,
    width: '25%',
    alignItems: 'center',
    paddingBottom: '20%',
  },
  middleBottom: {
    flex: 1,
    width: '25%',
    alignItems: 'center',
    paddingTop: '20%',
  },
  cardViewContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  cardViewTouchable: {
    flex: 5,
    justifyContent: 'center',
  },
  cardImage: {
    height: '100%',
    aspectRatio: 0.53,
  },
  gameDataView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  gameDataText: {
    color: SECONDARY_COLOR,
    fontFamily: FONT_FAMILY_MEDIUM,
    marginTop: 5,
  },
});