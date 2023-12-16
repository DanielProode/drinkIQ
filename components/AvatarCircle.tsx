import React, { useState } from 'react'
import { ImageSourcePropType, Pressable, Image, StyleSheet } from 'react-native';

interface AvatarCircleProps {
  avatarIcon: ImageSourcePropType;
  onPress: () => void;
  index: number;
  isAvatar: boolean;
}

export default function AvatarCircle({ avatarIcon, onPress, index, isAvatar }: AvatarCircleProps) {
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState(0);
  const [selectedDrinkIndex, setSelectedDrinkIndex] = useState(0);
  
  return (
    <Pressable
      style={[styles.avatarCircle,
      isAvatar && index === selectedAvatarIndex && styles.avatarCircleSelected,
      !isAvatar && index === selectedDrinkIndex && styles.avatarCircleSelected]}
      onPress={() => {
        onPress();
        isAvatar && setSelectedAvatarIndex(index);
        !isAvatar && setSelectedDrinkIndex(index);
      }}>
      <Image style={styles.avatar} source={avatarIcon} />
    </Pressable>
  )
};

const styles = StyleSheet.create({
  avatar: {
    flex: 1,
    resizeMode: 'contain',
    width: '90%',
    height: '90%',
    alignSelf: 'center',
  },
  avatarCircles: {
    flexDirection: 'row',
    marginTop: 20,
  },
  avatarCircle: {
    width: 70,
    height: 70,
    aspectRatio: 1 / 1,
    backgroundColor: '#d8d8d8',
    borderRadius: 40,
    marginRight: 10,
  },
  avatarCircleSelected: {
    width: 70,
    height: 70,
    aspectRatio: 1 / 1,
    backgroundColor: '#d8d8d8',
    borderRadius: 40,
    marginRight: 10,
    borderWidth: 3,
    borderColor: '#F76D31'
  },
});