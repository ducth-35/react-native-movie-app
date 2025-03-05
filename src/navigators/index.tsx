import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {HomeScreen} from '../screens';
import {MovieDetailScreen} from '../screens/Detail';
import {APP_SCREEN, RootStackParamList} from './screen-type';
import {TabNavigator} from './tab-navigator';
import {navigationRef} from './navigation-services';
import {AllMovieScreen} from '../screens/AllMovies';

export const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigations: React.FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={APP_SCREEN.TAB_SCREEN}>
        <Stack.Screen name={APP_SCREEN.TAB_SCREEN} component={TabNavigator} />
        <Stack.Screen name={APP_SCREEN.HOME_SCREEN} component={HomeScreen} />
        <Stack.Screen
          name={APP_SCREEN.MOVIES_DETAIL_SCREEN}
          component={MovieDetailScreen}
        />
        <Stack.Screen
          name={APP_SCREEN.ALL_MOVIES_SCREEN}
          component={AllMovieScreen}
          options={{
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
