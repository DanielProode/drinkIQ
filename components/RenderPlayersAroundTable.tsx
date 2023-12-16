import { Image } from 'expo-image';
import React from 'react'
import { StyleSheet, View, Text, Pressable, ImageSourcePropType } from 'react-native';

interface RenderPlayersAroundTableProps {
    playerArray: Player[];
}

interface Player {
    username: string;
    avatar: ImageSourcePropType;
    drink: ImageSourcePropType;
}


export default function RenderPlayersAroundTable({ playerArray }: RenderPlayersAroundTableProps) {

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

    return (
        <>
            {playerArray.map((player, index) => (
                //KEY set as index - implement unique ID's and replace
                <View style={stylesArray[index]} key={index}>
                    <Pressable
                        style={styles.playerContainer}
                    >
                        <View style={styles.avatarCircle}>
                            <Image style={styles.avatar} source={player.avatar} />
                            <Image style={styles.drink} source={player.drink} />
                        </View>
                        <Text style={styles.name} adjustsFontSizeToFit numberOfLines={1}>{player.username}</Text>
                    </Pressable>
                </View>
            ))}
        </>
    );
};

const styles = StyleSheet.create({
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
    playerContainer: {
        width: '42%',
        aspectRatio: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatarCircle: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: 50,
    },
    name: {
        marginTop: 5,
        fontSize: 14,
        fontFamily: 'JosefinSans-Medium',
        color: 'white',
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

