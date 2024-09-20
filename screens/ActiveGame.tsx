import { onValue, ref, update } from 'firebase/database';
import { doc, updateDoc, increment } from "firebase/firestore";
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View, TouchableOpacity, Animated, ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import * as Clipboard from 'expo-clipboard';

import { Player } from './Lobby';
import Button from '../components/Button';
import CardStack from '../components/CardStack';
import FadeOutView from '../components/FadeOutView';
import LoadingScreen from '../components/LoadingScreen';
import { BACKGROUND_COLOR, PRIMARY_COLOR, SECONDARY_COLOR } from '../constants/styles/colors';
import { FONT_FAMILY_BOLD, FONT_FAMILY_REGULAR, HEADER_FONT_SIZE, LOGO_FONT_FAMILY_REGULAR, MEDIUM_FONT_SIZE, REGULAR_LOGO_FONT_SIZE } from '../constants/styles/typography';
import { useAuth } from '../context/authContext';
import { FIREBASE_DB, FIREBASE_RTDB } from '../firebaseConfig.js';
import useGameStore from '../store/gameStore';
import useUserStore from '../store/userStore';
import { SPACING_MD, SPACING_SM, SPACING_XS } from '../constants/styles/style';
import React from 'react';

interface UpdateGameInfoInDatabaseParams {
  isGameOver?: boolean;
  isSessionStarted?: boolean;
  currentTurn?: number;
}

export default function ActiveGame() {
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameHost, setGameHost] = useState('');
  const [correctAnswerCount, setCorrectAnswerCount] = useState<number>(0);
  const [wrongAnswerCount, setWrongAnswerCount] = useState<number>(0);
  const [fetchedPlayers, setFetchedPlayers] = useState<Player[]>([]);
  const [currentTurnIndex, setCurrentTurnIndex] = useState<number>(0);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const { authUser } = useAuth();
  const { roomCode, updateIsSessionStarted } = useGameStore();
  const userId = authUser ? authUser.uid : '';
  let gameWon = 0;


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

        // Fetch the current state from Zustand
        const { total_points, total_drinks, games_won } = useUserStore.getState();

        // Increment the values to the Zustand state as well
        useUserStore.getState().updateTotalPoints(total_points + (correctAnswerCount - wrongAnswerCount));
        useUserStore.getState().updateTotalDrinks(total_drinks + wrongAnswerCount);
        useUserStore.getState().updateGamesWon(games_won + gameWon);
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
      // console.log(`${JSON.stringify(gameParams)} updated in database`);
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

  if (fetchedPlayers.length === 0) {
    return <LoadingScreen />
  }

  const copyToClipboard = (copiedString: string) => {
    if (!copiedToClipboard) {
      Clipboard.setStringAsync(copiedString)
      setCopiedToClipboard(true);
      setTimeout(() => setCopiedToClipboard(false),
        1500
    )
    }
  }

  return (
    <>
      <View style={styles.gameBackground}>
        <View style={styles.header}>
          <Text style={styles.drinkIQLogo}>Drink<Text style={styles.drinkIQOrange}>IQ</Text></Text>
          <TouchableOpacity style={styles.roomCodeContainer} onPress={() => copyToClipboard(roomCode)}>
            <View style={styles.bottomContainer}>
            <Text style={styles.gameCode}>    #{roomCode}</Text> 
              <Image style={styles.copyIcon} source={require('../assets/images/copy_icon.png')}/>
            </View>
            {copiedToClipboard ? 
            <FadeOutView style={{}}>
              <Text style={styles.copiedText}>Copied!</Text> 
            </FadeOutView>
            

            : null }
          </TouchableOpacity>
        </View>
        
        {isGameOver ? (
          <>
            <Text style={styles.gameText}>GAME OVER</Text>
            <Text style={styles.gameText}>Score: {correctAnswerCount - wrongAnswerCount} </Text>
            <Text style={styles.gameText}>Drinks: {wrongAnswerCount} </Text>

            {authUser?.uid === gameHost && <Button onPress={() => { updateIsSessionStarted(false); updateGameInfoInDatabase({ isSessionStarted: false, isGameOver: false }); }} style={styles.lobbyButton} text="BACK TO LOBBY" />}
          </>
        ) : (
            <CardStack isCurrentPlayersTurn={isCurrentPlayersTurn()} currentTurn={fetchedPlayers[currentTurnIndex].userId} fetchedPlayers={fetchedPlayers} onGameOver={handleGameOver} points={correctAnswerCount} drinks={wrongAnswerCount} setPoints={setCorrectAnswerCount} setDrinks={setWrongAnswerCount} updateTurn={() => updateGameInfoInDatabase({ currentTurn: getNextPlayerIndex(currentTurnIndex) })} isTurn={isCurrentPlayersTurn()} answeredText={setAnsweredText} />
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
  header: {
    marginTop: 50,
    width: '90%',
    alignItems: 'center',
  },
  drinkIQLogo: {
    justifyContent: 'flex-start',
    fontFamily: LOGO_FONT_FAMILY_REGULAR,
    fontSize: REGULAR_LOGO_FONT_SIZE,
    color: SECONDARY_COLOR,
    letterSpacing: 3,
  },
  roomCodeContainer: {
    height: 40,
    flexDirection: 'column',
    gap: SPACING_XS,
    alignItems: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    alignSelf: 'center',
  },
  copyIcon: {
    width: SPACING_SM,
    height: SPACING_SM,
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: SPACING_XS,
  },
  copiedContainer: {
    flexDirection: 'column',
  },
  copiedText: {
    fontFamily: FONT_FAMILY_REGULAR,
    fontSize: MEDIUM_FONT_SIZE,
    color: SECONDARY_COLOR,
  },
  checkIcon: {
    width: SPACING_SM,
    height: SPACING_SM,
    alignSelf: 'center',
    justifyContent: 'center',
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
