import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native';
import { DEFAULT_AVATAR_IMAGE, DEFAULT_DRINK_IMAGE } from '../constants/general';

import Button from '../components/Button';
import AvatarSelection from '../modals/AvatarSelection';
import CardDeckSelection from '../modals/CardDeckSelection';
import useGameStore from '../store/gameStore';
import useUserStore from '../store/userStore';
import PlayerProfile from '../modals/PlayerProfile';

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

interface ShowPlayersProps {
  playerArray: Player[];
}

const joinedPlayers: Player[] = []

var selectedPlayer = {username: "Placeholder", avatar: DEFAULT_AVATAR_IMAGE, drink: DEFAULT_DRINK_IMAGE};

// FETCH all joined players in session excluding host (max 7)
const fetchedPlayersImitation = [ {username: "Bot Alfred", avatar: DEFAULT_AVATAR_IMAGE, drink: DEFAULT_DRINK_IMAGE },
                                  {username: "Bot Allu", avatar: DEFAULT_AVATAR_IMAGE, drink: DEFAULT_DRINK_IMAGE },
                                  {username: "Bot Pete", avatar: DEFAULT_AVATAR_IMAGE, drink: DEFAULT_DRINK_IMAGE },
                                  {username: "Bot Viktor", avatar: DEFAULT_AVATAR_IMAGE, drink: DEFAULT_DRINK_IMAGE },
                                  {username: "Bot Albert", avatar: DEFAULT_AVATAR_IMAGE, drink: DEFAULT_DRINK_IMAGE },
                                  {username: "Bot Sasha", avatar: DEFAULT_AVATAR_IMAGE, drink: DEFAULT_DRINK_IMAGE },
                                  {username: "Bot Anubis", avatar: DEFAULT_AVATAR_IMAGE, drink: DEFAULT_DRINK_IMAGE },
                                ]

const fetchedPlayerObjects: Player[] = fetchedPlayersImitation

export default function Lobby({ route, navigation }: LobbyProps) {
  const { gameCode, gameHost } = route.params;
  const { username } = useUserStore();
  const { avatar, drink, playableDeckImage } = useGameStore();
  const [isAvatarSelectionModalVisible, setIsAvatarSelectionModalVisible] = useState(false);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [isCardDeckSelectionModalVisible, setIsCardDeckSelectionModalVisible] = useState(false);
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
    if (gameHost) setIsCardDeckSelectionModalVisible(!isCardDeckSelectionModalVisible);
  };

  const ShowPlayers = ({ playerArray }: ShowPlayersProps) => {
    return (
      <>
        {playerArray.map((player) => (
          <Pressable
            style={styles.playerContainer}
            //KEY set as username - implement unique ID's and replace
            key={player.username}
            onPress={() => {
              console.log(player.username);
              if (player.username == currentPlayer.username) {
                toggleAvatarSelectionModal();
              } else {
                toggleProfileModal();
                checkSelectedPlayer(player);
              }
            }}
          >
            <View style={styles.avatarCircle}>
              <Image style={styles.avatar} source={player.avatar} />
              <Image style={styles.drink} source={player.drink} />
            </View>
            <Text style={styles.name}>{player.username}</Text>
          </Pressable>
        ))}
      </>
    );
  };

  return (
    <View style={styles.gameView}>
      <AvatarSelection isVisible={isAvatarSelectionModalVisible} onClose={toggleAvatarSelectionModal} />
      <PlayerProfile profile={selectedProfile} isVisible={isProfileModalVisible} onClose={toggleProfileModal} />
      <CardDeckSelection onClose={toggleCardDeckSelectionModal} isVisible={isCardDeckSelectionModalVisible} />
      <Text style={styles.drinkIQLogo}>DRINKIQ</Text>
      <Text style={styles.gameCode}>#{gameCode}</Text>
      <Pressable style={styles.deckImageContainer} onPress={() => { toggleCardDeckSelectionModal() }}>
        <Image style={styles.deck} source={playableDeckImage} />
      </Pressable>
      <View style={styles.joinedPlayers}>
        <ShowPlayers playerArray={updatedJoinedPlayers} />
      </View>
      <View style={styles.buttonContainer}>
        {gameHost ? (
          <Button
            marginTop={10}
            onPress={() =>
              navigation.navigate('ActiveGame', { gameCode })}
            text="START GAME" />
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
    fontFamily: 'Knewave',
    marginTop: 50,
    fontSize: 30,
    color: 'white',
  },
  playerContainer: {
    width: '40%',
    marginTop: 10,
    marginLeft: 10,
    aspectRatio: 1.5,
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatarCircle: {
    width: '48%',
    aspectRatio: 1 / 1,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  deckImageContainer: {
    width: 100,
    alignSelf: 'center',
    aspectRatio: 1 / 1,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
  joinedPlayers: {
    flex: 1,
    width: '95%',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignContent: 'space-around',
  },
  buttonContainer: {
    flex: 0.3,
  },
  avatar: {
    flex: 1,
    resizeMode: 'contain',
    width: '80%',
    height: '80%',
    alignSelf: 'center',
  },
  drink: {
    position: 'absolute',
    resizeMode: 'contain',
    width: '45%',
    height: '45%',
    alignSelf: 'flex-end',
    bottom: 0,
  },
  name: {
    marginLeft: 10,
    fontSize: 18,
    fontFamily: 'Basic',
    color: 'white',
  },
  deck: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    borderColor: '#3395EF',
    borderWidth: 1,
    borderRadius: 10,
  },
  waitingText: {
    color: 'white',
    fontFamily: 'Basic',
    marginTop: 10,
    fontSize: 20,
  },
  gameCode: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Basic',
  },
});