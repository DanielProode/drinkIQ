import { Image } from 'expo-image';
import React from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native';

import { AVATAR_ICONS, DRINK_ICONS } from '../constants/general';
import { LIGHTBLACK, PRIMARY_COLOR, SECONDARY_COLOR } from '../constants/styles/colors';
import { FONT_FAMILY_MEDIUM, REGULAR_FONT_SIZE } from '../constants/styles/typography';
import { Player } from '../screens/Lobby';

interface PlayerInLobbyProps {
  player: Player;
  currentUser: string;
  handlePress: () => void;
}

export default function PlayerInLobby({ player, currentUser, handlePress }: PlayerInLobbyProps) {
  return (
    <>
      <Pressable style={styles.playerContainer} onPress={handlePress}>
        <View style={[styles.avatarCircle, player.userId === currentUser && styles.currentAvatarCircle]}>
          <Image style={styles.avatar} source={AVATAR_ICONS[player.avatar]} />
          <Image style={styles.drink} source={DRINK_ICONS[player.drink]} />
        </View>
        <Text style={styles.name} adjustsFontSizeToFit numberOfLines={1}>{player.username}</Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  playerContainer: {
    width: '40%',
    marginTop: 10,
    marginLeft: 10,
    aspectRatio: 1.5,
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatarCircle: {
    width: '48%',
    aspectRatio: 1 / 1,
    backgroundColor: SECONDARY_COLOR,
    borderWidth: 2,
    borderColor: LIGHTBLACK,
    borderRadius: 40,
  },
  avatar: {
    flex: 1,
    contentFit: 'contain',
    width: '80%',
    height: '80%',
    alignSelf: 'center',
  },
  currentAvatarCircle: {
    width: '48%',
    aspectRatio: 1 / 1,
    backgroundColor: SECONDARY_COLOR,
    borderWidth: 2,
    borderColor: PRIMARY_COLOR,
    borderRadius: 40,
  },
  drink: {
    position: 'absolute',
    contentFit: 'contain',
    width: '45%',
    height: '45%',
    alignSelf: 'flex-end',
    bottom: 0,
  },
  name: {
    marginTop: 10,
    fontSize: REGULAR_FONT_SIZE,
    fontFamily: FONT_FAMILY_MEDIUM,
    color: SECONDARY_COLOR,
  },
});

