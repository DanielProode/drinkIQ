import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { Modal, View, Image, Text, StyleSheet, ImageProps } from "react-native";

import Button from "../components/Button";
import { FIREBASE_DB } from "../firebaseConfig";

interface CardDeckInfoProps {
    isVisible: boolean;
    onClose: () => void;
    modalContent: { name: string, image: ImageProps, id: string, owned: boolean};
    user: any;
};

const db = FIREBASE_DB;

export default function CardDeckInfo({ isVisible, onClose, modalContent, user }: CardDeckInfoProps) {

    const handlePayment = (pack: string) => {
        // Handle real payment when Buy Pack button is pressed
        // Display loading icon until the process has completed
        updateUserData(pack);
        onClose();
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


    return (
        <Modal visible={isVisible} animationType='slide' presentationStyle='pageSheet'>
            <View style={styles.imageView}>
                <Image style={styles.modalImage} source={modalContent.image} />
            </View>
            <View style={styles.modal}>

                <View style={styles.textView}>
                    <Text style={styles.modalText}>This is a small intro to the {modalContent.name} card pack.</Text>
                    <Text style={styles.modalText}>Will insert some sample questions and sample avatars which will be unlocked. Very long text ahead. Some text about the card packs. Some more text about the card packs.</Text>
                </View>
                {!modalContent.owned && <Text style={styles.buyText}>Buy {modalContent.name} for just 4.99€!</Text>}
                {modalContent.owned ?
                    <View style={styles.modalButtons}>
                        <Button text="Back" onPress={() => { onClose(); }} />
                    </View> :
                    <View style={styles.modalButtons}>
                        <Button text="Buy pack" buttonBgColor="#707070" onPress={() => { handlePayment(modalContent.id); }} />
                        <Button text="Back" onPress={() => { onClose() }} />
                    </View>
                }
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