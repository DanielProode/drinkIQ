import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/authContext';

export default function CardDecks() {

  let deckOwned: boolean;

  const cardDecks = [{
    id: 'estonia',
    name: 'Estonia card pack',
    image: require('../assets/images/card_deck1.png'),
  }, {
    id: 'football',
    name: 'Football card pack',
    image: require('../assets/images/card_deck2.png'),
  },{
    id: 'birds',
    name: 'Birds card pack',
    image: require('../assets/images/card_deck3.png'),
  }];

  const { user } = useAuth();

  const RenderDecks = (deckArray: {name: string; image: any; id: string }[]) => {

    return deckArray.map((item, index) => {

      deckOwned = false;

      if (user?.packs_owned?.includes(item.id)) deckOwned = true;

      return (
        <Pressable
        style={({ pressed }) => [
          { opacity: pressed ? 0.5 : 1.0 }, styles.cardViewTouchable,
          ]}
          key={index}
          onPress={() => {
            console.log('Pressed ' + item.name)
          }
          }>
            <View style={styles.cardView}>
              <Image style={styles.cardImage} source={item.image} />
              <View style={styles.cardInfo}>
              <Text style={styles.deckTitle}>{item.name}</Text>
              {deckOwned ? <></> : <Text style={styles.lockedText}>Locked</Text>}
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
      <Text style={styles.filterButton}>Filter button</Text>
      <Text style={styles.searchButton}>Search button</Text>
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
  buttonContainer: {
    flexDirection: 'row',
    gap: 40,
    justifyContent: 'center',
    marginTop: 50,
  },
  deckTitle: {
    fontFamily: 'Basic',
    color: 'white',
    fontSize: 20,
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 5,
  },
  lockedText: {
    fontFamily: 'Basic',
    color: 'white',
    fontSize: 20,
    marginTop: 5,
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
    width: '100%',
    height: '100%',
  },
  cardImage: {
    width: '100%',
    height: '75%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 20,
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
