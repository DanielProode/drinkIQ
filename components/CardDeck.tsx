import { Image } from 'expo-image';
import { useState } from "react";
import { Pressable, View, Text, StyleSheet, ImageProps, Dimensions } from "react-native";

import { ALMOSTBLACK, SECONDARY_COLOR } from '../constants/styles/colors';
import { FONT_FAMILY_BOLD, FONT_FAMILY_REGULAR, REGULAR_LOGO_FONT_SIZE, TITLE_FONT_SIZE } from '../constants/styles/typography';
import CardDeckInfo from "../modals/CardDeckInfo";
import useUserStore from "../store/userStore";

interface CardDeckProps {
  pack: { id: string, name: string, image: ImageProps, previewImage: ImageProps, text: string; }
};

export default function CardDeck({ pack }: CardDeckProps) {
  const [isCardDeckInfoModalVisible, setIsCardDeckInfoModalVisible] = useState(false);
  const { packs_owned } = useUserStore();

  const toggleCardDeckInfoModal = () => {
    setIsCardDeckInfoModalVisible(!isCardDeckInfoModalVisible);
  };

  return (
    <Pressable
      style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }, styles.cardViewTouchable,]} onPress={() => {
        toggleCardDeckInfoModal();
      }}>
      <View style={styles.cardView}>
        <CardDeckInfo isVisible={isCardDeckInfoModalVisible} onClose={toggleCardDeckInfoModal} pack={pack} />
        {!(packs_owned && packs_owned.includes(pack.id)) && <View style={styles.overlay} />}
        {!(packs_owned && packs_owned.includes(pack.id)) && <Text style={styles.lockedText}>Unlock for 4.99€</Text>}
        <Image style={styles.cardImage} source={pack.image} />
        <View style={styles.deckTitleContainer}>
          <Text style={styles.deckTitle}>{pack.name.toUpperCase()}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardViewTouchable: {
    width: 320,
    height: 250,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
  },
  cardView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  overlay: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: ALMOSTBLACK,
    position: 'absolute',
    zIndex: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  lockedText: {
    fontFamily: FONT_FAMILY_REGULAR,
    position: 'absolute',
    color: SECONDARY_COLOR,
    fontSize: REGULAR_LOGO_FONT_SIZE,
    zIndex: 1,
    alignSelf: 'center',
    textShadowRadius: 7,
    textShadowColor: 'black',
  },
  cardImage: {
    width: '100%',
    height: '82%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  deckTitleContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: ALMOSTBLACK,
  },
  deckTitle: {
    fontFamily: FONT_FAMILY_BOLD,
    color: SECONDARY_COLOR,
    fontSize: TITLE_FONT_SIZE,
    textAlign: 'center',
  },
});