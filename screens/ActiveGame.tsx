import { doc, updateDoc, increment } from "firebase/firestore";
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, Text, View, ImageSourcePropType } from 'react-native';

import Button from '../components/Button';
import CardStack from '../components/CardStack';
import { FIREBASE_DB } from '../firebaseConfig.js';
import { useAuth } from '../context/authContext';

export type Props = {
  route: RouteProp<{
    ActiveGame: {
      gameCode: number;
      avatar: ImageSourcePropType;
      drink: ImageSourcePropType;
    }
  }>;
  navigation: NativeStackNavigationProp<any>;
};

export default function ActiveGame({ route, navigation }: Props) {
  const { gameCode, avatar, drink } = route.params;
  const [isGameOver, setIsGameOver] = useState(false);
  const [correctAnswerCount, setCorrectAnswerCount] = useState<number>(0);
  const [wrongAnswerCount, setWrongAnswerCount] = useState<number>(0);
  const { user } = useAuth();
  const db = FIREBASE_DB;
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
      if (user) {
        const userDoc = doc(db, 'users', user.uid);
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
        <View style={styles.gameView}>
          <Text style={styles.drinkIQLogo}>DRINKIQ</Text>
          <Text style={styles.gameCode}>#{gameCode}</Text>
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
            <CardStack onGameOver={handleGameOver} avatar={avatar} drink={drink} points={correctAnswerCount} drinks={wrongAnswerCount} setPoints={setCorrectAnswerCount} setDrinks={setWrongAnswerCount} />
          )}
        </View>
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
  gameView: {
    flex: 1,
    alignItems: 'center',
  },
  drinkIQLogo: {
    fontFamily: 'Knewave',
    marginTop: 50,
    fontSize: 30,
    color: 'white',
  },
  gameText: {
    fontSize: 50,
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
    marginTop: 40,
  },
  gameCode: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Basic',
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
  cardView: {
    flex: 1,
    resizeMode: 'contain',
  },
});