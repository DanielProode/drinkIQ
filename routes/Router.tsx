import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { ImageSourcePropType } from 'react-native';

import LoadingScreen from '../components/LoadingScreen';
import { useAuth } from '../context/authContext';
import ActiveGame from '../screens/ActiveGame';
import CardDecks from '../screens/CardDecks';
import HostGame from '../screens/HostGame';
import JoinGame from '../screens/JoinGame';
import Lobby from '../screens/Lobby';
import Login from '../screens/Login';
import MainMenu from '../screens/MainMenu';
import NewGame from '../screens/NewGame';
import Profile from '../screens/Profile';
import Register from '../screens/Register'
import Settings from '../screens/Settings';

type RootStackParamList = {
  ActiveGame: { gameCode: number, avatar: ImageSourcePropType, drink: ImageSourcePropType };
  Lobby: { gameCode: number, avatar: ImageSourcePropType, drink: ImageSourcePropType, playableDeck: ImageSourcePropType, hostGame: boolean };
  Login: undefined;
  Register: undefined;
  MainMenu: undefined;
  NewGame: undefined;
  CardDecks: undefined;
  HostGame: undefined;
  JoinGame: { gameCode: number };
  Settings: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

SplashScreen.preventAutoHideAsync();

export default function Router() {
  const { user, userLoaded } = useAuth()
  const [fontsLoaded] = useFonts({
    'Basic': require('../assets/fonts/Basic.ttf'),
    'Cabin-Bold': require('../assets/fonts/Cabin-Bold.ttf'),
    'Cabin-Medium': require('../assets/fonts/Cabin-Medium.ttf'),
    'Cabin-Regular': require('../assets/fonts/Cabin-Regular.ttf'),
    'Cabin-SemiBold': require('../assets/fonts/Cabin-SemiBold.ttf'),
    'CarterOne-Regular': require('../assets/fonts/CarterOne-Regular.ttf'),
    'Knewave': require('../assets/fonts/Knewave.ttf'),
  });

  useEffect(() => {
    async function loadResourcesAsync() {
      try {
        if (fontsLoaded && userLoaded) {
          await SplashScreen.hideAsync();
        }
      } catch (error) {
        console.warn('Error loading fonts:', error);
      }
    }
    loadResourcesAsync();
  }, [fontsLoaded, userLoaded]);

  if (!userLoaded || !fontsLoaded) {
    return <LoadingScreen />
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitle: '', headerTransparent: true, headerTintColor: '#A5AFB9' }}>
        {user == null ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        ) : (
          <>
            <Stack.Screen name="MainMenu" component={MainMenu} />
            <Stack.Screen name="NewGame" component={NewGame} />
            <Stack.Screen name="CardDecks" component={CardDecks} />
            <Stack.Screen name="JoinGame" component={JoinGame} />
            <Stack.Screen name="HostGame" component={HostGame} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="ActiveGame" component={ActiveGame} />
            <Stack.Screen name="Lobby" component={Lobby} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
