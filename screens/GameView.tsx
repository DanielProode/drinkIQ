import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View, ImageSourcePropType } from 'react-native';

import Button from '../components/Button';

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

const baseCardCount = 48;
const baseCardImage = require('../assets/images/card5_icon.png');
const cardImageArray = [
  require('../assets/images/card1_icon.png'),
  require('../assets/images/card2_icon.png'),
  require('../assets/images/card3_icon.png'),
  require('../assets/images/card4_icon.png'),
  require('../assets/images/card5_icon.png')];

export default function GameView({ route, navigation }: Props) {
  const { gameCode, avatar, drink } = route.params;
  const [cardCount, setCardCount] = useState(baseCardCount);
  const [cardImage, setCardImage] = useState(baseCardImage);

  useEffect(() => {
    if (cardCount < 5 && cardCount > 0) {
      setCardImage(cardImageArray[cardCount - 1]);
    }
  }, [cardCount]);

  const onDecrement = () => {
    setCardCount(cardCount > 0 ? prev => prev - 1 : 0);
  };

  return (
    <View style={styles.gameView}>
      <Text style={styles.gameText}>Main Game</Text>
      <View style={styles.profileBackground}>
        <Image style={styles.avatar} source={avatar} />
      </View>
      <View style={styles.drinkContainer}>
        <Image style={styles.drink} source={drink} />
      </View>
      <Text style={styles.cardsLeft}>Cards Left: {cardCount}</Text>
      {cardCount > 0 ?
        <View style={styles.cardViewContainer}>
          <TouchableHighlight
            style={styles.cardViewTouchable}
            onPress={
              onDecrement
            }>
            <Image style={styles.cardView} source={cardImage} />
          </TouchableHighlight>
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
      <Text style={styles.gameCode}>#{gameCode}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  gameView: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  gameText: {
    fontSize: 50,
    marginTop: 100,
    color: 'white',
  },
  cardsLeft: {
    marginTop: 30,
    fontSize: 20,
    color: 'white',
  },
  profileBackground: {
    width: '28.3%',
    aspectRatio: 1 / 1,
    backgroundColor: '#d8d8d8',
    borderRadius: 40,
    overflow: 'hidden',
    marginTop: 20,
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
    position: 'absolute',
    bottom: 20,
    right: 20,
    color: 'white',
  },
  cardViewContainer: {
    marginTop: 50,
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
