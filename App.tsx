import React from 'react';
import MainMenuView from './components/MainMenuView';
import NewGame from './components/NewGame';
import Lobby from './components/Lobby';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import CardDecks from './components/CardDecks';
import JoinGame from './components/JoinGame';
import HostGame from './components/HostGame';
import Profile from './components/Profile';
import GameView from './components/GameView';
import WelcomeView from './components/WelcomeView';
import { ImageSourcePropType } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

type RootStackParamList = {
  GameView: { gameCode: number, avatar: ImageSourcePropType, drink: ImageSourcePropType };
  Lobby: { gameCode: number, avatar: ImageSourcePropType, drink: ImageSourcePropType };
  WelcomeView: undefined;
  MainMenuView: undefined;
  NewGame: undefined;
  CardDecks: undefined;
  HostGame: undefined;
  JoinGame: { gameCode: number };
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();



function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeView" screenOptions={{ headerTitle: '', headerTransparent: true, headerTintColor: '#A5AFB9' }}>
        <Stack.Screen name="WelcomeView" component={WelcomeView} />
        <Stack.Screen name="MainMenuView" component={MainMenuView} />
        <Stack.Screen name="NewGame" component={NewGame} />
        <Stack.Screen name="CardDecks" component={CardDecks} />
        <Stack.Screen name="JoinGame" component={JoinGame} />
        <Stack.Screen name="HostGame" component={HostGame} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="GameView" component={GameView} />
        <Stack.Screen name="Lobby" component={Lobby} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
