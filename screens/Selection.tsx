import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Keyboard, Image, ImageSourcePropType, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import CardDeckSelection from '../components/CardDeckSelection';
import Button from '../components/Button';;

export type SelectionProps = {
  gameCode: number;
  navigation: NativeStackNavigationProp<any>;
  hostGame: boolean;

};

const defaultAvatar = require('../assets/images/avatar_1.png');
const defaultDrink = require('../assets/images/avatar_3.png');
const defaultCardDeck = require('../assets/images/card_deck1.png');
const avatarIcons1 = [
  require('../assets/images/avatar_1.png'),
  require('../assets/images/avatar_2.png'),
  require('../assets/images/avatar_3.png'),
  require('../assets/images/avatar_4.png'),
  require('../assets/images/avatar_5.png')];
const avatarIcons2 = [
  require('../assets/images/avatar_6.png'),
  require('../assets/images/avatar_7.png'),
  require('../assets/images/avatar_8.png'),
  require('../assets/images/avatar_9.png')];
const drinkIcons1 = [
  require('../assets/images/drink_1.png'),
  require('../assets/images/drink_2.png'),
  require('../assets/images/drink_3.png'),
  require('../assets/images/drink_4.png'),
  require('../assets/images/drink_5.png')];
const drinkIcons2 = [
  require('../assets/images/drink_6.png'),
  require('../assets/images/drink_7.png'),
  require('../assets/images/drink_8.png'),
  require('../assets/images/drink_9.png')];

export default function Selection({ gameCode, navigation, hostGame }: SelectionProps) {
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [drink, setDrink] = useState(defaultDrink);
  const [visibility, setVisibility] = useState(false);
  const [playableDeck, setCardDeck] = useState(defaultCardDeck);

  function handleCardDeck(deck: ImageSourcePropType) {
    console.log(deck);
    setCardDeck(deck);
    console.log(playableDeck);
  }

  const RenderCircles = (myArray: ImageSourcePropType[], isDrink: boolean) => {

    return myArray.map((item, index) => {
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.avatarCircle}
          key={index}
          onPress={() => {
            isDrink
              ? setDrink(item)
              : setAvatar(item);
          }
          } >
          <Image style={styles.avatar} source={item} />
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={styles.joinGameView}>
      {visibility ? 
      <>
      <View style={styles.opacity}/>

      <CardDeckSelection handleCardDeck={handleCardDeck} visibility={setVisibility} />
      </>
      : null}
      <View style={styles.logoView}>
        <Image style={styles.cheersIcon}
          source={require('../assets/images/cheers_icon.png')} />
        <Text style={styles.drinkIQLogo}>DRINKIQ</Text>
      </View>
      <View style={styles.avatarAndDrinkContainer}>
        <View style={styles.profileBackground}>
          <Image style={styles.avatar} source={avatar} />
        </View>
        <View style={styles.drinkContainer}>
          <Image style={styles.drink} source={drink} />
        </View>
      </View>
      {hostGame ? <></>
        : <Text style={styles.gameCode}>#{gameCode}</Text>}
      <View style={styles.viewContainer}>
        <Text style={styles.selectAvatarText}>Select your avatar</Text>
        <View style={styles.avatarCircles1}>
          {RenderCircles(avatarIcons1, false)}
        </View>
        <View style={styles.avatarCircles2}>
          {RenderCircles(avatarIcons2, false)}
        </View>

        <Text style={styles.selectDrinkText}>Select your drink</Text>
        <View style={styles.drinkCircles1}>
          {RenderCircles(drinkIcons1, true)}
        </View>
        <View style={styles.drinkCircles2}>
          {RenderCircles(drinkIcons2, true)}
        </View>
        <View style={styles.joinButton}>
          {hostGame
            ?
            <View style={styles.selectDeck}>

              <Text style={styles.selectDeckText}>Select game deck</Text>

              <View >
                <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }, styles.deckButtonContainer]}
                  onPress={() => setVisibility(!visibility)}>
                  <Image style={styles.deckImage} source={playableDeck} />
                </Pressable>

              </View>

              <Button
                onPress={() => {
                  navigation.navigate('Lobby', { gameCode, avatar, drink, playableDeck, hostGame  });
                }}
                text="HOST GAME"
              />
            </View>

            : <Button
              marginTop={20}
              onPress={() =>{
                navigation.navigate('Lobby', { gameCode, avatar, drink, playableDeck, hostGame })}
              }
              text="JOIN GAME" />
          }
        </View>
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  logoView: {
    alignContent: 'center',
  },
  joinGameView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
  },
  drinkContainer: {
    width: 50,
    height: 50,
    bottom: 40,
    right: '-15%',
  },
  avatarAndDrinkContainer: {
    height: 60,
  },
  opacity: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
    backgroundColor: '#00000099',
  },
  selectDeck: {
    flex: 1,
  },
  selectDeckText: {
    color: 'white',
    fontFamily: 'Basic',
    marginTop: 10,
    fontSize: 20,
    alignSelf: 'center',
  },
  deckImage: {
    flex: 1,
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
  },
  avatar: {
    flex: 1,
    resizeMode: 'contain',
    width: '70%',
    height: '70%',
    alignSelf: 'center',
  },
  deckButtonContainer: {
    width: 100,
    alignSelf: 'center',
    aspectRatio: 1 / 1,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
  drink: {
    flex: 1,
    resizeMode: 'contain',
    width: '70%',
    height: '70%',
    alignSelf: 'center',
  },
  cheersIcon: {
    position: 'absolute',
    resizeMode: 'contain',
    width: 80,
    height: 80,
    right: -30,
    opacity: 0.3,
  },
  avatarCircles1: {
    flexDirection: 'row',
    gap: 18,
    marginTop: 20,
  },
  avatarCircles2: {
    flexDirection: 'row',
    gap: 18,
  },
  drinkCircles1: {
    flexDirection: 'row',
    gap: 18,
    marginTop: 20,
  },
  drinkCircles2: {
    flexDirection: 'row',
    gap: 18,
  },
  avatarCircle: {
    width: 50,
    height: 50,
    aspectRatio: 1 / 1,
    backgroundColor: '#d8d8d8',
    borderRadius: 40,
  },
  profileBackground: {
    width: '20.0%',
    aspectRatio: 1 / 1,
    backgroundColor: '#d8d8d8',
    borderRadius: 20,
  },
  drinkIQLogo: {
    fontFamily: 'Knewave',
    marginTop: 50,
    fontSize: 30,
    color: 'white',
  },
  gameCode: {
    fontFamily: 'CarterOne-Regular',
    marginTop: 20,
    fontSize: 18,
    color: 'white',
  },
  viewContainer: {
    flex: 1,
    marginTop: 30,
    alignItems: 'center',
  },
  selectAvatarText: {
    color: 'white',
    fontFamily: 'Basic',
    fontSize: 20,
  },
  selectDrinkText: {
    color: 'white',
    fontFamily: 'Basic',
    marginTop: 10,
    fontSize: 20,
  },
  joinButton: {
  },
});
