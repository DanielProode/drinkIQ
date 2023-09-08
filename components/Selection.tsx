import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from './res/Button';
import { StackNavigationProp } from '@react-navigation/stack';

export type SelectionProps = {
    gameCode: number;
    navigation: StackNavigationProp<any>;
    hostGame: Boolean;

};

const defaultAvatar = require('../src/avatar_1.png');
const defaultDrink = require('../src/avatar_3.png');

const avatarIcons1 = [
    require('../src/avatar_1.png'),
    require('../src/avatar_2.png'),
    require('../src/avatar_3.png'),
    require('../src/avatar_2.png'),
    require('../src/avatar_1.png')];

const avatarIcons2 = [
    require('../src/avatar_2.png'),
    require('../src/avatar_3.png'),
    require('../src/avatar_2.png'),
    require('../src/avatar_1.png')];

const drinkIcons1 = [
    require('../src/avatar_1.png'),
    require('../src/avatar_2.png'),
    require('../src/avatar_3.png'),
    require('../src/avatar_3.png'),
    require('../src/avatar_1.png')];

const drinkIcons2 = [
    require('../src/avatar_2.png'),
    require('../src/avatar_3.png'),
    require('../src/avatar_2.png'),
    require('../src/avatar_3.png')];


const Selection = ({ gameCode, navigation, hostGame }: SelectionProps) => {
    const [avatar, setAvatar] = React.useState(defaultAvatar);
    const [drink, setDrink] = React.useState(defaultDrink);

    const [newGameCode, setGameCode] = React.useState(gameCode);


    const randomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

    // In the future, check if active game already exists with generated code

    const generateGameCode = () => {
        const generatedGameCode = randomInt(10000, 999999);
        setGameCode(generatedGameCode);
      };

    if (newGameCode === 0) {
        generateGameCode();
    }

    const RenderCircles = ( myArray: Array<ImageSourcePropType>, isDrink: Boolean ) =>  {

        return myArray.map((item, index) => {
            return (
                <TouchableOpacity
                activeOpacity={0.7}
                style={styles.avatarCircle}
                key={index}
                onPress={() =>
                    {isDrink
                    ? setDrink(item)
                    : setAvatar(item);
                }
                } >
                    <Image style={styles.avatar} source={item}/>
                </TouchableOpacity>
            );
        });
    };

  return (
    <View style={styles.joinGameView}>
        <View style={styles.logoView}>
        <Image style={styles.cheersIcon}
                source={require('../src/cheers_icon.png')}/>
        <Text style={styles.drinkIQLogo}>DRINKIQ</Text>
        </View>
        <View style={styles.profileBackground}>
            <Image style={styles.avatar} source={avatar}/>
        </View>
        <View style={styles.drinkContainer}>
            <Image style={styles.drink} source={drink} />
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
                        
                    
                    <TouchableOpacity style={styles.deckButtonContainer}>
                        <Image  style={styles.deckImage} source={require('../src/avatar_1.png')}/>
                    </TouchableOpacity>

                    </View>

                    <Button
                    onPress={ () => {
                    navigation.navigate('Lobby', {gameCode: newGameCode, avatar: avatar, drink: drink});
                    }}
                    text="HOST GAME"
                />
                </View>

            : <Button
                onPress={ () =>
                    navigation.navigate('Lobby', {gameCode: gameCode, avatar: avatar, drink: drink}) }
                text="JOIN GAME"/>
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
        flex: 1,
        width: 50,
        height: 50,
        position: 'absolute',
        top: 200,
        right: 80,
    },
    selectDeck: {
        flex: 1,
    },
    selectDeckText: {
        color: 'white',
        fontFamily: 'Basic',
        marginTop: 30,
        fontSize: 20,
        alignSelf: 'center',
    },
    deckImage: {
        flex: 1,
        resizeMode: 'contain',
        width: '70%', // Take up all available width
        height: '70%', // Take up all available height
        alignSelf: 'center',
    },
    avatar: {
        flex: 1,
        resizeMode: 'contain',
        width: '70%', // Take up all available width
        height: '70%', // Take up all available height
        alignSelf: 'center',
    },
    deckButtonContainer: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        aspectRatio: 1 / 1,
        backgroundColor: '#d8d8d8',
        marginTop: 20,
        marginBottom: 20,
    },
    drink: {
        flex: 1,
        resizeMode: 'contain',
        width: '70%', // Take up all available width
        height: '70%', // Take up all available height
        alignSelf: 'center',
    },
    cheersIcon: {
        position: 'absolute',
        resizeMode: 'contain',
        width: 80,
        height: 80,
        right: -30,
        top: 20,
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
        width: '28.3%',
        aspectRatio: 1 / 1,
        backgroundColor: '#d8d8d8',
        borderRadius: 40,
        overflow: 'hidden',
        marginTop: 20,
    },
    drinkIQLogo: {
        fontFamily: 'Knewave',
        marginTop: 50,
        fontSize: 30,
        color: 'white',
    },
    gameCode: {
        fontFamily: 'CarterOne-Regular',
        marginTop: 5,
        fontSize: 18,
        color: 'white',
    },
    viewContainer: {
        flex: 1,
        marginTop: 20,
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
        marginTop: 40,
        fontSize: 20,
    },
    joinButton: {
    },
  });
export default Selection;
