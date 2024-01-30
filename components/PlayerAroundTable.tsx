import { Image } from 'expo-image';
import React from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native';

import { AVATAR_ICONS, DRINK_ICONS } from '../constants/general';
import { SECONDARY_COLOR } from '../constants/styles/colors';
import { FONT_FAMILY_MEDIUM, REGULAR_FONT_SIZE } from '../constants/styles/typography';
import { Player } from '../screens/Lobby';

interface PlayerAroundTableProps {
  player: Player;
  stylesArray: {x: number, y: number};
  headerHeight: number;
}

export default function PlayerAroundTable({ stylesArray, player, headerHeight }: PlayerAroundTableProps) {
  return (
    <>
      <View style={{left: stylesArray.x, top: stylesArray.y + headerHeight, position: 'absolute', zIndex: 3}}>
        <Pressable style={styles.playerContainer}>
          <View style={styles.avatarCircle}>
            <Image style={styles.avatar} source={AVATAR_ICONS[player.avatar]} />
            <Image style={styles.drink} source={DRINK_ICONS[player.drink]} />
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
        backgroundColor: SECONDARY_COLOR,
        borderRadius: 50,
    },
    name: {
        marginTop: 5,
        fontSize: REGULAR_FONT_SIZE,
        fontFamily: FONT_FAMILY_MEDIUM,
        color: SECONDARY_COLOR,
    },

});

