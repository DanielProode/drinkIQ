import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import Button from './res/Button';
import React from 'react';


export type Props = {
    route: RouteProp<{ Lobby: { gameCode: number;
                                avatar: ImageSourcePropType;
                                drink: ImageSourcePropType;
                                    }}>;
    navigation: StackNavigationProp<any>;

};


  const Lobby = ({ route, navigation }: Props) => {
    const { gameCode, avatar, drink  } = route.params;

return (
<View style={styles.gameView}>
    <Text style={styles.gameText}>Game Lobby</Text>
    <View style={styles.profileBackground}>
            <Image style={styles.avatar} source={avatar}/>
        </View>
        <View style={styles.drinkContainer}>
            <Image style={styles.drink} source={drink} />
        </View>
        <View style={styles.lobbyButton}>
        <Button
            onPress={ () =>
                navigation.navigate('GameView', {gameCode: gameCode, avatar: avatar, drink: drink}) }
            style={styles.lobbyButton}
            text="START GAME"/>
        </View>
        <View style={styles.lobbyButton}>
        <Button
            onPress={ () =>
            navigation.goBack() }
            style={styles.lobbyButton}
            text="BACK TO SELECTION"/>
        </View>
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
    avatarContainer: {

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
    drinkContainer: {
        flex: 1,
        width: 50,
        height: 50,
        position: 'absolute',
        top: 260,
        right: 120,
    },
    profileBackground: {
        width: '28.3%',
        aspectRatio: 1 / 1,
        backgroundColor: '#d8d8d8',
        borderRadius: 40,
        overflow: 'hidden',
        marginTop: 20,
    },
    gameText: {
        fontSize: 50,
        marginTop: 100,
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
  });
export default Lobby;
