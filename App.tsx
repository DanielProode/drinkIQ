
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ImageSourcePropType } from 'react-native';

import CardDecks from './screens/CardDecks';
import GameView from './screens/GameView';
import HostGame from './screens/HostGame';
import JoinGame from './screens/JoinGame';
import Lobby from './screens/Lobby';
import MainMenuView from './screens/MainMenuView';
import NewGame from './screens/NewGame';
import Settings from './screens/Settings';
import WelcomeView from './screens/WelcomeView';

type RootStackParamList = {
  GameView: { gameCode: number, avatar: ImageSourcePropType, drink: ImageSourcePropType };
  Lobby: { gameCode: number, avatar: ImageSourcePropType, drink: ImageSourcePropType, playableDeck: ImageSourcePropType, hostGame: boolean };
  WelcomeView: undefined;
  MainMenuView: undefined;
  NewGame: undefined;
  CardDecks: undefined;
  HostGame: undefined;
  JoinGame: { gameCode: number };
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App(): JSX.Element {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeView" screenOptions={{ headerTitle: '', headerTransparent: true, headerTintColor: '#A5AFB9' }}>
        <Stack.Screen name="WelcomeView" component={WelcomeView} />
        <Stack.Screen name="MainMenuView" component={MainMenuView} />
        <Stack.Screen name="NewGame" component={NewGame} />
        <Stack.Screen name="CardDecks" component={CardDecks} />
        <Stack.Screen name="JoinGame" component={JoinGame} />
        <Stack.Screen name="HostGame" component={HostGame} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="GameView" component={GameView} />
        <Stack.Screen name="Lobby" component={Lobby} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
