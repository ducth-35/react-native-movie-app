import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {APP_SCREEN, RootStackParamList} from './screen-type';
import {
  FavoriteScreen,
  HomeScreen,
  MoviesScreen,
  TVShowScreen,
} from '../screens';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SettingsScreen} from '../screens/Settings';

const Tab = createBottomTabNavigator<RootStackParamList>();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      }}>
      <Tab.Screen
        name={APP_SCREEN.HOME_SCREEN}
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused, size, color}) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name={APP_SCREEN.MOVIES_SCREEN}
        component={MoviesScreen}
        options={{
          tabBarLabel: 'Movies',
          tabBarIcon: ({focused, size, color}) => (
            <Ionicons
              name={focused ? 'videocam' : 'videocam-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name={APP_SCREEN.TV_SHOW_SCREEN}
        component={TVShowScreen}
        options={{
          tabBarLabel: 'TVShows',
          tabBarIcon: ({focused, size, color}) => (
            <Ionicons
              name={focused ? 'tv' : 'tv-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name={APP_SCREEN.FAVORITES_SCREEN}
        component={FavoriteScreen}
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: ({focused, size, color}) => (
            <Ionicons
              name={focused ? 'heart' : 'heart-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name={APP_SCREEN.SETTINGS_SCREEN}
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({focused, size, color}) => (
            <Ionicons
              name={focused ? 'settings' : 'settings-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
