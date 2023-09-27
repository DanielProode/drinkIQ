import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View, ImageSourcePropType, Pressable } from 'react-native';

import Button from '../components/Button';
import Card from '../components/Card';

export type Props = {
  route: RouteProp<{
    GameView: {
      gameCode: number;
      avatar: ImageSourcePropType;
      drink: ImageSourcePropType;
    }
  }>;
  navigation: NativeStackNavigationProp<any>;
};

const baseCardImage = require('../assets/images/card5_icon.png');
const cardImageArray = [
  require('../assets/images/card1_icon.png'),
  require('../assets/images/card2_icon.png'),
  require('../assets/images/card3_icon.png'),
  require('../assets/images/card4_icon.png'),
  require('../assets/images/card5_icon.png')];

const questionArray = [
  {question: "Kaja Kallase vanus?", answer1: 44, answer2: 42, answer3: 40, answer4: 46, correct: 2},
  {question: "Kes oli Eesti peaminister aastal 2021?", answer1: "Mart Helme", answer2: "Siim Kallas", answer3: "Edgar Savisaar", answer4: "Jüri Ratas", correct: 4},
  {question: "Mis on Eesti rahvuslill?", answer1: "Maikelluke", answer2: "Kullerkupp", answer3: "Sinilill", answer4: "Nartsiss", correct: 3},
  {question: "Milline on Eesti kõrgeim mägi?", answer1: "Toomemägi", answer2: "Suur Munamägi", answer3: "Hiiemägi", answer4: "Panga pank", correct: 2},
  {question: "Mis on Eesti rahvustoit?", answer1: "Karask", answer2: "Verivorst", answer3: "Kama", answer4: "Hapukapsasupp", correct: 3},
  {question: "Kus asub Eesti suurim rahvuspark?", answer1: "Matsalu Rahvuspark", answer2: "Lahemaa Rahvuspark", answer3: "Soomaa Rahvuspark", answer4: "Vilsandi Rahvuspark", correct: 3},
  {question: "Milline on Eesti kõige suurem järv?", answer1: "Pühajärv", answer2: "Peipsi järv", answer3: "Tartu järv", answer4: "Võrtsjärv", correct: 2},
  {question: "Kes on Eesti kuulsaim helilooja?", answer1: "Veljo Tormis", answer2: "Arvo Pärt", answer3: "Rudolf Tobias", answer4: "Eduard Tubin", correct: 2},
  {question: "Mis on Eesti rahvusloom?", answer1: "Ilves", answer2: "Karu", answer3: "Rebane", answer4: "Hunt", correct: 4},
  {question: "Milline on Eesti rahvuspäev?", answer1: "Uue aasta päev", answer2: "Mihklipäev", answer3: "Eesti Vabariigi aastapäev", answer4: "Jaanipäev", correct: 3}  
]

export default function GameView({ route, navigation }: Props) {
  const { gameCode, avatar, drink } = route.params;
  const [cardCount, setCardCount] = useState(10);
  const [cardImage, setCardImage] = useState(baseCardImage);
  const [cardVisibility, setCardVisibility] = useState(false);

  function handleCardVisibility(state: boolean) {
    setCardVisibility(state);
 }


  useEffect(() => {
    if (cardCount < 5 && cardCount > 0) {
      setCardImage(cardImageArray[cardCount - 1]);
    }
  }, [cardCount]);

  const onDecrement = () => {
    setCardCount(cardCount > 0 ? prev => prev - 1 : 0);
  };

  return (
    <>
        {cardVisibility && <Card visibility={handleCardVisibility} questionElement={questionArray[cardCount]} avatar={avatar} drink={drink} />}
    <View style={styles.gameBackground}>
      <View style={styles.gameView}>

      <Text style={styles.drinkIQLogo}>DRINKIQ</Text>
      <Text style={styles.gameCode}>#{gameCode}</Text>

      

      <Text style={styles.cardsLeft}>Cards Left: {cardCount}</Text>
      {cardCount > 0 ?
        <View style={styles.cardViewContainer}>
          <Pressable
            style={styles.cardViewTouchable}
            onPress={ () => { onDecrement()
                              handleCardVisibility(true)
                              }
              
            }>
            <Image style={styles.cardView} source={cardImage} />
          </Pressable>
        </View>
        :
        <>
          <Text style={styles.gameText}>GAME OVER!</Text>
          <Button
            onPress={() =>
              navigation.goBack()}
            style={styles.lobbyButton}
            text="BACK TO LOBBY" />
        </>
      }
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
    width: '80%',
    height: '80%',
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
