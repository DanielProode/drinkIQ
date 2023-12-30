import { get, ref, set, update } from 'firebase/database';
import { useState } from 'react';
import { Keyboard, StyleSheet, Text, TextInput, View, TouchableWithoutFeedback } from 'react-native';

import Button from '../components/Button';
import { GAME_CODE_MAX, GAME_CODE_MIN } from '../constants/general';
import { BACKGROUND_COLOR, PRIMARY_COLOR, SECONDARY_COLOR } from '../constants/styles/colors';
import { FONT_FAMILY_BOLD, LOGO_FONT_FAMILY_REGULAR, MEDIUM_LOGO_FONT_SIZE, REGULAR_FONT_SIZE, REGULAR_LOGO_FONT_SIZE, TITLE_FONT_SIZE } from '../constants/styles/typography';
import { useAuth } from '../context/authContext';
import { FIREBASE_RTDB } from '../firebaseConfig.js';
import useGameStore from '../store/gameStore';
import useUserStore from '../store/userStore';

export default function NewGame() {
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState('');
  const { username } = useUserStore();
  const { avatar, drink, roomCode, updateRoomCode, updateIsLobbyStarted, updateIsGameHost } = useGameStore();
  const { authUser } = useAuth();
  const userId = authUser ? authUser.uid : '';

  const handleJoinGame = async () => {
    try {
      setError('')
      const codeExists = await checkRoomCode(roomCode);
      if (!codeExists) {
        setError(`Room ${roomCode} does not exist`);
        return;
      }
      const isRoomFull = await checkNumberOfPlayers(roomCode);
      if (isRoomFull) {
        setError(`Room ${roomCode} is already full`);
        return;
      }
      const isSessionActive = await checkIsSessionActive(roomCode);
      if (isSessionActive) {
        setError(`Game has already started`);
        return;
      }
      await addPlayerToRoom(roomCode);
      console.log(`Player ${username} has joined the room.`);
      const isPlayerHost = await checkIsGameHost(roomCode);
      if (isPlayerHost) { 
        updateIsLobbyStarted(true);
        updateIsGameHost(true);
      }
      else { 
        updateIsLobbyStarted(true);
      }
    } catch (error) {
      console.error('Error joining the game: ', error);
    }
  };

  const handleHostGame = async () => {
    try {
      let generatedRoomCode = generateGameCode();
      while (await checkRoomCode(generatedRoomCode)) {
        generatedRoomCode = generateGameCode();
      }

      await createRoom(generatedRoomCode);
      updateRoomCode(generatedRoomCode)
      console.log(`Player ${username} has joined the room.`);
      updateIsLobbyStarted(true);
      updateIsGameHost(true);
    } catch (error) {
      console.error('Error starting the game:', error);
    }
  };

  const addPlayerToRoom = async (roomCode: string) => {
    try {
      const playersRef = ref(FIREBASE_RTDB, `rooms/${roomCode}/players`);
      await update(playersRef, { [userId]: { userId, username, avatar, drink }});
    } catch (error) {
      console.error('Error joining room:', error);
    }
  };

  const createRoom = async (roomCode: string) => {
    try {
      const roomCodeRef = ref(FIREBASE_RTDB, `rooms/${roomCode}`);
      // Set initial room data here
      await set(roomCodeRef, { gameHost: userId, cardDeck: 0, players: { [userId]: { userId, username, avatar, drink } }});
      console.log(`Room code ${roomCode} added to the database.`);
    } catch (error) {
      console.error('Error adding room to the database:', error);
    }
  };

  const generateGameCode = () => {
    const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
    const generatedGameCode = randomInt(GAME_CODE_MIN, GAME_CODE_MAX).toString();
    console.log('Generated room code ' + generatedGameCode)
    return generatedGameCode;
  };

  const checkRoomCode = async (roomCode: string) => {
    try {
      const roomCodeRef = ref(FIREBASE_RTDB, `rooms/${roomCode}`);
      const snapshot = await get(roomCodeRef);
      return snapshot.exists();
    } catch (error) {
      console.error('Error checking room code:', error);
      return false;
    }
  };

  const checkNumberOfPlayers = async (roomCode: string) => {
    try {
      const playersRef = ref(FIREBASE_RTDB, `rooms/${roomCode}/players`);
      const snapshot = await get(playersRef);
      const numberOfPlayers = snapshot.size;
      const isRoomFull = numberOfPlayers >= 8;
      return isRoomFull;
    } catch (error) {
      console.error('Error checking room code:', error);
      return false;
    }
  };

  const checkIsGameHost = async (roomCode: string) => {
    try {
      const roomRef = ref(FIREBASE_RTDB, `rooms/${roomCode}`);
      const snapshot = await get(roomRef);
      const gameHost = snapshot.val().gameHost;
      const isUserHost = userId === gameHost;
      return isUserHost;
    } catch (error) {
      console.error('Error checking room code:', error);
      return false;
    }
  };

  const checkIsSessionActive = async (roomCode: string) => {
    const roomRef = ref(FIREBASE_RTDB, `rooms/${roomCode}/`);
    try {
      const snapshot = await get(roomRef);
      const sessionStarted = snapshot.val().isSessionStarted;
      if (sessionStarted) return true;
    } catch (error) {
      console.error('Error checking room code:', error);
      return false;
    }
  };

  const onChanged = (text: string) => {
    const numbers = '0123456789';
    let newText = '';

    for (let i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      }
    }
    updateRoomCode(newText);

    if (text.length === 6) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
      <View style={styles.newGameView}>
        <Text style={styles.drinkIQLogo}>Drink<Text style={styles.drinkIQOrange}>IQ</Text></Text>
        <View style={styles.gameCodeContainer}>
          <Text style={styles.hashtag}>#</Text>
          <TextInput
            style={styles.gameCodeInput}
            onChangeText={(text) => onChanged(text)}
            value={roomCode}
            onSubmitEditing={(value) => updateRoomCode(value.nativeEvent.text)}
            placeholder="XXXXXX"
            keyboardType="numeric"
            maxLength={6}
            placeholderTextColor="#FFFFFF80"
          />
        </View>
        {error && <Text style={styles.error}>{error}</Text>}
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => {
              Keyboard.dismiss();
              handleJoinGame();
            }}
            text="JOIN GAME"
            disabled={disabled}
            buttonBgColor="#F76D31"
            buttonBorderColor="#F76D31" />
        </View>
        <Text style={styles.hostGameText}>Want to create your own game?</Text>
        <View style={styles.hostGameButton}>
          <Button onPress={handleHostGame}
            text="HOST GAME"
            buttonBgColor="#D36C50"
            buttonBorderColor="#D36C50" />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  newGameView: {
    alignItems: 'center',
    backgroundColor: BACKGROUND_COLOR,
    flex: 1,
  },
  drinkIQLogo: {
    fontFamily: LOGO_FONT_FAMILY_REGULAR,
    marginTop: 50,
    fontSize: REGULAR_LOGO_FONT_SIZE,
    color: SECONDARY_COLOR,
    letterSpacing: 3,
  },
  drinkIQOrange: {
    color: PRIMARY_COLOR,
  },
  buttonContainer: {
    marginTop: 30,
  },
  gameCodeContainer: {
    marginTop: 100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  hashtag: {
    color: 'gray',
    fontSize: MEDIUM_LOGO_FONT_SIZE,
    marginTop: 20,
  },
  gameCodeInput: {
    marginTop: 20,
    width: 150,
    borderBottomWidth: 3,
    padding: 10,
    borderColor: 'gray',
    textAlign: 'center',
    fontFamily: FONT_FAMILY_BOLD,
    fontSize: TITLE_FONT_SIZE,
    color: SECONDARY_COLOR,
  },
  hostGameButton: {
    alignItems: 'center',
    height: 50,
    width: 100,
    marginTop: 30,
  },
  hostGameText: {
    fontFamily: FONT_FAMILY_BOLD,
    color: SECONDARY_COLOR,
    fontSize: REGULAR_FONT_SIZE,
    marginTop: 130,
  },
  error: {
    color: 'red',
    marginTop: 20,
  },
});
