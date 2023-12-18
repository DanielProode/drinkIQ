import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { equalTo, get, orderByChild, push, query, ref, set } from 'firebase/database';
import { useRef, useState } from 'react';
import { Keyboard, StyleSheet, Text, TextInput, View, TouchableWithoutFeedback } from 'react-native';

import Button from '../components/Button';
import { GAME_CODE_MAX, GAME_CODE_MIN } from '../constants/general';
import { FIREBASE_RTDB } from '../firebaseConfig.js';
import useGameStore from '../store/gameStore';
import useUserStore from '../store/userStore';

interface NewGameProps {
  navigation: NativeStackNavigationProp<any>;
}

export default function NewGame({ navigation }: NewGameProps) {
  const [disabled, setDisabled] = useState(true);
  const [roomCode, setRoomCode] = useState('');
  const [error, setError] = useState('');
  const { username } = useUserStore();
  const { playerId, updatePlayerId } = useGameStore();
  const playerIdRef = useRef<string | null>(null);

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
      await addPlayerToRoom(roomCode);
      updatePlayerId(playerIdRef.current);
      console.log(`Player ${username} with ID: ${playerId} has joined the room.`);
      navigation.navigate('Lobby', { roomCode });
    } catch (error) {
      console.error('Error joining the game: ', error);
    }
  };

  const handleHostGame = async () => {
    try {
      let roomCode = generateGameCode();
      while (await checkRoomCode(roomCode)) {
        roomCode = generateGameCode();
      }

      await createRoom(roomCode);
      updatePlayerId(playerIdRef.current);
      console.log(`Player ${username} with ID: ${playerId} has joined the room.`);
      navigation.navigate('Lobby', { roomCode, gameHost: true });
    } catch (error) {
      console.error('Error starting the game:', error);
    }
  };

  const addPlayerToRoom = async (roomCode: string) => {
    try {
      const playersRef = ref(FIREBASE_RTDB, `rooms/${roomCode}/players`);
      const newPlayerRef = push(playersRef);
      await set(newPlayerRef, { username, avatar: 0, drink: 0 }).then(() => { playerIdRef.current = newPlayerRef.key });
    } catch (error) {
      console.error('Error joining room:', error);
    }
  };

  const createRoom = async (roomCode: string) => {
    try {
      const roomCodeRef = ref(FIREBASE_RTDB, `rooms/${roomCode}/players`);
      const newPlayerRef = push(roomCodeRef);
      // Set initial room data here
      await set(newPlayerRef, { username, avatar: 0, drink: 0, isHost: true }).then(() => { playerIdRef.current = newPlayerRef.key });
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
      const isRoomFull = numberOfPlayers >= 8 ? true : false;
      return isRoomFull;
    } catch (error) {
      console.error('Error checking room code:', error);
      return false;
    }
  };

  //TODO: Use UID instead of username
  const checkPlayer = async (roomCode: string) => {
    try {
      const playersRef = ref(FIREBASE_RTDB, `rooms/${roomCode}/players`);
      const findPlayerQuery = query(playersRef, orderByChild('username'), equalTo(username));
      const snapshot = await get(findPlayerQuery);
      if (snapshot.exists()) {
        console.log('Player already exists in lobby with key ' + snapshot.key)
      } else {
        console.log('No matching users found')
      }
    } catch (error) {
      console.error('Error checking players:', error);
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
    setRoomCode(newText);

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
            onSubmitEditing={(value) => setRoomCode(value.nativeEvent.text)}
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
    backgroundColor: '#1E1E1E',
    flex: 1,
  },
  drinkIQLogo: {
    fontFamily: 'JetbrainsMono-Bold',
    marginTop: 50,
    fontSize: 30,
    color: 'white',
    letterSpacing: 3,
  },
  drinkIQOrange: {
    color: '#F76D31',
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
    fontSize: 40,
    marginTop: 20,
  },
  gameCodeInput: {
    marginTop: 20,
    width: 150,
    borderBottomWidth: 3,
    padding: 10,
    borderColor: 'gray',
    textAlign: 'center',
    fontFamily: 'JosefinSans-Bold',
    fontSize: 24,
    color: 'white',
  },
  hostGameButton: {
    alignItems: 'center',
    height: 50,
    width: 100,
    marginTop: 30,
  },
  hostGameText: {
    fontFamily: 'JosefinSans-Bold',
    color: 'white',
    fontSize: 18,
    marginTop: 130,
  },
  error: {
    color: 'red',
    marginTop: 20,
  },
});
