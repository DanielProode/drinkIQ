import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { BACKGROUND_COLOR, WHITE } from '../constants/styles/colors';
import { FONT_FAMILY_REGULAR, HEADER_FONT_SIZE, REGULAR_LOGO_FONT_SIZE } from '../constants/styles/typography';

interface TermsAndConditionsProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function TermsAndConditions({ isVisible, onClose }: TermsAndConditionsProps) {
  return (
    <Modal animationType="slide" presentationStyle='pageSheet' visible={isVisible}>
      <View style={styles.termsView}>
        <View style={styles.termsContent}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>X</Text>
          </Pressable>
          <ScrollView>
            <Text style={styles.termsTitle}>Terms and conditions</Text>
            <Text style={styles.termsParagraph}>1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id purus ac massa maximus ornare nec ac risus. Quisque convallis maximus nunc, vitae porta nisl tincidunt a. Proin at sem vestibulum, convallis turpis a, lacinia mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque mattis efficitur augue vitae auctor. Fusce massa lacus, tincidunt non turpis at, malesuada pellentesque libero. In hac habitasse platea dictumst. Nullam sem eros, ullamcorper nec maximus et, porttitor sit amet nisl. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec eu eleifend est, dignissim cursus massa. Donec ut elementum leo, vitae tincidunt velit. Nullam placerat lectus urna, a aliquet leo dictum a. Aliquam erat volutpat.</Text>
            <Text style={styles.termsParagraph}>2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id purus ac massa maximus ornare nec ac risus. Quisque convallis maximus nunc, vitae porta nisl tincidunt a. Proin at sem vestibulum, convallis turpis a, lacinia mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque mattis efficitur augue vitae auctor. Fusce massa lacus, tincidunt non turpis at, malesuada pellentesque libero. In hac habitasse platea dictumst. Nullam sem eros, ullamcorper nec maximus et, porttitor sit amet nisl. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec eu eleifend est, dignissim cursus massa. Donec ut elementum leo, vitae tincidunt velit. Nullam placerat lectus urna, a aliquet leo dictum a. Aliquam erat volutpat.</Text>
            <Text style={styles.termsParagraph}>3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id purus ac massa maximus ornare nec ac risus. Quisque convallis maximus nunc, vitae porta nisl tincidunt a. Proin at sem vestibulum, convallis turpis a, lacinia mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque mattis efficitur augue vitae auctor. Fusce massa lacus, tincidunt non turpis at, malesuada pellentesque libero. In hac habitasse platea dictumst. Nullam sem eros, ullamcorper nec maximus et, porttitor sit amet nisl. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec eu eleifend est, dignissim cursus massa. Donec ut elementum leo, vitae tincidunt velit. Nullam placerat lectus urna, a aliquet leo dictum a. Aliquam erat volutpat.</Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  termsView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BACKGROUND_COLOR,
  },
  termsContent: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 0,
  },
  closeButtonText: {
    fontFamily: FONT_FAMILY_REGULAR,
    color: WHITE,
    fontSize: REGULAR_LOGO_FONT_SIZE,
  },
  termsTitle: {
    color: WHITE,
    fontSize: HEADER_FONT_SIZE,
    fontFamily: FONT_FAMILY_REGULAR,
    textAlign: 'center',
    marginBottom: 30
  },
  termsParagraph: {
    marginTop: 10,
    color: WHITE,
    textAlign: 'center',
  },
});
