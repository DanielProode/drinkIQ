import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { onValue, ref, update } from 'firebase/database';
import { doc, updateDoc, increment } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Player } from './Lobby';
import Button from '../components/Button';
import CardStack from '../components/CardStack';
import LoadingScreen from '../components/LoadingScreen';
import PlayerAroundTable from '../components/PlayerAroundTable';
import { useAuth } from '../context/authContext';
import { FIREBASE_DB, FIREBASE_RTDB } from '../firebaseConfig.js';
import useGameStore from '../store/gameStore';
import useUserStore from '../store/userStore';

interface ActiveGameProps {
  navigation: NativeStackNavigationProp<any>;
};

export default function ActiveGame({ navigation }: ActiveGameProps) {
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameHost, setGameHost] = useState('');
  const [correctAnswerCount, setCorrectAnswerCount] = useState<number>(0);
  const [wrongAnswerCount, setWrongAnswerCount] = useState<number>(0);
  const [fetchedPlayers, setFetchedPlayers] = useState<Player[]>([]);
  const [currentTurnIndex, setCurrentTurnIndex] = useState<number>(0);
  const { authUser } = useAuth();
  const { roomCode } = useGameStore();
  const { username } = useUserStore();
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

  // TODO: Instead of username check UID or something in the future
  const isCurrentPlayersTurn = () => fetchedPlayers[currentTurnIndex].username === username;

  const checkGameWinner = () =>  { gameWon = wrongAnswerCount < correctAnswerCount ? 1 : 0; }
  
  // If the current index is the last in the array return the first player
  // Otherwise, return the next index in the array
  const getNextPlayerIndex = (currentIndex: number): number => (currentIndex === fetchedPlayers.length - 1 ? 0 : currentIndex + 1);

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

  const updateCurrentTurnInDatabase = async () => {
    const roomRef = ref(FIREBASE_RTDB, `rooms/${roomCode}`);

    try {
      await update(roomRef, { currentTurn: getNextPlayerIndex(currentTurnIndex) });
      console.log(`Current turn player with index: ` + currentTurnIndex);
    } catch (error) {
      console.error('Error updating current turn in database:', error);
    }
  }

  const updateGameOverInDatabase = async () => {
    setIsGameOver(true);
    const roomRef = ref(FIREBASE_RTDB, `rooms/${roomCode}`);

    try {
      await update(roomRef, { isGameOver: true });
      console.log(`Game over`);
    } catch (error) {
      console.error('Error ending game:', error);
    }
  };

  const endSessionInDatabase = async () => {
    const roomRef = ref(FIREBASE_RTDB, `rooms/${roomCode}`);

    try {
      await update(roomRef, { isSessionStarted: false, isGameOver: false });
      console.log(`Session ended`);
    } catch (error) {
      console.error('Error ending session:', error);
    }
  };

  const handleGameOver = () => {
    checkGameWinner();
    updateUserData();
    updateGameOverInDatabase();
  }

  useEffect(() => {
    const roomRef = ref(FIREBASE_RTDB, `rooms/${roomCode}`);
    const unsubscribe = onValue(roomRef, (snapshot) => {
      const roomData = snapshot.val();
      if (roomData.isSessionStarted === false) {
        navigation.goBack();
        return;
      }
      if (roomData) {
        const turnData: number = roomData.currentTurn;
        const gameOver: boolean = roomData.isGameOver;
        const hostData: string = roomData.gameHost;
        const playersData: Player = roomData.players;
        const playersArray = Object.values(playersData);

        setCurrentTurnIndex(turnData);
        setGameHost(hostData);
        setFetchedPlayers(playersArray);
        setIsGameOver(gameOver);
      }
    });

    return () => unsubscribe();
  }, []);

  if (fetchedPlayers.length === 0) {
    return <LoadingScreen />
  }

  return (
    <>
      <View style={styles.gameBackground}>
        <Text style={styles.drinkIQLogo}>Drink<Text style={styles.drinkIQOrange}>IQ</Text></Text>
        <Text style={styles.gameCode}>#{roomCode}</Text>
        <Text style={styles.gameCode}>Current turn: {fetchedPlayers[currentTurnIndex].username}</Text>
        {isGameOver ? (
          <>
            <Text style={styles.gameText}>GAME OVER!</Text>
            <Text style={styles.gameText}>Score: {correctAnswerCount - wrongAnswerCount} </Text>
            <Text style={styles.gameText}>Drinks: {wrongAnswerCount} </Text>

            {authUser?.uid === gameHost && <Button onPress={() => { navigation.goBack(); endSessionInDatabase(); }} style={styles.lobbyButton} text="BACK TO LOBBY" />}
          </>
        ) : (
          <>
            {fetchedPlayers.map((player, index) =>
              <PlayerAroundTable stylesArray={stylesArray[index]} key={player.username} player={player} />
            )}

            <CardStack onGameOver={handleGameOver} points={correctAnswerCount} drinks={wrongAnswerCount} setPoints={setCorrectAnswerCount} setDrinks={setWrongAnswerCount} updateTurn={updateCurrentTurnInDatabase} isTurn={isCurrentPlayersTurn()} />
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
