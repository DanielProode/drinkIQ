import React, { } from 'react';
import { Image, ImageSourcePropType, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function CardDeckSelection(props: { visibility: any; }): JSX.Element {

    const { visibility } = props;

    const ownedCardDecks = [
                                require('../src/card_deck1.png'),
                                require('../src/card_deck2.png'),
                                require('../src/card_deck3.png'),
                                require('../src/card_deck2.png'),
                                require('../src/card_deck1.png'),
    ];

    const availableCardDecks = [
                                require('../src/card_deck2.png'),
                                require('../src/card_deck1.png'),
                                require('../src/card_deck2.png'),
                                require('../src/card_deck1.png'),
                                require('../src/card_deck2.png'),
];

    const RenderCardDecks = ( myArray: Array<ImageSourcePropType> ) =>  {

        return myArray.map((cardDeck) => {
            return (
                <TouchableOpacity
                activeOpacity={0.7}
                style={styles.cardDeckContainer}
                onPress={() =>
                    console.log("Pressed!")
                } >
                    <Image style={styles.cardDeck} source={cardDeck}/>
                </TouchableOpacity>
            );
        });
    };

  return (
    <View style={styles.termsView}>

        <Text style={styles.closeButton} onPress={() => visibility(false)}>X</Text>
        <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollView}>
        <View style={styles.termsTextView} >

            <Text style={styles.text}>Card Decks you have</Text>
            <View style={styles.ownedCardDeck}>
                {RenderCardDecks(ownedCardDecks)}
            </View>
            <Text style={styles.text}>Card Decks available</Text>
            <View style={styles.availableCardDeck}>
                {RenderCardDecks(availableCardDecks)}
            </View>
            </View>
            </ScrollView>
    </View>

  );
}
const styles = StyleSheet.create({
    termsView: {
        position: 'absolute',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        top: 30, bottom: 30, left: 0, right: 0,
        padding: 10,
        zIndex: 1,
    },
    scrollView: {
        flexGrow: 1,
        width: '100%',
        justifyContent: 'center',
    },
    closeButton: {
        position: 'absolute',
        fontFamily: 'Basic',
        color: '#1E1E1E',
        fontSize: 40,
        right: 15,
        top: 5,
    },
    cardDeck: {
        flex: 1,
        resizeMode: 'contain',
        width: '100%', // Take up all available width
        height: '100%', // Take up all available height
        alignSelf: 'center',
    },
    cardDeckContainer: {
        width: 180,
        height: 190,
        borderRadius: 10,
        marginTop: 10,
    },
    ownedCardDeck: {

    },
    availableCardDeck: {

    },
    termsTextView: {
        marginTop: 50,
    },
    text: {
        color: 'black',
        fontSize: 20,
        fontFamily: 'Basic',
    },
    termsParagraph: {
        marginTop: 10,
    },
  });
export default CardDeckSelection;
