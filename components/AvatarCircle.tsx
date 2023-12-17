import { Image } from 'expo-image';
import { ImageSourcePropType, Pressable, StyleSheet } from 'react-native';

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
avatar: {
    flex: 1,
    contentFit: 'contain',
    width: '90%',
    height: '90%',
    alignSelf: 'center',
    },
selectAvatarText: {
    color: 'white',
    fontFamily: 'JosefinSans-Bold',
    fontSize: 20,
  },
});