import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from './res/Button';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type Props = {
    route: RouteProp<{ JoinGame: {  gameCode: number;
                                    }}>;
    navigation: StackNavigationProp<any>;

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


const JoinGame = ({ route, navigation }: Props) => {
    const { gameCode } = route.params;
    const [avatar, setAvatar] = React.useState(defaultAvatar);
    const [drink, setDrink] = React.useState(defaultDrink);

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
        <Text style={styles.gameCode}>#{gameCode}</Text>
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
                <Button
                onPress={ () =>
                    navigation.navigate('Lobby', {gameCode: gameCode, avatar: avatar, drink: drink}) }
                text="JOIN GAME"/>
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
        right: 120,
    },
    avatar: {
        flex: 1,
        resizeMode: 'contain',
        width: '70%', // Take up all available width
        height: '70%', // Take up all available height
        alignSelf: 'center',
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
        color: 'black',
        marginTop: 20,
    },
  });
export default JoinGame;
