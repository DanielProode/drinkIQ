import { Image } from 'expo-image';
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { Modal, View, Text, StyleSheet, ImageSourcePropType, ScrollView } from "react-native";

import Button from "../components/Button";
import { BACKGROUND_COLOR, SECONDARY_COLOR } from '../constants/styles/colors';
import { FONT_FAMILY_BOLD, FONT_FAMILY_REGULAR, HEADER_FONT_SIZE, REGULAR_FONT_SIZE, TITLE_FONT_SIZE } from '../constants/styles/typography';
import { useAuth } from "../context/authContext";
import { FIREBASE_DB } from "../firebaseConfig";
import useUserStore from "../store/userStore";

interface CardDeckInfoProps {
  isVisible: boolean;
  onClose: () => void;
  pack: { id: string, name: string, image: ImageSourcePropType, previewImage: ImageSourcePropType, text: string, exampleQuestions: string[]; };
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
    <Modal
      style={styles.modalContainer}
      visible={isVisible}
      transparent
      animationType="slide"
      presentationStyle="overFullScreen"
    >
      <View style={styles.deckImageAndText}>
        {/* Image and pack name */}
        <View style={styles.imageView}>
          <Image style={styles.modalImage} source={pack.image} />
          <Text style={styles.packName}>{pack.name}</Text>
        </View>
  
        {/* Scrollable text section */}
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.modalTextBold}>
            This is a small intro to the {pack.name} card pack.
          </Text>
          <Text style={styles.modalText}>{pack.text}</Text>
          <Text style={styles.modalTextBold}>
            Below are a few example questions from this card pack:
          </Text>
          {pack.exampleQuestions.map((question, index) => (
            <Text key={index} style={styles.modalText}>
              {question}
            </Text>
          ))}
        </ScrollView>
        
        {/* Buttons (conditionally rendered based on ownership) */}
          <View style={styles.modalButtons}>
          {packs_owned && packs_owned.includes(pack.id) ? (
            <Button text="Back" onPress={() => onClose()} />
          ) : (
            <View style={styles.buyPackContainer}>
            <Text style={styles.buyText}>
              Buy {pack.name} for just 4.99€!
            </Text>
              <Button
                text="Buy pack"
                buttonBgColor="#707070"
                onPress={() => handlePayment(pack.id)}
              />
              <Button text="Back" onPress={() => onClose()} />
          </View>
        )}
      </View>
      </View>
    </Modal>
  );
  
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  deckImageAndText: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    padding: 20,
  },
  scrollViewContent: {
    paddingVertical: 20,
    alignItems: "center",
  },
  imageView: {
    alignItems: "center",
    paddingTop: 50,
  },
  modalImage: {
    width: "65%",
    height: undefined,
    aspectRatio: 1,
  },
  packName: {
    marginTop: 10,
    fontFamily: FONT_FAMILY_BOLD,
    fontSize: TITLE_FONT_SIZE,
    color: SECONDARY_COLOR,
    alignSelf: "center",
  },
  modalTextBold: {
    fontFamily: FONT_FAMILY_BOLD,
    fontSize: TITLE_FONT_SIZE,
    color: SECONDARY_COLOR,
    marginBottom: 10,
    textAlign: "auto",
  },
  modalText: {
    fontFamily: FONT_FAMILY_REGULAR,
    fontSize: REGULAR_FONT_SIZE,
    color: SECONDARY_COLOR,
    marginBottom: 10,
    padding: 20,
    textAlign: "left",
    letterSpacing: 1.1,
  },
  modalButtons: {
    alignItems: "center",
    marginTop: 20,
  },
  buyPackContainer: {
    alignItems: "center",
    gap: 10,
  },
  buyText: {
    fontSize: HEADER_FONT_SIZE,
    fontFamily: FONT_FAMILY_REGULAR,
    color: SECONDARY_COLOR,
    textAlign: "center",
  },
});
