import { Image } from 'expo-image';
import { ImageProps, Pressable, StyleSheet, Text, View } from 'react-native';

import { ALMOSTBLACK, ORANGE, WHITE } from '../constants/styles/colors';
import { FONT_FAMILY_REGULAR, MEDIUM_FONT_SIZE } from '../constants/styles/typography';
import useUserStore from '../store/userStore';

interface CardDeckSquareProps {
  cardPack: { id: string, name: string, image: ImageProps, previewImage: ImageProps, text: string; }
  index: number;
  selectedCardIndex: number;
  handlePress: (index: number) => void;
};

export default function CardDeckSquare({ cardPack, index, selectedCardIndex, handlePress }: CardDeckSquareProps) {
  const { packs_owned } = useUserStore();

  return (
    <Pressable
      style={({ pressed }) => [
        { opacity: pressed ? 0.5 : 1.0 },
        styles.cardDeckContainer,
        selectedCardIndex === index && styles.cardDeckContainerSelected,
      ]}
      onPress={() => handlePress(index)}
      disabled={!(packs_owned && packs_owned.includes(cardPack.id))} >
      <Image style={styles.cardDeck} source={cardPack.previewImage} />
      {!(packs_owned && packs_owned.includes(cardPack.id)) &&
        <View style={styles.overlay}>
          <Text style={styles.priceText}>BUY FOR 4.99€</Text>
        </View>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardDeck: {
    flex: 1,
    width: '100%',
  },
  cardDeckContainer: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginHorizontal: 10,
    overflow: 'hidden',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardDeckContainerSelected: {
    borderWidth: 1,
    borderColor: ORANGE,
  },
  overlay: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: ALMOSTBLACK,
    position: 'absolute',
    zIndex: 1,
    justifyContent: 'center',
  },
  priceText: {
    fontSize: MEDIUM_FONT_SIZE,
    color: WHITE,
    fontFamily: FONT_FAMILY_REGULAR,
    textAlign: 'center',
    textShadowRadius: 7,
    textShadowColor: 'black',
  },
});
