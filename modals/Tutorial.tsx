import { Image, Modal, StyleSheet, Text, View } from 'react-native';

import Button from '../components/Button';


interface TutorialProps {
    isVisible: boolean;
    onClose: () => void;
};

export default function Tutorial({ isVisible, onClose }: TutorialProps) {
  return (
    <Modal visible={isVisible} animationType='slide' presentationStyle='pageSheet'>
      <View style={styles.tutorialView}>
      <Text style={styles.drinkIQLogo}>Drink<Text style={styles.drinkIQOrange}>IQ</Text></Text>
        <View style={styles.viewContainer}>
            <Text style={styles.tutorialTextHeader}>How to play?</Text>
            <Text style={styles.tutorialText}>Each player takes turns answering questions. When it's your turn, your icon will get an orange border.</Text>
            <Text style={styles.tutorialText}>Correct answer grants you the privilege to choose who drinks.</Text>
            <Text style={styles.tutorialText}>Incorrect answers mean you have to take a drink!</Text>
            <Text style={styles.tutorialTextFooter}>Play responsibly!</Text>
        </View>
        <View style={styles.buttonContainer}>

        <Button
            style={styles.closeButton}
            marginTop={50}
            onPress={onClose}
            text="GOT IT"
            buttonBorderColor="#F76D31"
            buttonBgColor="#F76D31" />
            </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
drinkIQLogo: {
    fontFamily: 'JetbrainsMono-Bold',
    marginTop: 50,
    alignSelf: 'flex-start',
    marginLeft: 20,
    fontSize: 30,
    color: '#F2F2F2',
    letterSpacing: 3,
    },
drinkIQOrange: {
    fontFamily: 'JetbrainsMono-Bold',
    marginTop: 50,
    fontSize: 30,
    color: '#F76D31',
    },
tutorialView: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  deckButtonContainer: {
    width: 100,
    alignSelf: 'center',
    aspectRatio: 1 / 1,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
  viewContainer: {
    flex: 1,
    marginTop: 30,
    marginBottom: 50,
    alignItems: 'flex-start',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 100,
  },
  closeButton: {
    marginBottom: 20,
  },
  tutorialText: {
    fontSize: 20,
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 20,
    color: 'white',
    fontFamily: 'JosefinSans-Regular',
  },
  tutorialTextHeader: {
    fontSize: 20,
    alignSelf: 'flex-start',
    marginLeft: 20,
    color: 'white',
    fontFamily: 'JosefinSans-Bold',
  },
  tutorialTextFooter: {
    fontSize: 20,
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 50,
    color: 'white',
    fontFamily: 'JosefinSans-Bold',
  },
});