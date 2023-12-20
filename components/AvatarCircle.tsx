import { Image } from 'expo-image';
import { ImageSourcePropType, Pressable, StyleSheet } from 'react-native';

import { GREY, PRIMARY_COLOR, SECONDARY_COLOR } from '../constants/styles/colors';
import { FONT_FAMILY_BOLD, HEADER_FONT_SIZE } from '../constants/styles/typography';

type AvatarCircleProps = {
    selectedAvatarIndex: any;
    setSelectedAvatarIndex: any;
    selectedDrinkIndex: any;
    setSelectedDrinkIndex: any;
    avatarIcon: ImageSourcePropType;
    onPress: () => void;
    index: number;
    isAvatar: boolean;
  }


export default function AvatarCircle({ selectedAvatarIndex, setSelectedAvatarIndex, selectedDrinkIndex, setSelectedDrinkIndex, avatarIcon, onPress, index, isAvatar }: AvatarCircleProps) {

    return (
        <Pressable
          style={[styles.avatarCircle,
            isAvatar && index === selectedAvatarIndex && styles.avatarCircleSelected,
            !isAvatar && index === selectedDrinkIndex && styles.avatarCircleSelected]}
          onPress={() => {onPress(); 
                          isAvatar && setSelectedAvatarIndex(index); 
                          !isAvatar && setSelectedDrinkIndex(index); 
                          }}>
          <Image style={styles.avatar} source={avatarIcon} />
        </Pressable>
    );
    
};
const styles = StyleSheet.create({
avatarCircle: {
    width: 70,
    height: 70,
    aspectRatio: 1 / 1,
    backgroundColor: GREY,
    borderRadius: 40,
    marginRight: 10,
    },
avatarCircleSelected: {
    width: 70,
    height: 70,
    aspectRatio: 1 / 1,
    backgroundColor: GREY,
    borderRadius: 40,
    marginRight: 10,
    borderWidth: 3,
    borderColor: PRIMARY_COLOR,
    },
avatar: {
    flex: 1,
    contentFit: 'contain',
    width: '90%',
    height: '90%',
    alignSelf: 'center',
    },
selectAvatarText: {
    color: SECONDARY_COLOR,
    fontFamily: FONT_FAMILY_BOLD,
    fontSize: HEADER_FONT_SIZE,
  },
});