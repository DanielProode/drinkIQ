import React from 'react';
import MainMenuView from './components/MainMenuView';
import NewGame from './components/NewGame';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import CardDecks from './components/CardDecks';
import JoinGame from './components/JoinGame';
import Lobby from './components/Lobby';
import Profile from './components/Profile';
import GameView from './components/GameView';
import WelcomeView from './components/WelcomeView';
import { ImageSourcePropType } from 'react-native';

type RootStackParamList = {
  GameView: { gameCode: number, baseCardCount: number, baseCardImage: ImageSourcePropType };
  WelcomeView: undefined;
  MainMenuView: undefined;
  NewGame: undefined;
  CardDecks: undefined;
  Lobby: undefined;
  JoinGame: undefined;
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
        <Stack.Screen name="Lobby" component={Lobby} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="GameView" component={GameView} initialParams={{ gameCode: 100000, baseCardCount: 10, baseCardImage: require('./src/card5_icon.png') }}
                />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
