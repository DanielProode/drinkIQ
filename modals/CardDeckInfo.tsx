import { Image } from 'expo-image';
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { Modal, View, Text, StyleSheet, ImageSourcePropType, ScrollView } from "react-native";

import Button from "../components/Button";
import { BACKGROUND_COLOR, BLACK, SECONDARY_COLOR } from '../constants/styles/colors';
import { FONT_FAMILY_BOLD, FONT_FAMILY_REGULAR, HEADER_FONT_SIZE, REGULAR_FONT_SIZE, TITLE_FONT_SIZE } from '../constants/styles/typography';
import { useAuth } from "../context/authContext";
import { FIREBASE_DB } from "../firebaseConfig";
import useUserStore from "../store/userStore";

interface CardDeckInfoProps {
  isVisible: boolean;
  onClose: () => void;
  pack: { id: string, name: string, image: ImageSourcePropType, previewImage: ImageSourcePropType, text: string; };
};

export default function CardDeckInfo({ isVisible, onClose, pack }: CardDeckInfoProps) {
  const { authUser } = useAuth();
  const { packs_owned } = useUserStore();
  const handlePayment = (pack: string) => {
    // Handle real payment when Buy Pack button is pressed
    // Display loading icon until the process has completed
    updateUserData(pack);
    onClose();
  }

  const updateUserData = async (pack: string) => {
    try {
      if (authUser) {
        const userDoc = doc(FIREBASE_DB, 'users', authUser.uid);
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

  return (
    <Modal visible={isVisible} animationType='slide' presentationStyle='pageSheet'>
      <View style={styles.deckImageAndText}>
        <View style={styles.imageView}>
          <Image style={styles.modalImage} source={pack.image} />
        </View>
        <Text style={styles.packName}>{pack.name}</Text>
      </View>
      
      <View style={styles.modal}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.modalTextBold}>This is a small intro to the {pack.name} card pack.</Text>
          <Text style={styles.modalText}>{pack.text}</Text>
        </ScrollView>
        {(packs_owned && packs_owned.includes(pack.id)) ? (
          <View style={styles.modalButtons}>
            <Button text="Back" onPress={() => { onClose(); }} />
          </View>
        ) : (
          <View style={styles.modalButtons}>
          <Button text="Buy pack for 4.99€" buttonBgColor="#707070" onPress={() => { handlePayment(pack.id); }} />
          <Button text="Back" onPress={() => { onClose() }} />
        </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  deckImageAndText: {
    backgroundColor: BACKGROUND_COLOR,
    borderBottomColor: SECONDARY_COLOR,
    borderBottomWidth: 2,
  },
  imageView: {
    alignItems: 'center',
    height: 100,
    width: '100%',
    marginTop: 50,
    backgroundColor: BACKGROUND_COLOR,
  },
  buyText: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: HEADER_FONT_SIZE,
    color: SECONDARY_COLOR,
    fontFamily: FONT_FAMILY_REGULAR,
  },
  packName: {
    marginTop: 20,
    fontFamily: FONT_FAMILY_BOLD,
    color: SECONDARY_COLOR,
    fontSize: TITLE_FONT_SIZE,
    alignSelf: 'center',
  },
  modal: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    padding: '5%',
    alignItems: 'center',
    shadowColor: BLACK,
    justifyContent: 'space-between',
  },
  scrollView: {
    marginBottom: 20,
  },
  modalImage: {
    width: '90%',
    height: '100%',
  },
  modalText: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: REGULAR_FONT_SIZE,
    color: SECONDARY_COLOR,
    fontFamily: FONT_FAMILY_REGULAR,
  },
  modalTextBold: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: REGULAR_FONT_SIZE,
    color: SECONDARY_COLOR,
    fontFamily: FONT_FAMILY_BOLD,
  },
  modalButtons: {
    justifyContent: 'flex-end',
    gap: 15,
    marginBottom: '5%',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 40,
    justifyContent: 'center',
    marginTop: 50,
  },
});