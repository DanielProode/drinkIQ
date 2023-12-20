import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import LoadingScreen from '../components/LoadingScreen';
import { LIGHTGREY } from '../constants/styles/colors';
import { useAuth } from '../context/authContext';
import ActiveGame from '../screens/ActiveGame';
import CardDecks from '../screens/CardDecks';
import Lobby from '../screens/Lobby';
import Login from '../screens/Login';
import MainMenu from '../screens/MainMenu';
import NewGame from '../screens/NewGame';
import Profile from '../screens/Profile';
import Register from '../screens/Register'
import Settings from '../screens/Settings'

type RootStackParamList = {
  ActiveGame: { gameCode: string };
  Lobby: { roomCode: string, gameHost: boolean };
  Login: undefined;
  Register: undefined;
  MainMenu: undefined;
  NewGame: undefined;
  CardDecks: undefined;
  Settings: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

SplashScreen.preventAutoHideAsync();

export default function Router() {
  const { authUser, isUserLoaded, isUserLoading } = useAuth()
  const [fontsLoaded] = useFonts({
    'Basic': require('../assets/fonts/Basic.ttf'),
    'Cabin-Bold': require('../assets/fonts/Cabin-Bold.ttf'),
    'Cabin-Medium': require('../assets/fonts/Cabin-Medium.ttf'),
    'Cabin-Regular': require('../assets/fonts/Cabin-Regular.ttf'),
    'Cabin-SemiBold': require('../assets/fonts/Cabin-SemiBold.ttf'),
    'CarterOne-Regular': require('../assets/fonts/CarterOne-Regular.ttf'),
    'Knewave': require('../assets/fonts/Knewave.ttf'),
    'JetbrainsMono-Bold': require('../assets/fonts/JetBrainsMono-Bold.ttf'),
    'JosefinSans-Regular': require('../assets/fonts/JosefinSans-Regular.ttf'),
    'JosefinSans-Bold': require('../assets/fonts/JosefinSans-Bold.ttf'),
    'JosefinSans-Medium': require('../assets/fonts/JosefinSans-Medium.ttf'),
    'JosefinSans-Light': require('../assets/fonts/JosefinSans-Light.ttf'),
  });

  useEffect(() => {
    async function loadResourcesAsync() {
      try {
        if (fontsLoaded && isUserLoaded) {
          await SplashScreen.hideAsync();
        }
      } catch (error) {
        console.warn('Error loading fonts:', error);
      }
    }
    loadResourcesAsync();
  }, [fontsLoaded, isUserLoaded]);

  if (isUserLoading || !fontsLoaded) {
    return <LoadingScreen />
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitle: '', headerTransparent: true, headerTintColor: LIGHTGREY, headerBackTitleVisible: false }}>
        {authUser === null ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        ) : (
          <>
            <Stack.Screen name="MainMenu" component={MainMenu} />
            <Stack.Screen name="CardDecks" component={CardDecks} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="NewGame" component={NewGame} />
            <Stack.Screen name="Lobby" component={Lobby} />
            <Stack.Screen name="ActiveGame" component={ActiveGame} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
