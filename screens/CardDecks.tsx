import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import Button from '../components/Button';
import { useAuth } from '../context/authContext';
import { FIREBASE_DB } from '../firebaseConfig.js';

const cardDecks = [{
  id: 'estonia',
  name: 'Estonia card pack',
  image: require('../assets/images/estonia_deck.png'),
}, {
  id: 'football',
  name: 'Football card pack',
  image: require('../assets/images/football_deck.png'),
}, {
  id: 'birds',
  name: 'Birds card pack',
  image: require('../assets/images/bird_deck.png'),
}];

export default function CardDecks() {

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(Object);
  const [isDeckOwned, setDeckOwned] = useState(Boolean);

  let deckOwned: boolean;

  const { user } = useAuth();
  const db = FIREBASE_DB;

  const ownedPacks = (user && user.packs_owned) ? user.packs_owned : null

  const handlePayment = (pack: string) => {
    // Handle real payment when Buy Pack button is pressed
    // Display loading icon until the process has completed
    updateUserData(pack);
    setModalVisible(false);
  }

  const updateUserData = async (pack: string) => {
    try {
      if (user) {
        const userDoc = doc(db, 'users', user.uid);
        await updateDoc(userDoc, {
          packs_owned: arrayUnion(pack),
        })
      }
      else {
        console.log('User object does not exist')
      }
    } catch (error) {
      console.error('Error updating user data: ', error);
    }
  }

  const RenderModal = () => {

    return (
      <Modal transparent visible={modalVisible}>
        <View style={styles.modal}>
          <Image style={styles.modalImage} source={modalContent.image} />
          <Text style={styles.modalText}>This is a small intro to the {modalContent.name} card pack.</Text>
          <Text style={styles.modalText}>Will insert some sample questions and sample avatars which will be unlocked. Very long text ahead. Some text about the card packs. Some more text about the card packs.</Text>
          {!isDeckOwned && <Text style={styles.buyText}>Buy {modalContent.name} for just 4.99€!</Text>}
          {isDeckOwned ? <Button text="Back" onPress={() => { setModalVisible(false); console.log(isDeckOwned) }} /> :
            <>
              <Button text="Buy pack" buttonBgColor="#707070" onPress={() => { handlePayment(modalContent.id) }} />
              <Button text="Back" onPress={() => { setModalVisible(false) }} />
            </>
          }
        </View>
      </Modal>
    );
  }

  const RenderDecks = (deckArray: { name: string; image: any; id: string }[]) => {

    return deckArray.map((item, index) => {

      const checkIfPackOwned = () => {
        if (ownedPacks && ownedPacks.includes(item.id)) deckOwned = true;
        else deckOwned = false;
      }

      checkIfPackOwned();

      return (
        <Pressable
          style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }, styles.cardViewTouchable,]} key={index} onPress={() => {
            setModalContent(item);
            setModalVisible(true);
            checkIfPackOwned();
            console.log("Pack owned? " + deckOwned)
            setDeckOwned(deckOwned);
          }}>
          <View style={styles.cardView}>
            {RenderModal()}
            {!deckOwned && <View style={styles.overlay} />}
            {!deckOwned && <Text style={styles.lockedText}>Unlock for 4.99€</Text>}
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
      <View style={styles.buttonContainer}>
        <Text>Filter buttons tba</Text>
      </View>
      <View style={styles.cardsView}>
        <ScrollView style={styles.scrollView}>
          {RenderDecks(cardDecks)}
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
  buyText: {
    marginTop: 20,
    fontSize: 18,
  },
  modal: {
    margin: 20,
    marginTop: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalImage: {
    height: 100,
    resizeMode: 'contain',
  },
  modalText: {
    marginTop: 10,
    marginBottom: 10,
  },
  modalButton: {
    marginTop: 20,
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
  explainerText: {
    fontSize: 40,
    color: 'white',
    alignSelf: 'center',
    fontFamily: 'Basic',
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
    marginTop: 50,
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
