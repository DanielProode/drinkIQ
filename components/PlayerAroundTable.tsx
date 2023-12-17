import { Image } from 'expo-image';
import React from 'react'
import { StyleSheet, View, Text, Pressable, ImageSourcePropType, ViewStyle } from 'react-native';

interface PlayerAroundTableProps {
    player: Player;
    index: number;
    stylesArray: ViewStyle;
}

interface Player {
    username: string;
    avatar: ImageSourcePropType;
    drink: ImageSourcePropType;
}


export default function PlayerAroundTable({ stylesArray, player, index }: PlayerAroundTableProps) {
    return (
        <>
            <View style={stylesArray} key={index}>
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
        </>
    );
};

const styles = StyleSheet.create({
    avatar: {
        flex: 1,
        contentFit: 'contain',
        width: '70%',
        height: '70%',
        alignSelf: 'center',
    },
    drink: {
        flex: 1,
        contentFit: 'contain',
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

});

