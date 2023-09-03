import { Route, useRoute } from '@react-navigation/native';
import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

let cardCount = 5;

export type Props = {
  baseCardCount: number;
  baseCardImage?: ImageSourcePropType;
  gameCode: number;

};

let cardImageArray = [
  require('../src/card1_icon.png'), 
  require('../src/card2_icon.png'), 
  require('../src/card3_icon.png'), 
  require('../src/card4_icon.png'), 
  require('../src/card5_icon.png')];


  const GameView: React.FC<Props> = ({
      gameCode,
      baseCardCount = 5,
      baseCardImage = cardImageArray[4],
    }) => {
      const [cardCount, setCardCount] = React.useState(baseCardCount,);

      const onDecrement = () => 
        setCardCount( cardCount > 0 ? cardCount - 1 : 0,)
        console.log("howdy!");

      


  return (
    <View style={styles.gameView}>
      <Text style={styles.gameText}>Main Game</Text>
      <TouchableHighlight 
        style={styles.cardViewTouchable}
        onPress={ onDecrement}>
      <Image style={styles.cardView} source={baseCardImage}/>
      </TouchableHighlight>
      
      <Text style={styles.gameCode}>#{gameCode}</Text>
    </View>

  );
}

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
    gameCode: {
        fontSize: 20,
        position: 'absolute',
        bottom: 20,
        right: 20,
        color: 'white',
    },
    cardViewTouchable: {
      backgroundColor: 'white',
    },
    cardView: {
      resizeMode: 'contain',
      width: 250,
    },
  });
export default GameView;
