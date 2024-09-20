import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { FlatList, ImageProps, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import CardDeck from '../components/CardDeck';
import { CARD_PACKS } from '../constants/general';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../constants/styles/colors';
import { SPACING_LG, SPACING_MD, SPACING_SM, SPACING_XXL } from '../constants/styles/style';
import { FONT_FAMILY_CARD_SEMIBOLD, FONT_FAMILY_REGULAR, HEADER_FONT_SIZE, LOGO_FONT_FAMILY_REGULAR, REGULAR_LOGO_FONT_SIZE } from '../constants/styles/typography';
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

  type DeckProps = {id: string, name: string, image: ImageProps, previewImage: ImageProps, text: string, exampleQuestions: string[], previewText: string, price: number, rating: number, playedCards: number};

  const Deck = ({id, name, image, previewImage, text, exampleQuestions, previewText, price, rating, playedCards}: DeckProps) => (
    <CardDeck pack={{
      id,
      name,
      image,
      previewImage,
      text,
      exampleQuestions,
      previewText,
      price,
      rating,
      playedCards,
    }}/>
  );

  return (
    <View style={styles.cardDeckView}>
      <Text style={styles.drinkIQLogo}>Drink<Text style={styles.drinkIQOrange}>IQ</Text></Text>
      <View style={styles.searchContainer}>
      <View style={styles.searchBar}>
      <Image source={require('../assets/images/search_icon.png')} style={styles.searchIcon} />
        <TextInput
        style={styles.input}
        placeholder="Search..."
        placeholderTextColor="#F2F2F270"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
        />
        <Pressable onPress={() => console.log("Pressed filter!")}>
        <Image source={require('../assets/images/filter_icon.png')} style={styles.filterIcon} />
        </Pressable>
      </View>
      </View>
      <Text style={styles.categoryText}>Suggested for you</Text>
      <View style={styles.gridView}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={sortedPacks}
        renderItem={({item}) => <Deck id={item.id} name={item.name} image={item.image} previewImage={item.previewImage} text={item.text} exampleQuestions={item.exampleQuestions} previewText={item.previewText} price={item.price} rating={item.rating} playedCards={item.playedCards}/>}
        keyExtractor={deck => deck.id}
        contentContainerStyle={styles.flatList}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardDeckView: {
    flex: 1,
    backgroundColor: '#1A262D',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  drinkIQLogo: {
    fontFamily: LOGO_FONT_FAMILY_REGULAR,
    marginTop: 50,
    alignSelf: 'center',
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
    borderColor: '#F2F2F2',
    borderRadius: 25,
    paddingHorizontal: 10,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 18,
    padding: 10,
    fontFamily: FONT_FAMILY_REGULAR,
    color: '#F2F2F2',
  },
  placeholder: {
    color: '#FFFFFF',
  },
  searchIcon: {
    width: 35,
    height: 35,
    marginLeft: 10,
  },
  filterIcon: {
    width: 30,
    height: 30,
  },
  categoryText: {
    fontFamily: FONT_FAMILY_CARD_SEMIBOLD,
    fontSize: HEADER_FONT_SIZE,
    color: '#F5F5F5',
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
    gap: SPACING_SM,
    paddingBottom: SPACING_XXL,
  },
});
