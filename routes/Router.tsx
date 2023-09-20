import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ImageSourcePropType } from 'react-native';

import { useAuth } from '../context/authContext';
import CardDecks from '../screens/CardDecks';
import GameView from '../screens/GameView';
import HostGame from '../screens/HostGame';
import JoinGame from '../screens/JoinGame';
import Lobby from '../screens/Lobby';
import Login from '../screens/Login'
import Register from '../screens/Register'
import NewGame from '../screens/NewGame';
import MainMenuView from '../screens/MainMenuView';
import Settings from '../screens/Settings';
import WelcomeView from '../screens/WelcomeView';

type RootStackParamList = {
  GameView: { gameCode: number, avatar: ImageSourcePropType, drink: ImageSourcePropType };
  Lobby: { gameCode: number, avatar: ImageSourcePropType, drink: ImageSourcePropType, playableDeck: ImageSourcePropType, hostGame: boolean };
  WelcomeView: undefined;
  Login: undefined;
  Register: undefined;
  MainMenuView: undefined;
  NewGame: undefined;
  CardDecks: undefined;
  HostGame: undefined;
  JoinGame: { gameCode: number };
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Router() {
  const { user } = useAuth()

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitle: '', headerTransparent: true, headerTintColor: '#A5AFB9' }}>
        {user == null ? (
          <>
            <Stack.Screen name="WelcomeView" component={WelcomeView} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        ) : (
          <>
            <Stack.Screen name="MainMenuView" component={MainMenuView} />
            <Stack.Screen name="NewGame" component={NewGame} />
            <Stack.Screen name="CardDecks" component={CardDecks} />
            <Stack.Screen name="JoinGame" component={JoinGame} />
            <Stack.Screen name="HostGame" component={HostGame} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="GameView" component={GameView} />
            <Stack.Screen name="Lobby" component={Lobby} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
