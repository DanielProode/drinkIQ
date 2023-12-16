import { Image } from 'expo-image';
import React from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native';

import { AVATAR_ICONS, DRINK_ICONS } from '../constants/general';

interface PlayerInLobbyProps {
  player: Player;
  index: number;
  currentUser: string;
  onPress: () => void;
}

interface Player {
  username: string;
  avatar: number;
  drink: number;
}

export default function PlayerInLobby({ player, index, currentUser, onPress }: PlayerInLobbyProps) {
  return (
    <>
      <Pressable
        style={styles.playerContainer}
        key={index}
        onPress={() => onPress()}
      >
        <View style={[styles.avatarCircle, player.username === currentUser && styles.currentAvatarCircle]}>
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
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#00000090',
    borderRadius: 40,
  },
  avatar: {
    flex: 1,
    resizeMode: 'contain',
    width: '80%',
    height: '80%',
    alignSelf: 'center',
  },
  currentAvatarCircle: {
    width: '48%',
    aspectRatio: 1 / 1,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#F76D31',
    borderRadius: 40,
  },
  drink: {
    position: 'absolute',
    resizeMode: 'contain',
    width: '45%',
    height: '45%',
    alignSelf: 'flex-end',
    bottom: 0,
  },
  name: {
    marginTop: 10,
    fontSize: 18,
    fontFamily: 'JosefinSans-Medium',
    color: 'white',
  },
});

