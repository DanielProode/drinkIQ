import { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import CardDeck from '../components/CardDeck';
import { useAuth } from '../context/authContext';
import useUserStore from '../store/userStore';

const cardPacks = [{
  id: 'estonia',
  name: 'Estonia card pack',
  image: require('../assets/images/estonia_deck.png'),
  previewImage: require('../assets/images/estonia_deck_preview.png'),
  text: "Information about the Estonia card pack.",
}, {
  id: 'football',
  name: 'Football card pack',
  image: require('../assets/images/football_deck.png'),
  previewImage: require('../assets/images/football_deck_preview.png'),
  text: "Information about the Football card pack.",
}, {
  id: 'birds',
  name: 'Birds card pack',
  image: require('../assets/images/bird_deck.png'),
  previewImage: require('../assets/images/birds_deck_preview.png'),
  text: "Information about the Birds card pack.",
}];

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

  const sortedPacks = [...cardPacks].sort(sortDecks);

  useEffect(() => {
    const unsubscribe = listenToUserData('packs_owned');
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.cardDeckView}>
      <Text style={styles.drinkIQLogo}>DRINKIQ</Text>
      <View style={styles.cardsView}>
        <ScrollView>
          {sortedPacks.map((pack) => (
            <CardDeck pack={pack} key={pack.id} />
          ))}
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
  drinkIQLogo: {
    fontFamily: 'Knewave',
    marginTop: 50,
    marginLeft: 20,
    fontSize: 30,
    color: 'white',
  },
  cardsView: {
    flex: 1,
    marginTop: 70,
    width: '100%',
    alignItems: 'center',
  },
});
