import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { FlatList, ImageProps, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import CardDeck from '../components/CardDeck';
import { CARD_PACKS } from '../constants/general';
import { BACKGROUND_COLOR, PRIMARY_COLOR, SECONDARY_COLOR } from '../constants/styles/colors';
import { FONT_FAMILY_BOLD, FONT_FAMILY_REGULAR, HEADER_FONT_SIZE, LOGO_FONT_FAMILY_REGULAR, REGULAR_LOGO_FONT_SIZE } from '../constants/styles/typography';
import { useAuth } from '../context/authContext';
import useUserStore from '../store/userStore';

export default function CardDecks() {
  const { listenToUserData } = useAuth();
  const { packs_owned } = useUserStore();
  const [searchText, setSearchText] = useState('');

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

  type DeckProps = {id: string, name: string, image: ImageProps, previewImage: ImageProps, text: string, exampleQuestions: string[], previewText: string};

  const Deck = ({id, name, image, previewImage, text, exampleQuestions, previewText}: DeckProps) => (
    <CardDeck pack={{
      id,
      name,
      image,
      previewImage,
      text,
      exampleQuestions,
      previewText,
    }}/>
  );
  

  return (
    <View style={styles.cardDeckView}>
      <Text style={styles.drinkIQLogo}>Drink<Text style={styles.drinkIQOrange}>IQ</Text></Text>
      <View style={styles.searchContainer}>
      <View style={styles.searchBar}>
        <TextInput
        style={styles.input}
        placeholder="Search..."
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
        />
        <Pressable onPress={() => console.log("Pressed search!")}>

        <Image source={require('../assets/images/magnifying-glass.png')} style={styles.searchIcon} />
        </Pressable>
      </View>
      </View>
      <Text style={styles.categoryText}>Suggested for you</Text>
      <View style={styles.gridView}>
      <FlatList
        data={sortedPacks}
        renderItem={({item}) => <Deck id={item.id} name={item.name} image={item.image} previewImage={item.previewImage} text={item.text} exampleQuestions={item.exampleQuestions} previewText={item.previewText}/>}
        keyExtractor={deck => deck.id}
        contentContainerStyle={styles.flatList}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  cardDeckView: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
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
  searchContainer: {
    width: '100%',
    alignItems: 'center',
    padding: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    paddingHorizontal: 10,
    backgroundColor: SECONDARY_COLOR,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 10,
    fontFamily: FONT_FAMILY_REGULAR,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  categoryText: {
    fontFamily: FONT_FAMILY_BOLD,
    fontSize: HEADER_FONT_SIZE,
    color: SECONDARY_COLOR,
    padding: 15,
  },
  gridView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  firstColumn: {
    flex: 1,
  },
  secondColumn: {
    flex: 1,
  },
  thirdColumn: {
    flex: 1,
  },
  cardsView: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  scrollableDeckList: {
    
  },
  flatList: {
    gap: 30,
  },
});
