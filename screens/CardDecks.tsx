import React, { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useAuth } from '../context/authContext';
import { useDeck } from '../context/deckContext';
import CardDeckInfo from '../modals/CardDeckInfo';


export default function CardDecks() {

  const [modalContent, setModalContent] = useState(Object);
  const [isCardDeckInfoModalVisible, setIsCardDeckInfoModalVisible] = useState(Boolean);
  const { listenToUserData } = useAuth();
  const { getDecks } = useDeck();

  const toggleCardDeckInfoModal = () => {
    setIsCardDeckInfoModalVisible(!isCardDeckInfoModalVisible);
  };

  const sortArray = (a: {name: string; image: any; id: string; owned: boolean}, b: {name: string; image: any; id: string; owned: boolean}) => {
    if (a.owned && !b.owned) {
      return -1;
    } else if (!a.owned && b.owned) {
      return 1;
    }
    return 0;
  }

  useEffect(() => {
    const unsubscribe = listenToUserData();
    return () => unsubscribe();
  }, []);

  const renderDecks = (deckArray: { name: string; image: any; id: string; owned: boolean }[]) => {

    deckArray.sort(sortArray);

    return deckArray.map((item, index) => {

      return (
        <Pressable
          style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }, styles.cardViewTouchable,]} key={index} onPress={() => {
            setModalContent(item);
            toggleCardDeckInfoModal();
          }}>
          <View style={styles.cardView}>
            <CardDeckInfo isVisible={isCardDeckInfoModalVisible} onClose={toggleCardDeckInfoModal} modalContent={modalContent} />
            {!item.owned && <View style={styles.overlay} />}
            {!item.owned && <Text style={styles.lockedText}>Unlock for 4.99€</Text>}
            <Image style={styles.cardImage} source={item.image} />
            <View style={styles.cardInfo}>
              <Text style={styles.deckTitle}>{item.name.toUpperCase()}</Text>
            </View>
          </View>
        </Pressable>
      );
    });
  }

  return (
    <View style={styles.cardDeckView}>
      <Text style={styles.drinkIQLogo}>DRINKIQ</Text>

      <View style={styles.cardsView}>
        <ScrollView style={styles.scrollView}>
          {renderDecks(getDecks())}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardDeckView: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 40,
    justifyContent: 'center',
    marginTop: 50,
  },
  deckTitle: {
    fontFamily: 'CarterOne-Regular',
    color: 'white',
    fontSize: 24,
    alignSelf: 'center',
  },
  overlay: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#00000099',
    position: 'absolute',
    borderRadius: 20,
    zIndex: 1,
  },
  lockedText: {
    fontFamily: 'Basic',
    position: 'absolute',
    color: 'white',
    fontSize: 32,
    marginTop: 50,
    zIndex: 1,
    alignSelf: 'center',
    textShadowRadius: 7,
    textShadowColor: 'black',
  },
  filterButton: {
    fontFamily: 'Basic',
    color: 'white',
    fontSize: 18,
  },
  searchButton: {
    fontFamily: 'Basic',
    color: 'white',
    fontSize: 18,
  },
  scrollView: {
  },
  drinkIQLogo: {
    fontFamily: 'Knewave',
    marginTop: 50,
    marginLeft: 20,
    fontSize: 30,
    color: 'white',
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
  cardInfo: {
  },
  cardsView: {
    flex: 1,
    marginTop: 70,
    width: '100%',
    alignItems: 'center',
  },
  cardViewTouchable: {
    width: 320,
    height: 150,
    marginBottom: 40,
    backgroundColor: '#343333',
    borderRadius: 20,
  },
});
