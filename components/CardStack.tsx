import { Image } from 'expo-image';
import { collection, getDocs } from 'firebase/firestore';
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Pressable, View, StyleSheet, Text, ImageSourcePropType } from 'react-native';

import Card from './Card';
import LoadingScreen from '../components/LoadingScreen';
import { BASE_CARD_IMAGE, CARD_STACK_IMAGES, DEFAULT_AVATAR_IMAGE, DEFAULT_CARD_COUNT, DEFAULT_DRINK_IMAGE } from '../constants/general';
import { FIREBASE_DB } from '../firebaseConfig.js';
import useGameStore from '../store/gameStore';

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

interface Player {
  username: string;
  avatar: ImageSourcePropType;
  drink: ImageSourcePropType;
}

interface RenderPlayersProps {
  playerArray: Player[];
}

// FETCH all players from session, including the current player, and later on check which player in list is current player, and go from there
const fetchedPlayers = [ {username: "Bot Alfred", avatar: DEFAULT_AVATAR_IMAGE, drink: DEFAULT_DRINK_IMAGE },
                                  {username: "Bot Allu", avatar: DEFAULT_AVATAR_IMAGE, drink: DEFAULT_DRINK_IMAGE },
                                  {username: "Bot Pete", avatar: DEFAULT_AVATAR_IMAGE, drink: DEFAULT_DRINK_IMAGE },
                                  {username: "Bot Viktor", avatar: DEFAULT_AVATAR_IMAGE, drink: DEFAULT_DRINK_IMAGE },
                                  {username: "Bot Albert", avatar: DEFAULT_AVATAR_IMAGE, drink: DEFAULT_DRINK_IMAGE },
                                  {username: "Bot Sasha", avatar: DEFAULT_AVATAR_IMAGE, drink: DEFAULT_DRINK_IMAGE },
                                  {username: "Bot Anubis", avatar: DEFAULT_AVATAR_IMAGE, drink: DEFAULT_DRINK_IMAGE },
                                  {username: "Bot Anubis2", avatar: DEFAULT_AVATAR_IMAGE, drink: DEFAULT_DRINK_IMAGE },
                                ]


export default function CardStack({ onGameOver, setPoints, setDrinks, points, drinks }: CardStackProps) {
  const [cardCount, setCardCount] = useState(DEFAULT_CARD_COUNT);
  const [cardImage, setCardImage] = useState(BASE_CARD_IMAGE);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [questionsArray, setQuestionsArray] = useState<QuestionsArray[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { playableDeck } = useGameStore();
  const questionsCollection = collection(FIREBASE_DB, "packs", playableDeck, "questions");

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
      setCardImage(BASE_CARD_IMAGE);
    }
  }, [cardCount]);

  const toggleCardVisibility = () => {
    setIsCardVisible(!isCardVisible);

    if (cardCount === 0) onGameOver()
  }

  const onDecrement = () => {
    if (cardCount > 0) setCardCount(cardCount - 1)
  };

  function handlePoints(answerState: boolean) {
    if (answerState) {
      setPoints(points + 1);
    } else {
      setDrinks(drinks + 1);
    }
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  const stylesArray = [
    styles.firstAvatar,
    styles.secondAvatar,
    styles.thirdAvatar,
    styles.fourthAvatar,
    styles.fifthAvatar,
    styles.sixthAvatar,
    styles.seventhAvatar,
    styles.eighthAvatar,    
  ];

  const RenderPlayers = ({ playerArray }: RenderPlayersProps) => {
    return (
      <>
        {playerArray.map((player, index) => (
          //KEY set as index - implement unique ID's and replace
          <View style={stylesArray[index]} key={index}>
          <Pressable
            style={styles.playerContainer}
          >
            <View style={styles.avatarCircle}>
              <Image style={styles.avatar} source={player.avatar} />
              <Image style={styles.drink} source={player.drink} />
            </View>
            <Text style={styles.name} adjustsFontSizeToFit numberOfLines={1}>{player.username}</Text>
          </Pressable>
          </View>
        ))}
        </>
    );
  };

  return (
    <>
    {isCardVisible && <Card handlePoints={handlePoints} onClose={toggleCardVisibility} questionElement={questionsArray[cardCount]} cardsLeft={cardCount} />}      
    <View style={styles.gameView}>
        <View style={styles.cardViewContainer}>
          <RenderPlayers playerArray={fetchedPlayers}/>
          <Pressable
            style={styles.cardViewTouchable}
            disabled={isCardVisible}
            onPress={() => {
              toggleCardVisibility()
              onDecrement()
            }}
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
    color: 'white',
    fontFamily: 'JosefinSans-Medium',
    marginTop: 5,
  },
  seventhAvatar: {
    position: 'absolute',
    top: '8%',
    left: '0%',
  },
  firstAvatar: {
    position: 'absolute',
    top: '0%',
    left: '41%',
  },
  fifthAvatar: {
    position: 'absolute',
    top: '8%',
    left: '84%',
  },
  thirdAvatar: {
    position: 'absolute',
    top: '45%',
    left: '86%',
  },
  eighthAvatar: {
    position: 'absolute',
    top: '78%',
    left: '84%',
  },
  secondAvatar: {
    position: 'absolute',
    top: '86%',
    left: '41%',
  },
  sixthAvatar: {
    position: 'absolute',
    top: '78%',
    left: '0%',
  },
  fourthAvatar: {
    position: 'absolute',
    top: '45%',
    left: '-2%',
  },
  playerContainer: {
    width: '42%',
    aspectRatio: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatarCircle: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 50,
  },
  avatar: {
    flex: 1,
    resizeMode: 'contain',
    width: '90%',
    height: '90%',
    alignSelf: 'center',
  },
  drink: {
    position: 'absolute',
    resizeMode: 'contain',
    width: '50%',
    height: '50%',
    alignSelf: 'flex-end',
    bottom: 0,
  },
  name: {
    marginTop: 5,
    fontSize: 14,
    fontFamily: 'JosefinSans-Medium',
    color: 'white',
  },
  text: {
    color: 'white',
    fontSize: 40,
  },
  gameText: {
    flex: 1,
    display: 'none',
    marginTop: 5,
    fontSize: 12,
    color: 'white',
    fontFamily: 'Basic',
  }
});