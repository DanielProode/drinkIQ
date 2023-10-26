import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native';

import Button from '../components/Button';
import { useAuth } from '../context/authContext';

export type Props = {
  route: RouteProp<{
    Lobby: {
      gameCode: number;
      avatar: ImageSourcePropType;
      drink: ImageSourcePropType;
      playableDeck: ImageSourcePropType;
      hostGame: boolean;
    }
  }>;
  navigation: NativeStackNavigationProp<any>;
};
interface Player {
  id: number;
  name: string;
  avatar: ImageSourcePropType;
  drink: ImageSourcePropType;
}

interface ShowPlayersProps {
  playerArray: Player[];
}

let userName: string;

const joinedPlayers = [
  { id: 1, name: "Host Name", avatar: require('../assets/images/avatar_1.png'), drink: require('../assets/images/drink_1.png')},
  
  
]

export default function Lobby({ route, navigation }: Props) {

  const { gameCode, avatar, drink, playableDeck, hostGame } = route.params;

  const { user } = useAuth();



  if (user?.email) userName = user?.email?.split('@')[0]


  const updatedJoinedPlayers = [...joinedPlayers];

    const userToUpdate = updatedJoinedPlayers.find(player => player.id === 1);

    if (userToUpdate) {
      userToUpdate.avatar = avatar;
      userToUpdate.drink = drink;
      userToUpdate.name = userName;
    }



  const ShowPlayers = ({ playerArray }: ShowPlayersProps) => {
    return (
      <>
        {playerArray.map((player) => (
          <Pressable
            style={styles.playerContainer}
            key={player.id}
            onPress={() => {
              console.log(player.name);
              // Check other player's profile
            }}
          >
            <View style={styles.avatarCircle}>
              <Image style={styles.avatar} source={player.avatar} />
              <Image style={styles.drink} source={player.drink} />
            </View>
            <Text style={styles.name}>{player.name}</Text>
          </Pressable>
        ))}
      </>
    );
  };
  

  return (
    <View style={styles.gameView}>
      <Text style={styles.drinkIQLogo}>DRINKIQ</Text>
      <Text style={styles.gameCode}>#{gameCode}</Text>
      <View style={styles.deckImageContainer}>
      <Image style={styles.deck} source={playableDeck} />
      </View>

      <Text style={styles.waitingText}>Waiting in the lobby:</Text>

      <View style={styles.joinedPlayers}>
        <ShowPlayers playerArray={updatedJoinedPlayers} />
      </View>

      
      <View style={styles.buttonContainer}>

      
      <Button
      marginTop={10}
        onPress={() =>
          navigation.navigate('GameView', { gameCode, avatar, drink })}
        text="START GAME" />
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: '40%',
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
  name: {
    marginLeft: 10,
    fontSize: 18,
    fontFamily: 'Basic',
    color: 'white',
  },
  drink: {
    position: 'absolute',
    resizeMode: 'contain',
    width: '45%',
    height: '45%',
    alignSelf: 'flex-end',
    bottom: 0,
  },
  deck: {
    flex: 1,
    resizeMode: 'contain',
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
