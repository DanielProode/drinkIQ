import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { doc, updateDoc, increment } from "firebase/firestore";
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from '../components/Button';
import CardStack from '../components/CardStack';
import { useAuth } from '../context/authContext';
import { FIREBASE_DB } from '../firebaseConfig.js';

interface ActiveGameProps {
  route: RouteProp<{
    ActiveGame: {
      gameCode: string;
    }
  }>;
  navigation: NativeStackNavigationProp<any>;
};

export default function ActiveGame({ route, navigation }: ActiveGameProps) {
  const { gameCode } = route.params;
  const [isGameOver, setIsGameOver] = useState(false);
  const [correctAnswerCount, setCorrectAnswerCount] = useState<number>(0);
  const [wrongAnswerCount, setWrongAnswerCount] = useState<number>(0);
  const { authUser } = useAuth();
  let gameWon = 0;

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

  return (
    <>
      <View style={styles.gameBackground}>
      <Text style={styles.drinkIQLogo}>Drink<Text style={styles.drinkIQOrange}>IQ</Text></Text>
          <Text style={styles.gameCode}>#{gameCode}</Text>
          {isGameOver ? (
            <>
              <Text style={styles.gameText}>GAME OVER!</Text>
              <Text style={styles.gameText}>Score: {correctAnswerCount - wrongAnswerCount} </Text>
              <Text style={styles.gameText}>Drinks: {wrongAnswerCount} </Text>
              <View style={styles.lobbyButtonContainer}>
                <Button
                  onPress={() => navigation.goBack()}
                  style={styles.lobbyButton}
                  text="BACK TO LOBBY" />
              </View>
              
            </>
          ) : (
            <>
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
  cardsLeft: {
    marginTop: 30,
    fontSize: 25,
    color: 'white',
    fontFamily: 'Basic',
  },
  avatar: {
    flex: 1,
    resizeMode: 'contain',
    width: '70%',
    height: '70%',
    alignSelf: 'center',
  },
  drink: {
    flex: 1,
    resizeMode: 'contain',
    width: '70%',
    height: '70%',
    alignSelf: 'center',
  },
  drinkContainer: {
    flex: 1,
    width: 50,
    height: 50,
    position: 'absolute',
    top: 260,
    right: 120,
  },
  lobbyButton: {
    marginTop: 80,
  },
  gameCode: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'JosefinSans-Regular',
  },
  cardViewContainer: {
    marginTop: 130,
    width: 220,
    height: 300,
  },
  cardViewTouchable: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  lobbyButtonContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cardView: {
    flex: 1,
    resizeMode: 'contain',
  },
});
