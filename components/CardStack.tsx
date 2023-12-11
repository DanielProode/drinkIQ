import { collection, getDocs } from 'firebase/firestore';
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Pressable, View, Image, StyleSheet, Text, ImageSourcePropType } from 'react-native';

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
      setCardImage(CARD_STACK_IMAGES[cardCount - 1]);
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
          <View style={stylesArray[index]}>
          <Pressable
            style={styles.playerContainer}
            //KEY set as username - implement unique ID's and replace
            key={index}
          >
            <View style={styles.avatarCircle}>
              <Image style={styles.avatar} source={player.avatar} />
              <Image style={styles.drink} source={player.drink} />
            </View>
            <Text style={styles.name}>{player.username}</Text>
          </Pressable>
          </View>
        ))}
        </>
    );
    
  };

  return (
    <View style={styles.gameView}>
      {isCardVisible && <Card handlePoints={handlePoints} onClose={toggleCardVisibility} questionElement={questionsArray[cardCount]} />}
      <Text style={styles.cardsLeft}>Cards Left: {cardCount}</Text>
      <Text style={styles.cardsLeft}>Points: {points - drinks}</Text>
      <Text style={styles.cardsLeft}>Drinks: {drinks}</Text>
    
        <View style={styles.cardViewContainer}>
          <RenderPlayers playerArray={fetchedPlayers}/>
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

        </View>
  )
}

const styles = StyleSheet.create({
  gameView: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  cardViewContainer: {
    marginTop: 20,
    width: '90%',
    height: '70%',
    justifyContent: 'center',
  },
  cardViewTouchable: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardView: {
    height: '85%',
    resizeMode: 'contain',
  },
  firstAvatar: {
    position: 'absolute',
    top: '8%',
    left: '5%',
  },
  secondAvatar: {
    position: 'absolute',
    top: '6%',
    left: '48%',
  },
  thirdAvatar: {
    position: 'absolute',
    top: '8%',
    left: '87%',
  },
  fourthAvatar: {
    position: 'absolute',
    top: '45%',
    left: '87%',
  },
  fifthAvatar: {
    position: 'absolute',
    top: '80%',
    left: '87%',
  },
  sixthAvatar: {
    position: 'absolute',
    top: '90%',
    left: '48%',
  },
  seventhAvatar: {
    position: 'absolute',
    top: '80%',
    left: '5%',
  },
  eighthAvatar: {
    position: 'absolute',
    top: '45%',
    left: '5%',
  },
  playerContainer: {
    width: '50%',
    marginTop: 10,
    marginLeft: 10,
    aspectRatio: 1.5,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'pink',
  },
  avatarCircle: {
    width: '70%',
    aspectRatio: 1 / 1,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  avatar: {
    flex: 1,
    resizeMode: 'contain',
    width: '80%',
    height: '80%',
    alignSelf: 'center',
  },
  drink: {
    position: 'absolute',
    resizeMode: 'contain',
    width: '45%',
    height: '45%',
    alignSelf: 'flex-end',
    bottom: 0,
  },
  name: {
    marginLeft: 10,
    fontSize: 18,
    fontFamily: 'Basic',
    color: 'white',
  },
  avatarContainer: {
    flex: 1,
    backgroundColor: 'pink',
  },
  text: {
    color: 'white',
    fontSize: 40,
  },
  cardsLeft: {
    marginTop: 15,
    fontSize: 25,
    color: 'white',
    fontFamily: 'Basic',
  }
});