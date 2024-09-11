import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

import { AVATAR_ICONS, DRINK_ICONS } from '../constants/general';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../constants/styles/colors';
import { FONT_FAMILY_MEDIUM, REGULAR_FONT_SIZE } from '../constants/styles/typography';
import { Player } from '../screens/Lobby';

interface PlayerAroundTableProps {
  player: Player;
  currentTurn: string;

}

export default function PlayerAroundTable({ player, currentTurn }: PlayerAroundTableProps) {
  return (
    <Pressable style={styles.playerContainer}>
      <View style={styles.avatarCircle}>
          <Image style={[styles.avatar, player.userId === currentTurn && styles.avatarCurrentTurn]} source={AVATAR_ICONS[player.avatar]} />
      </View>
      <Text style={styles.name} adjustsFontSizeToFit numberOfLines={1}>
        {player.username}
      </Text>
      <Image style={styles.drink} source={DRINK_ICONS[player.drink]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  playerContainer: {
    width: '100%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarCircle: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: SECONDARY_COLOR,
    alignItems: 'center',
    borderRadius: 30,
  },
  avatar: {
    width: '110%',
    aspectRatio: 1,
    borderRadius: 30,
    borderWidth: 3,
    overflow: 'hidden',
  },
  avatarCurrentTurn: {
    width: '110%',
    aspectRatio: 1,
    borderRadius: 30,
    borderWidth: 3,
    overflow: 'hidden',
    borderColor: PRIMARY_COLOR,
  },
  drink: {
    position: 'absolute',
    width: 40,
    height: 40,
    bottom: -10,
    right: -20,
    resizeMode: 'contain',
  },
  name: {
    marginTop: 13,
    fontSize: REGULAR_FONT_SIZE,
    fontFamily: FONT_FAMILY_MEDIUM,
    color: SECONDARY_COLOR,
    textAlign: 'center',
  },
});
