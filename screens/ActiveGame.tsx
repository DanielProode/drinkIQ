import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { doc, updateDoc, increment } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from '../components/Button';
import CardStack from '../components/CardStack';
import PlayerAroundTable from '../components/PlayerAroundTable';
import { DEFAULT_AVATAR_IMAGE, DEFAULT_DRINK_IMAGE } from '../constants/general';
import { useAuth } from '../context/authContext';
import { FIREBASE_DB } from '../firebaseConfig.js';
import { onValue, ref } from 'firebase/database';
import useGameStore from '../store/gameStore';

interface ActiveGameProps {
  navigation: NativeStackNavigationProp<any>;
};

// FETCH all players from session, including the current player, and later on check which player in list is current player, and go from there
const fetchedPlayers = [{ username: "Bot Alfred", avatar: DEFAULT_AVATAR_IMAGE, drink: DEFAULT_DRINK_IMAGE },
{ username: "Bot Allu", avatar: DEFAULT_AVATAR_IMAGE, drink: DEFAULT_DRINK_IMAGE },
{ username: "Bot Pete", avatar: DEFAULT_AVATAR_IMAGE, drink: DEFAULT_DRINK_IMAGE },
{ username: "Bot Viktor", avatar: DEFAULT_AVATAR_IMAGE, drink: DEFAULT_DRINK_IMAGE },
{ username: "Bot Albert", avatar: DEFAULT_AVATAR_IMAGE, drink: DEFAULT_DRINK_IMAGE },
{ username: "Bot Sasha", avatar: DEFAULT_AVATAR_IMAGE, drink: DEFAULT_DRINK_IMAGE },
{ username: "Bot Anubis", avatar: DEFAULT_AVATAR_IMAGE, drink: DEFAULT_DRINK_IMAGE },
{ username: "Bot Anubis2", avatar: DEFAULT_AVATAR_IMAGE, drink: DEFAULT_DRINK_IMAGE },
]

export default function ActiveGame({ navigation }: ActiveGameProps) {
  const [isGameOver, setIsGameOver] = useState(false);
  const [correctAnswerCount, setCorrectAnswerCount] = useState<number>(0);
  const [wrongAnswerCount, setWrongAnswerCount] = useState<number>(0);
  const { authUser } = useAuth();
  const { roomCode } = useGameStore();
  let gameWon = 0;

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

  const checkGameWinner = () => {
    if (wrongAnswerCount < correctAnswerCount) {
      gameWon = 1;
    }
    else {
      gameWon = 0;
    }
  }

  const updateUserData = async () => {
    try {
      if (authUser) {
        const userDoc = doc(FIREBASE_DB, 'users', authUser.uid);
        await updateDoc(userDoc, {
          total_points: increment(correctAnswerCount - wrongAnswerCount),
          total_drinks: increment(wrongAnswerCount),
          games_won: increment(gameWon)
        })
      }
      else {
        console.log('User object does not exist')
      }
    } catch (error) {
      console.error('Error updating user data: ', error);
    }
  }

  const handleGameOver = () => {
    console.log("Game over!");
    checkGameWinner();
    setIsGameOver(true);
    updateUserData();
  }

  // useEffect(() => {
  //   const roomRef = ref(FIREBASE_RTDB, `rooms/${roomCode}`);
  //   const unsubscribe = onValue(roomRef, (snapshot) => {
  //     const roomData = snapshot.val();
  //     if (roomData) {
  //       const cardDeckRef: number = roomData.cardDeck;
  //       const playersData: Player = roomData.players;
  //       const playersArray = Object.values(playersData);

  //       setFetchedPlayers(playersArray);
  //       updatePlayableDeckIndex(cardDeckRef);
  //     } else {
  //       isLobbyDestroyed = true;
  //       navigation.navigate('NewGame');
  //     }
  //   });

  //   return () => unsubscribe();
  // }, []);

  return (
    <>
      <View style={styles.gameBackground}>
        <Text style={styles.drinkIQLogo}>Drink<Text style={styles.drinkIQOrange}>IQ</Text></Text>
        <Text style={styles.gameCode}>#{roomCode}</Text>
        {isGameOver ? (
          <>
            <Text style={styles.gameText}>GAME OVER!</Text>
            <Text style={styles.gameText}>Score: {correctAnswerCount - wrongAnswerCount} </Text>
            <Text style={styles.gameText}>Drinks: {wrongAnswerCount} </Text>
            <Button
              onPress={() => navigation.goBack()}
              style={styles.lobbyButton}
              text="BACK TO LOBBY" />
          </>
        ) : (
          <>
            {fetchedPlayers.map((player, index) =>
              <PlayerAroundTable stylesArray={stylesArray[index]} key={player.username} player={player} index={index} />
            )}

            <CardStack onGameOver={handleGameOver} points={correctAnswerCount} drinks={wrongAnswerCount} setPoints={setCorrectAnswerCount} setDrinks={setWrongAnswerCount} />
          </>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  gameBackground: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  drinkIQLogo: {
    fontFamily: 'JetbrainsMono-Bold',
    marginTop: 50,
    fontSize: 30,
    color: 'white',
    letterSpacing: 3,
  },
  drinkIQOrange: {
    fontFamily: 'JetbrainsMono-Bold',
    marginTop: 50,
    fontSize: 30,
    color: '#F76D31',
  },
  gameText: {
    fontFamily: 'JetbrainsMono-Bold',
    fontSize: 30,
    marginTop: 100,
    color: 'white',
  },
  lobbyButton: {
    marginTop: 80,
  },
  gameCode: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'JosefinSans-Regular',
  },
  seventhAvatar: {
    position: 'absolute',
    top: '22%',
    left: '5%',
  },
  firstAvatar: {
    position: 'absolute',
    top: '18%',
    left: '41%',
  },
  fifthAvatar: {
    position: 'absolute',
    top: '22%',
    left: '78%',
  },
  thirdAvatar: {
    position: 'absolute',
    top: '45%',
    left: '80%',
  },
  eighthAvatar: {
    position: 'absolute',
    top: '68%',
    left: '78%',
  },
  secondAvatar: {
    position: 'absolute',
    top: '72%',
    left: '41%',
  },
  sixthAvatar: {
    position: 'absolute',
    top: '68%',
    left: '5%',
  },
  fourthAvatar: {
    position: 'absolute',
    top: '45%',
    left: '3%',
  },
});
