import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View, ImageSourcePropType} from 'react-native';
import Button from './res/Button';


export type Props = {
    route: RouteProp<{ GameView: {  gameCode: number;
                                    baseCardCount: number;
                                    baseCardImage:  ImageSourcePropType;}}>;
    navigation: StackNavigationProp<any>;

};

let cardImageArray = [
    require('../src/card1_icon.png'),
    require('../src/card2_icon.png'),
    require('../src/card3_icon.png'),
    require('../src/card4_icon.png'),
    require('../src/card5_icon.png')];


  const GameView = ({ route, navigation }: Props) => {
    const { gameCode, baseCardCount, baseCardImage } = route.params;

    const [cardCount, setCardCount] = React.useState(baseCardCount);
    const [cardImage, setCardImage] = React.useState(baseCardImage);

    useEffect(() => {
        if (cardCount < 5 && cardCount > 0) {
            setCardImage(cardImageArray[cardCount - 1]);
        }
    }, [cardCount]);

    const onDecrement = () => {
        setCardCount( cardCount > 0 ? prev => prev - 1 : 0);
    };



  return (
    <View style={styles.gameView}>
      <Text style={styles.gameText}>Main Game</Text>
      <Text style={styles.cardsLeft}>Cards Left: {cardCount}</Text>
      {cardCount > 0 ?
      <View style={styles.cardViewContainer}>
        <TouchableHighlight
            style={styles.cardViewTouchable}
            onPress={
                onDecrement
                 }>
        <Image style={styles.cardView} source={cardImage}/>
        </TouchableHighlight>
        </View>
      :
        <>
            <Text style={styles.gameText}>GAME OVER!</Text>
            <Button
                onPress={ () =>
                navigation.goBack() }
                style={styles.lobbyButton}
                text="BACK TO LOBBY"/>
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
        fontSize: 20,
        color: 'white',
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
        width: 220,  // Fixed width
        height: 300, // Fixed height
    },
    cardViewTouchable: {
        width: '100%', // Take up all available width
        height: '100%', // Take up all available height
        alignItems: 'center',     // Center horizontally
    },
    cardView: {
        flex: 1,
        resizeMode: 'contain',
    },
  });
export default GameView;
