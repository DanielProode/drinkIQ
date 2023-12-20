import { Image } from 'expo-image';
import { useState } from "react";
import { Pressable, View, Text, StyleSheet, ImageProps } from "react-native";

import { ALMOSTBLACK, SECONDARY_COLOR } from '../constants/styles/colors';
import { FONT_FAMILY_REGULAR, REGULAR_LOGO_FONT_SIZE, TITLE_FONT_SIZE } from '../constants/styles/typography';
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
        <View >
          <Text style={styles.deckTitle}>{pack.name.toUpperCase()}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  deckTitle: {
    fontFamily: FONT_FAMILY_REGULAR,
    color: SECONDARY_COLOR,
    fontSize: TITLE_FONT_SIZE,
    alignSelf: 'center',
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
    fontSize: REGULAR_LOGO_FONT_SIZE,
    marginTop: 50,
    zIndex: 1,
    alignSelf: 'center',
    textShadowRadius: 7,
    textShadowColor: 'black',
  },
  cardView: {
    width: 320,
    height: 150,
    position: 'relative',
    overflow: 'hidden',
    alignContent: 'center',
  },
  cardImage: {
    width: '100%',
    height: '75%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  cardViewTouchable: {
    width: 320,
    height: 150,
    marginBottom: 40,
    borderRadius: 20,
  },
});