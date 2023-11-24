import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { Modal, View, Image, Text, StyleSheet, ImageProps } from "react-native";

import Button from "../components/Button";
import { useAuth } from "../context/authContext";
import { FIREBASE_DB } from "../firebaseConfig";
import useUserStore from "../store/userStore";

interface CardDeckInfoProps {
  isVisible: boolean;
  onClose: () => void;
  pack: { id: string, name: string, image: ImageProps, previewImage: ImageProps, text: string; };
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
      <View style={styles.imageView}>
        <Image style={styles.modalImage} source={pack.image} />
      </View>
      <View style={styles.modal}>
        <View style={styles.textView}>
          <Text style={styles.modalText}>This is a small intro to the {pack.name} card pack.</Text>
          <Text style={styles.modalText}>{pack.text}</Text>
        </View>
        {(packs_owned && packs_owned.includes(pack.id)) ? (
          <View style={styles.modalButtons}>
            <Button text="Back" onPress={() => { onClose(); }} />
          </View>
        ) : (
          <View>
            <Text style={styles.buyText}>Buy {pack.name} for just 4.99€!</Text>
            <View style={styles.modalButtons}>
              <Button text="Buy pack" buttonBgColor="#707070" onPress={() => { handlePayment(pack.id); }} />
              <Button text="Back" onPress={() => { onClose() }} />
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  imageView: {
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
    height: 200,
  },
  buyText: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 20,
    color: 'white',
    fontFamily: 'Basic',
  },
  textView: {

  },
  modal: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    justifyContent: 'space-between',
  },
  modalImage: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  modalText: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
    color: 'white',
    fontFamily: 'Basic',
  },
  modalButtons: {
    justifyContent: 'flex-end',
    gap: 15,
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 40,
    justifyContent: 'center',
    marginTop: 50,
  },
});