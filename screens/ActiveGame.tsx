import { onValue, ref, update } from 'firebase/database';
import { doc, updateDoc, increment } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Player } from './Lobby';
import Button from '../components/Button';
import CardStack from '../components/CardStack';
import LoadingScreen from '../components/LoadingScreen';
import PlayerAroundTable from '../components/PlayerAroundTable';
import { BACKGROUND_COLOR, PRIMARY_COLOR, SECONDARY_COLOR } from '../constants/styles/colors';
import { FONT_FAMILY_REGULAR, HEADER_FONT_SIZE, LOGO_FONT_FAMILY_REGULAR, REGULAR_LOGO_FONT_SIZE } from '../constants/styles/typography';
import { useAuth } from '../context/authContext';
import { FIREBASE_DB, FIREBASE_RTDB } from '../firebaseConfig.js';
import useGameStore from '../store/gameStore';

interface UpdateGameInfoInDatabaseParams {
  isGameOver?: boolean;
  isSessionStarted?: boolean;
  currentTurn?: number;
}

type Measurements = {
  height: number;
  width: number;
  x: number;
  y: number;
};

const defaultMeasurements = {
  height: 0,
  width: 0,
  x: 0,
  y: 0,
};

const stylesArray = [
  // AVATAR 1
  {
    x: 0,
    y: 0,
  },
  // AVATAR 2
  {
    x: 0,
    y: 0,
  },
  // AVATAR 3
  {
    x: 0,
    y: 0,
  },
  // AVATAR 4
  {
    x: 0,
    y: 0,
  },
  // AVATAR 5
  {
    x: 0,
    y: 0,
  },
  // AVATAR 6
  {
    x: 0,
    y: 0,
  },
  // AVATAR 7
  {
    x: 0,
    y: 0,
  },
  // AVATAR 8
  {
    x: 0,
    y: 0,
  },

]

let gameWon = 0;

const cardWidth = 300;
const cardHeight = 600;
const cardRadius = Math.min(cardWidth, cardHeight) / 2;
const symbolSize = 50;

export default function ActiveGame() {
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameHost, setGameHost] = useState('');
  const [correctAnswerCount, setCorrectAnswerCount] = useState<number>(0);
  const [wrongAnswerCount, setWrongAnswerCount] = useState<number>(0);
  const [fetchedPlayers, setFetchedPlayers] = useState<Player[]>([]);
  const [currentTurnIndex, setCurrentTurnIndex] = useState<number>(0);
  const { authUser } = useAuth();
  const { roomCode, updateIsSessionStarted } = useGameStore();
  const [measure, setMeasure] = useState<Measurements>(defaultMeasurements);
  const [measurementArray, setMeasurementArray] = useState(stylesArray);
  const userId = authUser ? authUser.uid : '';


  const isCurrentPlayersTurn = () => fetchedPlayers[currentTurnIndex].userId === userId;

  const checkGameWinner = () => { gameWon = wrongAnswerCount < correctAnswerCount ? 1 : 0; }

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

  const updateGameInfoInDatabase = async (gameParams: UpdateGameInfoInDatabaseParams) => {
    const roomRef = ref(FIREBASE_RTDB, `rooms/${roomCode}`);

    try {
      await update(roomRef, gameParams);
      //console.log(`${JSON.stringify(gameParams)} updated in database`);
    } catch (error) {
      console.error(`Error updating ${JSON.stringify(gameParams)} in database:`, error);
    }
  }

  const setAnsweredText = (isAnswerCorrect: boolean) => {
    const currentPlayer = fetchedPlayers[currentTurnIndex].username;

    if (isCurrentPlayersTurn()) {
      return isAnswerCorrect ? "Correct, choose who has to drink!" : "Wrong, take a sip!";
    } else {
      return isAnswerCorrect ? `Correct, ${currentPlayer} chooses who has to drink!` : `Wrong, ${currentPlayer} takes a sip!`;
    }
  };

  const handleGameOver = () => {
    checkGameWinner();
    updateUserData();
    updateGameInfoInDatabase({ isGameOver: true })
  }

  const setCardLocation = (measurements: Measurements) => {
    setMeasure(measurements)
  }

  
  const degToRad = (deg: number) => {
    return deg * Math.PI / 180;
  }

  const calculateAvatarPositions = () => {

    for ( let i = 0; i < fetchedPlayers.length; i++ ) {
      const angleDeg = (360 / fetchedPlayers.length) * i;
      const angleRad = degToRad(angleDeg);
      const x = cardRadius * Math.cos(angleRad) + cardWidth / 2 - symbolSize / 2;
      const y = cardRadius * Math.sin(angleRad) + cardHeight / 2 - symbolSize / 2;
      stylesArray[i].x = x;
      stylesArray[i].y = y;
      console.log("Calculated avatar ", i, "X: ", stylesArray[i].x, "Y: ", stylesArray[i].y)
      console.log("Measure: ", measure)
    }
    
      setMeasurementArray(stylesArray);
  }

  useEffect(() => {
    const roomRef = ref(FIREBASE_RTDB, `rooms/${roomCode}`);
    const unsubscribe = onValue(roomRef, (snapshot) => {
      const roomData = snapshot.val();
      if (roomData.isSessionStarted === false) {
        updateIsSessionStarted(false);
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

  useEffect(() => {
    //CHANGE this to run only once when game started
    if (fetchedPlayers) {
      console.log("Fetched players: ", fetchedPlayers.length)
      calculateAvatarPositions();
    }
  })

  if (fetchedPlayers.length === 0) {
    return <LoadingScreen />
  }

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

            {authUser?.uid === gameHost && <Button onPress={() => { updateIsSessionStarted(false); updateGameInfoInDatabase({ isSessionStarted: false, isGameOver: false }); }} style={styles.lobbyButton} text="BACK TO LOBBY" />}
          </>
        ) : (
          <>
            <Text style={styles.gameCode}>Current turn: {fetchedPlayers[currentTurnIndex].username}</Text>
            {fetchedPlayers.map((player, index) =>
              <PlayerAroundTable stylesArray={measurementArray[index]} key={player.userId} player={player} />
            )}
            <CardStack onGameOver={handleGameOver} points={correctAnswerCount} drinks={wrongAnswerCount} setPoints={setCorrectAnswerCount} setDrinks={setWrongAnswerCount} updateTurn={() => updateGameInfoInDatabase({ currentTurn: getNextPlayerIndex(currentTurnIndex) })} isTurn={isCurrentPlayersTurn()} answeredText={setAnsweredText} setCardLocation={setCardLocation}/>
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
    backgroundColor: BACKGROUND_COLOR,
  },
  drinkIQLogo: {
    fontFamily: LOGO_FONT_FAMILY_REGULAR,
    marginTop: 50,
    fontSize: REGULAR_LOGO_FONT_SIZE,
    color: SECONDARY_COLOR,
    letterSpacing: 3,
  },
  drinkIQOrange: {
    fontFamily: LOGO_FONT_FAMILY_REGULAR,
    marginTop: 50,
    fontSize: REGULAR_LOGO_FONT_SIZE,
    color: PRIMARY_COLOR,
  },
  gameText: {
    fontFamily: LOGO_FONT_FAMILY_REGULAR,
    fontSize: REGULAR_LOGO_FONT_SIZE,
    marginTop: 100,
    color: SECONDARY_COLOR,
  },
  lobbyButton: {
    marginTop: 80,
  },
  gameCode: {
    fontSize: HEADER_FONT_SIZE,
    color: SECONDARY_COLOR,
    fontFamily: FONT_FAMILY_REGULAR,
  },
});
