import { Image } from 'expo-image';
import { onValue, ref, remove, update } from 'firebase/database';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import Button from '../components/Button';
import PlayerInLobby from '../components/PlayerInLobby';
import { CARD_PACKS } from '../constants/general';
import { BACKGROUND_COLOR, PRIMARY_COLOR, SECONDARY_COLOR } from '../constants/styles/colors';
import { FONT_FAMILY_BOLD, FONT_FAMILY_REGULAR, HEADER_FONT_SIZE, LOGO_FONT_FAMILY_REGULAR, REGULAR_FONT_SIZE, REGULAR_LOGO_FONT_SIZE } from '../constants/styles/typography';
import { useAuth } from '../context/authContext';
import { FIREBASE_RTDB } from '../firebaseConfig';
import AvatarSelection from '../modals/AvatarSelection';
import CardDeckInfo from '../modals/CardDeckInfo';
import CardDeckSelection from '../modals/CardDeckSelection';
import PlayerProfile from '../modals/PlayerProfile';
import useGameStore from '../store/gameStore';

export interface Player {
  userId: string;
  username: string;
  avatar: number;
  drink: number;
}

export default function Lobby() {
  const { isGameHost, roomCode, playableDeckIndex, updatePlayableDeckIndex, updateIsLobbyStarted, updateIsSessionStarted, updateIsGameHost } = useGameStore();
  const { authUser } = useAuth();
  const [isAvatarSelectionModalVisible, setIsAvatarSelectionModalVisible] = useState(false);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [isCardDeckSelectionModalVisible, setIsCardDeckSelectionModalVisible] = useState(false);
  const [isCardDeckInfoModalVisible, setIsCardDeckInfoModalVisible] = useState(false);
  const [fetchedPlayers, setFetchedPlayers] = useState<Player[]>([]);
  const [selectedProfile, setSelectedProfile] = useState({ username: "Placeholder", avatar: 0, drink: 0 });
  const userId = authUser ? authUser.uid : '';

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
    if (isGameHost) setIsCardDeckSelectionModalVisible(!isCardDeckSelectionModalVisible)
    else setIsCardDeckInfoModalVisible(!isCardDeckInfoModalVisible)
  };

  const avatarPressed = (player: Player) => {
    if (player.userId === userId) {
      toggleAvatarSelectionModal();
    } else {
      toggleProfileModal();
      checkSelectedPlayer(player);
    }
  }

  const startGame = async () => {
    try {
      const roomRef = ref(FIREBASE_RTDB, `rooms/${roomCode}`);
      await update(roomRef, { isSessionStarted: true, isGameOver: false, currentTurn: 0 });
      console.log(`Game started`);
    } catch (error) {
      console.error('Error starting game:', error);
    }
  };

  const removePlayerFromLobby = () => {
    const playerRef = ref(FIREBASE_RTDB, `rooms/${roomCode}/players/${userId}`);
    const roomRef = ref(FIREBASE_RTDB, `rooms/${roomCode}`);
    const removePlayerRef = isGameHost ? roomRef : playerRef;

    remove(removePlayerRef)
      .then(() => {
        updateIsLobbyStarted(false);
        updateIsGameHost(false);
      })
      .catch((error) => {
        console.error('Error removing player:', error);
      });
  };

  useEffect(() => {
    const roomRef = ref(FIREBASE_RTDB, `rooms/${roomCode}`);
    const unsubscribe = onValue(roomRef, (snapshot) => {
      const roomData = snapshot.val();
      if (!roomData) {
        updateIsLobbyStarted(false);
        return;
      }
      if (roomData.isSessionStarted) {
        updateIsSessionStarted(true);
        return;
      }
      const cardDeckRef: number = roomData.cardDeck;
      const playersData: Player = roomData.players;
      const playersArray = Object.values(playersData);

      setFetchedPlayers(playersArray);
      updatePlayableDeckIndex(cardDeckRef);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.gameView}>
      <AvatarSelection isVisible={isAvatarSelectionModalVisible} onClose={toggleAvatarSelectionModal} />
      <PlayerProfile isVisible={isProfileModalVisible} onClose={toggleProfileModal} profile={selectedProfile} />
      <CardDeckSelection isVisible={isCardDeckSelectionModalVisible} onClose={toggleCardDeckSelectionModal} />
      <CardDeckInfo isVisible={isCardDeckInfoModalVisible} onClose={toggleCardDeckSelectionModal} pack={CARD_PACKS[playableDeckIndex]} />

      <Text style={styles.drinkIQLogo}>Drink<Text style={styles.drinkIQOrange}>IQ</Text></Text>
      <Text style={styles.gameCode}>#{roomCode}</Text>
      <Pressable style={styles.deckImageContainer} onPress={toggleCardDeckSelectionModal}>
        <Image style={styles.deck} source={CARD_PACKS[playableDeckIndex].image} />
      </Pressable>
      <Text style={styles.deckName}>{CARD_PACKS[playableDeckIndex].name}</Text>
      <View style={styles.joinedPlayers}>
        {fetchedPlayers.map((player) =>
          <PlayerInLobby handlePress={() => avatarPressed(player)} player={player} currentUser={userId} key={player.userId} />
        )}
      </View>

      <View style={styles.buttonContainer}>
        {isGameHost ? (
          <Button
            marginTop={10}
            onPress={startGame}
            text="START GAME"
            buttonBgColor="#F76D31"
            buttonBorderColor="#F76D31" />
        ) : (
          <Text style={styles.waitingText}>Waiting for host to start the game...</Text>
        )}
        <Button
          marginTop={10}
          onPress={removePlayerFromLobby}
          text="LEAVE LOBBY"
          buttonBgColor="#F76D31"
          buttonBorderColor="#F76D31" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gameView: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  drinkIQLogo: {
    fontFamily: LOGO_FONT_FAMILY_REGULAR,
    marginTop: 50,
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
  deckImageContainer: {
    width: 100,
    alignSelf: 'center',
    aspectRatio: 1 / 1,
    marginTop: 20,
    borderRadius: 10,
  },
  deckName: {
    marginTop: 8,
    fontSize: REGULAR_FONT_SIZE,
    color: SECONDARY_COLOR,
    fontFamily: FONT_FAMILY_BOLD,
  },
  joinedPlayers: {
    flex: 1,
    width: '95%',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignContent: 'center',
  },
  buttonContainer: {
    marginBottom: 50,
    alignItems: 'center',
  },
  deck: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  waitingText: {
    color: SECONDARY_COLOR,
    fontFamily: FONT_FAMILY_BOLD,
    marginTop: 20,
    fontSize: HEADER_FONT_SIZE,
  },
  gameCode: {
    fontSize: HEADER_FONT_SIZE,
    color: SECONDARY_COLOR,
    fontFamily: FONT_FAMILY_REGULAR,
  },
});