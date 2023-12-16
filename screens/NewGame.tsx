import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Keyboard, StyleSheet, Text, TextInput, View, TouchableWithoutFeedback } from 'react-native';
import { get, push, ref, set } from 'firebase/database';

import useUserStore from '../store/userStore';
import useGameStore from '../store/gameStore';
import Button from '../components/Button';
import { FIREBASE_RTDB } from '../firebaseConfig.js';
import { GAME_CODE_MAX, GAME_CODE_MIN } from '../constants/general';

interface NewGameProps {
  navigation: NativeStackNavigationProp<any>;
}

export default function NewGame({ navigation }: NewGameProps) {
  const [disabled, setDisabled] = useState(true);
  const [roomCode, setRoomCode] = useState('');
  const [error, setError] = useState('');
  const { username } = useUserStore();
  const { updatePlayerId } = useGameStore();
  
  const handleJoinGame = async () => {
    try {
      const codeExists = await checkRoomCode(roomCode);
      if (codeExists) {
        setError('')
        addPlayerToRoom(roomCode);
        navigation.navigate('Lobby', { roomCode })
      } else {
        setError(`Room ${roomCode} does not exist.`);
      }
    } catch (error) {
      console.error('Error starting the game:', error);
    }
  };

  const handleHostGame = async () => {
    try {
      let roomCode = generateGameCode();
      while (await checkRoomCode(roomCode)) {
        roomCode = generateGameCode();
      }

      await addRoomCode(roomCode);
      navigation.navigate('Lobby', { roomCode, gameHost: true });
    } catch (error) {
      console.error('Error starting the game:', error);
    }
  };

  const generateGameCode = () => {
    const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
    const generatedGameCode = randomInt(GAME_CODE_MIN, GAME_CODE_MAX).toString()
    console.log('Generated room code ' + generatedGameCode)
    return generatedGameCode;
  };

  const checkRoomCode = async (roomCode: string) => {
    const roomCodeRef = ref(FIREBASE_RTDB, `rooms/${roomCode}`);
    try {
      const snapshot = await get(roomCodeRef);
      return snapshot.exists();
    } catch (error) {
      console.error('Error checking room code:', error);
      return false;
    }
  };

  const addRoomCode = async (roomCode: string) => {
    const roomCodeRef = ref(FIREBASE_RTDB, `rooms/${roomCode}/players`);
    try {
      // Set initial room data here
      const newPlayerRef = push(roomCodeRef);
      await set(newPlayerRef, {username, avatar: 0, drink: 0, isHost: true});
      updatePlayerId(newPlayerRef.key);
      console.log(`Room code ${roomCode} added to the database.`);
    } catch (error) {
      console.error('Error adding room code to the database:', error);
    }
  };

  const addPlayerToRoom = async (roomCode: string) => {
    const roomCodeRef = ref(FIREBASE_RTDB, `rooms/${roomCode}/players`);
    try {
      const newPlayerRef = push(roomCodeRef);
      await set(newPlayerRef, {username, avatar: 0, drink: 0});
      updatePlayerId(newPlayerRef.key);
      console.log(`Player ${username} has joined the room.`);
    } catch (error) {
      console.error('Error joining room:', error);
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
