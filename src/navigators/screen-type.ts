import {NativeStackScreenProps as RNStackScreenProps} from '@react-navigation/native-stack';

export enum APP_SCREEN {
  TAB_SCREEN = 'TAB_SCREEN',
  HOME_SCREEN = 'HOME_SCREEN',
  MOVIES_SCREEN = 'MOVIES_SCREEN',
  MOVIES_DETAIL_SCREEN = 'MOVIES_DETAIL_SCREEN',
  TV_SHOW_SCREEN = 'TV_SHOW_SCREEN',
  FAVORITES_SCREEN = 'FAVORITES_SCREEN',
  MOVIE_DETAIL_SCREEN = 'MOVIE_DETAIL_SCREEN',
  ALL_MOVIES_SCREEN = 'ALL_MOVIES_SCREEN',
  SETTINGS_SCREEN = 'SETTINGS_SCREEN',
}

export type RootStackParamList = {
  [APP_SCREEN.TAB_SCREEN]: undefined;
  [APP_SCREEN.HOME_SCREEN]: undefined;
  [APP_SCREEN.MOVIES_SCREEN]: undefined;
  [APP_SCREEN.MOVIES_DETAIL_SCREEN]: {movie: Movie};
  [APP_SCREEN.TV_SHOW_SCREEN]: undefined;
  [APP_SCREEN.FAVORITES_SCREEN]: undefined;
  [APP_SCREEN.ALL_MOVIES_SCREEN]: {title: string; type: string};
  [APP_SCREEN.SETTINGS_SCREEN]: undefined;
};

export type StackScreenProps<T extends keyof RootStackParamList> =
  RNStackScreenProps<RootStackParamList, T>;
