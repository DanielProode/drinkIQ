import { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import CardDeck from '../components/CardDeck';
import { CARD_PACKS } from '../constants/general';
import { BACKGROUND_COLOR, PRIMARY_COLOR, SECONDARY_COLOR } from '../constants/styles/colors';
import { LOGO_FONT_FAMILY_REGULAR, REGULAR_LOGO_FONT_SIZE } from '../constants/styles/typography';
import { useAuth } from '../context/authContext';
import useUserStore from '../store/userStore';

export default function CardDecks() {
  const { listenToUserData } = useAuth();
  const { packs_owned } = useUserStore();

  const sortDecks = (pack: { id: string }) => {
    if (pack.id && packs_owned.includes(pack.id)) {
      return -1;
    } else if (!pack.id && packs_owned.includes(pack.id)) {
      return 1;
    }
    return 0;
  }

  const sortedPacks = [...CARD_PACKS].sort(sortDecks);

  useEffect(() => {
    const unsubscribe = listenToUserData('packs_owned');
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.cardDeckView}>
      <Text style={styles.drinkIQLogo}>Drink<Text style={styles.drinkIQOrange}>IQ</Text></Text>
      <View style={styles.cardsView}>
        <ScrollView>
          {sortedPacks.map((pack) => (
            <CardDeck pack={pack} key={pack.id} />
          ))}
          <View style={styles.bottomMargin}/>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardDeckView: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    paddingLeft: 20,
    paddingRight: 20,
  },
  drinkIQLogo: {
    fontFamily: LOGO_FONT_FAMILY_REGULAR,
    marginTop: 50,
    marginLeft: 20,
    fontSize: REGULAR_LOGO_FONT_SIZE,
    color: SECONDARY_COLOR,
    letterSpacing: 3,
  },
  drinkIQOrange: {
    color: PRIMARY_COLOR,
  },
  cardsView: {
    flex: 1,
    marginTop: 70,
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  bottomMargin: {
    marginBottom: 50,
  },
});
