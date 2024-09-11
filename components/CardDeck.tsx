import { Image } from 'expo-image';
import { useState } from "react";
import { Pressable, View, Text, StyleSheet, ImageProps, Dimensions } from "react-native";

import { ALMOSTBLACK, SECONDARY_COLOR } from '../constants/styles/colors';
import { FONT_FAMILY_MEDIUM, FONT_FAMILY_REGULAR, LOGO_FONT_FAMILY_REGULAR, MEDIUM_FONT_SIZE, MEDIUM_LOGO_FONT_SIZE, REGULAR_LOGO_FONT_SIZE } from '../constants/styles/typography';
import CardDeckInfo from "../modals/CardDeckInfo";
import useUserStore from "../store/userStore";

interface CardDeckProps {
  pack: { id: string, name: string, image: ImageProps, previewImage: ImageProps, text: string, exampleQuestions: string[], previewText: string}
};

export default function CardDeck({ pack }: CardDeckProps) {
  const [isCardDeckInfoModalVisible, setIsCardDeckInfoModalVisible] = useState(false);
  const { packs_owned } = useUserStore();
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = (screenWidth - 60); // Adjust 40 for padding or margins

  const toggleCardDeckInfoModal = () => {
    setIsCardDeckInfoModalVisible(!isCardDeckInfoModalVisible);
  };

  return (
    <Pressable
      style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]} onPress={() => {
        toggleCardDeckInfoModal();
      }}>
      <View style={[styles.cardView, { width: itemWidth }]}>
        <CardDeckInfo isVisible={isCardDeckInfoModalVisible} onClose={toggleCardDeckInfoModal} pack={pack} />
        {!(packs_owned && packs_owned.includes(pack.id)) && <View style={styles.overlay} />}
        {!(packs_owned && packs_owned.includes(pack.id)) && <Text style={styles.lockedText}>Unlock for 4.99€</Text>}
        <Image style={styles.cardImage} source={pack.image} />
        <View style={styles.deckInfoContainer}>
        <Text style={styles.deckTitle}>{pack.name.toUpperCase()}</Text>
        <Text style={styles.deckInfo}>{pack.previewText}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  deckInfoContainer: {
    width: '100%',
    justifyContent: 'center',
  },
  deckTitle: {
    fontFamily: LOGO_FONT_FAMILY_REGULAR,
    color: 'black',
    fontSize: MEDIUM_LOGO_FONT_SIZE,
    textAlign: 'left',
  },
  deckInfo: {
    fontFamily: FONT_FAMILY_MEDIUM,
    color: 'black',
    fontSize: REGULAR_LOGO_FONT_SIZE,
    textAlign: 'left',
  },
  overlay: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: ALMOSTBLACK,
    position: 'absolute',
    borderRadius: 20,
    zIndex: 1,
  },
  lockedText: {
    fontFamily: FONT_FAMILY_REGULAR,
    position: 'absolute',
    color: SECONDARY_COLOR,
    fontSize: MEDIUM_FONT_SIZE,
    marginTop: 50,
    zIndex: 1,
    alignSelf: 'center',
    textAlign: 'center',
    textShadowRadius: 7,
    textShadowColor: 'black',
  },
  cardView: {
    backgroundColor: 'white',
    shadowColor: 'white',
    shadowOffset: {width: 5, height: 5},
    borderRadius: 10,
    flex: 1,
    gap: 10,
    overflow: 'hidden',
    alignContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  cardImage: {
    flex: 1,
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },

});