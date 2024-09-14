import { Image } from 'expo-image';
import { useEffect, useState } from "react";
import { Pressable, View, Text, StyleSheet, ImageProps, Dimensions } from "react-native";

import { ALMOSTBLACK, SECONDARY_COLOR } from '../constants/styles/colors';
import { SPACING_MD, SPACING_SM, SPACING_XS } from '../constants/styles/style';
import { FONT_FAMILY_CARD, FONT_FAMILY_CARD_BOLD, FONT_FAMILY_CARD_SEMIBOLD, REGULAR_LOGO_FONT_SIZE } from '../constants/styles/typography';
import CardDeckInfo from "../modals/CardDeckInfo";
import useUserStore from "../store/userStore";

interface CardDeckProps {
  pack: { id: string, name: string, image: ImageProps, previewImage: ImageProps, text: string, exampleQuestions: string[], previewText: string, price: number, rating: number, playedCards: number}
};

export default function CardDeck({ pack }: CardDeckProps) {
  const [isCardDeckInfoModalVisible, setIsCardDeckInfoModalVisible] = useState(false);
  const { packs_owned, packs_played } = useUserStore();
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = (screenWidth - 64); // Adjust 40 for padding or margins
  const [progress, setProgress] = useState<number>(0);

  const toggleCardDeckInfoModal = () => {
    setIsCardDeckInfoModalVisible(!isCardDeckInfoModalVisible);
  };

  
  //Check if played question number exists
  const getPlayedQuestionNumber = async (): Promise<number> => {
    try {
      if (packs_owned && packs_owned.includes(pack.id)) {
        const questionsPlayed = packs_played[pack.id]?.length;
        return questionsPlayed ? questionsPlayed : 0;
      }
      return 0;
    } catch (error) {
      console.error('Error reading played questions number from database: ', error)
      throw error;
    }
  }

  // Use effect to fetch and set progress when the component mounts
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const fetchedProgress = await getPlayedQuestionNumber();
        setProgress(fetchedProgress);
      } catch (error) {
        console.error('Error fetching progress: ', error);
      }
    };

    fetchProgress();
  }, [pack.id, packs_played]); // Run the effect when the pack.id changes

  const widthPercentage = progress / 10;

  return (
    <Pressable
      style={({ pressed }) => { return [pressed ? styles.pressedDeck : styles.pressableDeck]} } onPress={() => {
        toggleCardDeckInfoModal();
      }}>
      <View style={[styles.cardView, { width: itemWidth }]}>
        <CardDeckInfo isVisible={isCardDeckInfoModalVisible} onClose={toggleCardDeckInfoModal} pack={pack} />
        <Image style={styles.cardImage} source={pack.image}>
        {!(packs_owned && packs_owned.includes(pack.id)) && (
          <>
        <View style={styles.overlay} />
        <Text style={styles.lockedText}>Unlock for {pack.price}€</Text>
        </>)
        }
        {(packs_owned && packs_owned.includes(pack.id)) && ( 
        <View style={styles.progressContainer}>
        <View style={[widthPercentage === 100 ? styles.progressGoldBar : styles.progressGreenBar, { width: widthPercentage }]} />
        <View style={styles.progressWhiteBar} />
        <Text style={styles.progressText}>{progress}/1000</Text>
        </View>
          )}
        </Image>
        <View style={styles.deckInfoContainer}>
        <View style={styles.deckInfoContainerFirst}>
        <Text style={styles.deckTitle}>{(pack.name + " deck").toUpperCase()}</Text>
        <Text style={styles.deckPrice}>{pack.price}€</Text>
        </View>
        <View style={styles.deckInfoContainerSecond}>
        <View style={styles.deckDownloadsInfo}>
          <Image style={styles.downloadsIcon} source={require('../assets/images/download_icon.png')} />
          <Text style={styles.deckDownloadsInfoText}>5</Text>
        </View>
        <View style={styles.deckRatingInfo}>
        <Text style={styles.deckDownloadsInfoText}>{pack.rating}</Text>
        <Image style={styles.starIcon} source={require('../assets/images/star_icon.png')} />
        </View>
        </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressableDeck: {

  },
  pressedDeck: {
    opacity: 0.5,
  },
  cardView: {
    backgroundColor: '#263745',
    shadowColor: 'white',
    shadowOffset: {width: 5, height: 5},
    margin: 5,
    borderRadius: 15,
    gap: SPACING_XS,
  },
  cardImage: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  lockedText: {
    fontFamily: FONT_FAMILY_CARD_SEMIBOLD,
    position: 'absolute',
    color: SECONDARY_COLOR,
    fontSize: REGULAR_LOGO_FONT_SIZE,
    zIndex: 1,
    alignSelf: 'center',
    textAlign: 'center',
    width: '100%',
    textShadowRadius: 7,
    textShadowColor: 'black',
  },
  progressContainer: {
    width: '100%',
    height: SPACING_MD,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  progressGreenBar: {
    height: '100%',
    backgroundColor: '#5CB563',
  },
  progressGoldBar: {
    height: '100%',
    backgroundColor: '#d4af37',
  },
  progressWhiteBar: {
    flex: 1,
    height: '100%',
    backgroundColor: '#3D3D5C',
  },
  progressText: {
    position: 'absolute',
    fontFamily: FONT_FAMILY_CARD_SEMIBOLD,
    fontSize: 14,
    color: '#F5F5F5',
  },
  ratingContainer: {
    height: 40,
    width: 100,
  },
  deckInfoContainer: {
    width: '100%',
    justifyContent: 'center',
    paddingBottom: SPACING_SM,
  },
  deckInfoContainerFirst: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: SPACING_XS,
    paddingRight: SPACING_XS,
  },
  deckInfoContainerSecond: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: SPACING_XS,
    paddingRight: SPACING_XS,
  },
  deckTitle: {
    fontFamily: FONT_FAMILY_CARD_BOLD,
    color: '#F5F5F5',
    fontSize: 20,
    textAlign: 'left',
  },
  deckPrice: {
    fontFamily: FONT_FAMILY_CARD_SEMIBOLD,
    color: '#B9C2C7',
    fontSize: 18,
    textAlign: 'left',
  },
  overlay: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: ALMOSTBLACK,
    position: 'absolute',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    zIndex: 1,
  },
  downloadsIcon: {
    width: 25,
    height: 25,
  },
  starIcon: {
    width: 15,
    height: 15,
  },
  deckDownloadsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING_XS,
  },
  deckDownloadsInfoText: {
    fontFamily: FONT_FAMILY_CARD,
    color: '#B9C2C7',
    fontSize: 14,
  },
  deckRatingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING_XS,
  },

});