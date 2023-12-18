import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image } from 'expo-image';
import { onValue, ref, remove } from 'firebase/database';
import { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import Button from '../components/Button';
import PlayerInLobby from '../components/PlayerInLobby';
import { FIREBASE_RTDB } from '../firebaseConfig';
import AvatarSelection from '../modals/AvatarSelection';
import CardDeckInfo from '../modals/CardDeckInfo';
import CardDeckSelection from '../modals/CardDeckSelection';
import PlayerProfile from '../modals/PlayerProfile';
import useGameStore from '../store/gameStore';
import useUserStore from '../store/userStore';
import { useAuth } from '../context/authContext';

interface LobbyProps {
  route: RouteProp<{
    Lobby: {
      roomCode: string;
      gameHost: boolean;
    }
  }>;
  navigation: NativeStackNavigationProp<any>;
};

interface Player {
  username: string;
  avatar: number;
  drink: number;
  isHost?: boolean;
}

export default function Lobby({ route, navigation }: LobbyProps) {
  const { roomCode, gameHost } = route.params;
  const { username } = useUserStore();
  const { playableDeck, playableDeckImage, playableDeckName, playableDeckText } = useGameStore();
  const [isAvatarSelectionModalVisible, setIsAvatarSelectionModalVisible] = useState(false);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [isCardDeckSelectionModalVisible, setIsCardDeckSelectionModalVisible] = useState(false);
  const [isCardDeckInfoModalVisible, setIsCardDeckInfoModalVisible] = useState(false);
  const [fetchedPlayers, setFetchedPlayers] = useState<Player[]>([]);
  const [selectedProfile, setSelectedProfile] = useState({ username: "Placeholder", avatar: 0, drink: 0 });
  const { authUser } = useAuth();
  const userId = authUser ? authUser.uid : '';
  let isLobbyDestroyed = false;

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

  const avatarPressed = (player: Player) => {
    if (player.username === username) {
      toggleAvatarSelectionModal();
      console.log(fetchedPlayers);
    } else {
      toggleProfileModal();
      checkSelectedPlayer(player);
    }
  }

  const removePlayerFromLobby = () => {
    const playerRef = ref(FIREBASE_RTDB, `rooms/${roomCode}/players/${userId}`);
    const roomRef = ref(FIREBASE_RTDB, `rooms/${roomCode}`);
    const removePlayerRef = gameHost ? roomRef : playerRef;

    remove(removePlayerRef)
      .then(() => {
        console.log(`${userId} removed from room`);
      })
      .catch((error) => {
        console.error('Error removing player:', error);
      });
  };

  useEffect(() => {
    const playerRef = ref(FIREBASE_RTDB, `rooms/${roomCode}/players`);
    const unsubscribe = onValue(playerRef, (snapshot) => {
      if (!snapshot.val()) {
        isLobbyDestroyed = true;
        navigation.navigate('NewGame');
      }
      const playersData: Player = snapshot.val() || {};
      const playersArray = Object.values(playersData);
      setFetchedPlayers(playersArray);
    });

    return () => unsubscribe();
  }, []);

  // Back button event
  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        if (isLobbyDestroyed) {return};
        e.preventDefault();
        Alert.alert(
          'Leave the lobby?',
          'Are you sure you want to leave the lobby?',
          [
            { text: "Don't leave", style: 'cancel', onPress: () => { } },
            {
              text: 'Leave',
              style: 'destructive',
              onPress: () => {navigation.dispatch(e.data.action); removePlayerFromLobby();}
            },
          ]
        );
      }),
    [navigation, isLobbyDestroyed]
  );

  return (
    <View style={styles.gameView}>
      <AvatarSelection isVisible={isAvatarSelectionModalVisible} onClose={toggleAvatarSelectionModal} roomCode={roomCode} />
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
      <Text style={styles.gameCode}>#{roomCode}</Text>
      <Pressable style={styles.deckImageContainer} onPress={() => { toggleCardDeckSelectionModal() }}>
        <Image style={styles.deck} source={playableDeckImage} />
      </Pressable>
      <Text style={styles.deckName}>{playableDeckName}</Text>
      <View style={styles.joinedPlayers}>
        {fetchedPlayers.map((player, index) =>
          <PlayerInLobby onPress={() => avatarPressed(player)} player={player} index={index} currentUser={username} key={index} />
        )}
      </View>
      <View style={styles.buttonContainer}>
        {gameHost ? (
          <Button
            marginTop={10}
            onPress={() =>
              navigation.navigate('ActiveGame', { roomCode })}
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