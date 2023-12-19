import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { doc, updateDoc, increment } from "firebase/firestore";
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from '../components/Button';
import CardStack from '../components/CardStack';
import PlayerAroundTable from '../components/PlayerAroundTable';
import { DEFAULT_AVATAR_IMAGE, DEFAULT_DRINK_IMAGE } from '../constants/general';
import { BACKGROUND_COLOR, ORANGE, WHITE } from '../constants/styles/colors';
import { FONT_FAMILY_REGULAR, HEADER_FONT_SIZE, LOGO_FONT_FAMILY_REGULAR, REGULAR_LOGO_FONT_SIZE } from '../constants/styles/typography';
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

export default function ActiveGame({ route, navigation }: ActiveGameProps) {
  const { gameCode } = route.params;
  const [isGameOver, setIsGameOver] = useState(false);
  const [correctAnswerCount, setCorrectAnswerCount] = useState<number>(0);
  const [wrongAnswerCount, setWrongAnswerCount] = useState<number>(0);
  const { authUser } = useAuth();
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
    backgroundColor: BACKGROUND_COLOR,
  },
  drinkIQLogo: {
    fontFamily: LOGO_FONT_FAMILY_REGULAR,
    marginTop: 50,
    fontSize: REGULAR_LOGO_FONT_SIZE,
    color: WHITE,
    letterSpacing: 3,
  },
  drinkIQOrange: {
    fontFamily: LOGO_FONT_FAMILY_REGULAR,
    marginTop: 50,
    fontSize: REGULAR_LOGO_FONT_SIZE,
    color: ORANGE,
  },
  gameText: {
    fontFamily: LOGO_FONT_FAMILY_REGULAR,
    fontSize: REGULAR_LOGO_FONT_SIZE,
    marginTop: 100,
    color: WHITE,
  },
  lobbyButton: {
    marginTop: 80,
  },
  gameCode: {
    fontSize: HEADER_FONT_SIZE,
    color: WHITE,
    fontFamily: FONT_FAMILY_REGULAR,
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
