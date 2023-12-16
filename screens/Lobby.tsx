import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image } from 'expo-image';
import { useState } from 'react';
import { ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native';

import Button from '../components/Button';
import PlayerInLobby from '../components/PlayerInLobby';
import { DEFAULT_AVATAR_IMAGE, DEFAULT_DRINK_IMAGE } from '../constants/general';
import AvatarSelection from '../modals/AvatarSelection';
import CardDeckInfo from '../modals/CardDeckInfo';
import CardDeckSelection from '../modals/CardDeckSelection';
import PlayerProfile from '../modals/PlayerProfile';
import useGameStore from '../store/gameStore';
import useUserStore from '../store/userStore';

interface LobbyProps {
  route: RouteProp<{
    Lobby: {
      gameCode: string;
      gameHost: boolean;
    }
  }>;
  navigation: NativeStackNavigationProp<any>;
};

interface Player {
  username: string;
  avatar: ImageSourcePropType;
  drink: ImageSourcePropType;
}

const joinedPlayers: Player[] = []

const selectedPlayer = { username: "Placeholder", avatar: DEFAULT_AVATAR_IMAGE, drink: DEFAULT_DRINK_IMAGE };

// FETCH all joined players in session excluding host (max 7), to make current player appear first in list (pushed first to array) [TEMP SOLUTION]
// TODO: When fetching players, fetch players from DB and place them in the same order for everyone, and make host appear first (probably need to implement isHost boolean to Player object)
const fetchedPlayersImitation = [{ username: "Bot Alfred", avatar: DEFAULT_AVATAR_IMAGE, drink: DEFAULT_DRINK_IMAGE },
{ username: "Bot Allu", avatar: DEFAULT_AVATAR_IMAGE, drink: DEFAULT_DRINK_IMAGE },
{ username: "Bot Pete", avatar: DEFAULT_AVATAR_IMAGE, drink: DEFAULT_DRINK_IMAGE },
{ username: "Bot Viktor", avatar: DEFAULT_AVATAR_IMAGE, drink: DEFAULT_DRINK_IMAGE },
{ username: "Bot Albert", avatar: DEFAULT_AVATAR_IMAGE, drink: DEFAULT_DRINK_IMAGE },
{ username: "Bot Sasha", avatar: DEFAULT_AVATAR_IMAGE, drink: DEFAULT_DRINK_IMAGE },
{ username: "Bot Anubis", avatar: DEFAULT_AVATAR_IMAGE, drink: DEFAULT_DRINK_IMAGE },
]

const fetchedPlayerObjects: Player[] = fetchedPlayersImitation

export default function Lobby({ route, navigation }: LobbyProps) {
  const { gameCode, gameHost } = route.params;
  const { username } = useUserStore();
  const { avatar, drink, playableDeck, playableDeckImage, playableDeckName, playableDeckText } = useGameStore();
  const [isAvatarSelectionModalVisible, setIsAvatarSelectionModalVisible] = useState(false);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [isCardDeckSelectionModalVisible, setIsCardDeckSelectionModalVisible] = useState(false);
  const [isCardDeckInfoModalVisible, setIsCardDeckInfoModalVisible] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(selectedPlayer);
  const updatedJoinedPlayers = [...joinedPlayers];


  const currentPlayer: Player = {
    username,
    avatar,
    drink
  }

  updatedJoinedPlayers.push(currentPlayer);

  // Imitate looping over fetched players
  fetchedPlayerObjects.map((fetchedPlayerObject) => (
    updatedJoinedPlayers.push(fetchedPlayerObject)
  ))

  const toggleAvatarSelectionModal = () => {
    setIsAvatarSelectionModalVisible(!isAvatarSelectionModalVisible);
  };

  const toggleProfileModal = () => {
    setIsProfileModalVisible(!isProfileModalVisible);
  }

  const checkSelectedPlayer = (player: Player) => {
    setSelectedProfile(player);
  }

  const toggleCardDeckSelectionModal = () => {
    if (gameHost) setIsCardDeckSelectionModalVisible(!isCardDeckSelectionModalVisible)
    else setIsCardDeckInfoModalVisible(!isCardDeckInfoModalVisible)
  };

  return (
    <View style={styles.gameView}>
      <AvatarSelection isVisible={isAvatarSelectionModalVisible} onClose={toggleAvatarSelectionModal} />
      <PlayerProfile profile={selectedProfile} isVisible={isProfileModalVisible} onClose={toggleProfileModal} />
      <CardDeckSelection onClose={toggleCardDeckSelectionModal} isVisible={isCardDeckSelectionModalVisible} />
      <CardDeckInfo onClose={toggleCardDeckSelectionModal} isVisible={isCardDeckInfoModalVisible} pack={{
        id: playableDeck,
        name: playableDeckName,
        image: playableDeckImage,
        previewImage: playableDeckImage,
        text: playableDeckText,
      }} />
      <Text style={styles.drinkIQLogo}>Drink<Text style={styles.drinkIQOrange}>IQ</Text></Text>
      <Text style={styles.gameCode}>#{gameCode}</Text>
      <Pressable style={styles.deckImageContainer} onPress={() => { toggleCardDeckSelectionModal() }}>
        <Image style={styles.deck} source={playableDeckImage} />
      </Pressable>
      <Text style={styles.deckName}>{playableDeckName}</Text>
      <View style={styles.joinedPlayers}>
        {updatedJoinedPlayers.map((player, index) => 
          <PlayerInLobby player={player} index={index} currentPlayer={currentPlayer} toggleAvatarSelectionModal={toggleAvatarSelectionModal} toggleProfileModal={toggleProfileModal} checkSelectedPlayer={checkSelectedPlayer} />
        )}
      </View>
      <View style={styles.buttonContainer}>
        {gameHost ? (
          <Button
            marginTop={10}
            onPress={() =>
              navigation.navigate('ActiveGame', { gameCode })}
            text="START GAME"
            buttonBgColor="#F76D31"
            buttonBorderColor="#F76D31" />
        ) : (
          <Text style={styles.waitingText}>Waiting for host to start the game...</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gameView: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  drinkIQLogo: {
    fontFamily: 'JetbrainsMono-Bold',
    marginTop: 50,
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
  deckImageContainer: {
    width: 100,
    alignSelf: 'center',
    aspectRatio: 1 / 1,
    marginTop: 20,
    borderRadius: 10,
  },
  deckName: {
    marginTop: 8,
    fontSize: 18,
    color: 'white',
    fontFamily: 'JosefinSans-Bold',
  },
  joinedPlayers: {
    flex: 1,
    width: '95%',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignContent: 'center',
  },
  buttonContainer: {
    flex: 0.3,
  },
  deck: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  waitingText: {
    color: 'white',
    fontFamily: 'JosefinSans-Bold',
    marginTop: 20,
    fontSize: 20,
  },
  gameCode: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'JosefinSans-Regular',
  },
});