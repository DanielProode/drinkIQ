import { Modal, StyleSheet, Text, View } from 'react-native';

import Button from '../components/Button';
import { BACKGROUND_COLOR, PRIMARY_COLOR, SECONDARY_COLOR } from '../constants/styles/colors';
import { FONT_FAMILY_BOLD, FONT_FAMILY_REGULAR, HEADER_FONT_SIZE, LOGO_FONT_FAMILY_REGULAR, REGULAR_LOGO_FONT_SIZE } from '../constants/styles/typography';


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
    fontFamily: LOGO_FONT_FAMILY_REGULAR,
    marginTop: 50,
    alignSelf: 'flex-start',
    marginLeft: 20,
    fontSize: REGULAR_LOGO_FONT_SIZE,
    color: SECONDARY_COLOR,
    letterSpacing: 3,
    },
drinkIQOrange: {
    fontFamily: LOGO_FONT_FAMILY_REGULAR,
    marginTop: 50,
    fontSize: REGULAR_LOGO_FONT_SIZE,
    color: PRIMARY_COLOR,
    },
tutorialView: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
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
    fontSize: HEADER_FONT_SIZE,
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 20,
    color: SECONDARY_COLOR,
    fontFamily: FONT_FAMILY_REGULAR,
  },
  tutorialTextHeader: {
    fontSize: HEADER_FONT_SIZE,
    alignSelf: 'flex-start',
    marginLeft: 20,
    color: SECONDARY_COLOR,
    fontFamily: FONT_FAMILY_BOLD,
  },
  tutorialTextFooter: {
    fontSize: HEADER_FONT_SIZE,
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 50,
    color: SECONDARY_COLOR,
    fontFamily: FONT_FAMILY_BOLD,
  },
});
