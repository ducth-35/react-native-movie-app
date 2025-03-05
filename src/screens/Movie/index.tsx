import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  useWindowDimensions,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TabBar, TabView} from 'react-native-tab-view';
import {APP_SCREEN, RootStackParamList} from '../../navigators/screen-type';
import {MovieCard} from '../../components/movieCard';
import EmptyContent from '../../components/empty';
import LoadingIndicator from '../../components/loading';
import {useMovies} from '../../hooks/useMovies';
import { push } from '../../navigators/navigation-services';

type MoviewRouteProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  type: string;
};
const MoviesRoute = ({navigation, type = 'popular'}: MoviewRouteProps) => {
  const {width} = useWindowDimensions();
  const {status, error, fetchNextPage, isFetchingNextPage, data} =
    useMovies(type);

  if (status === 'pending') {
    return <LoadingIndicator />;
  }

  if (status === 'error') {
    return <EmptyContent title={error.message} icon="information-circle" />;
  }

  return (
    <FlatList
      data={data.pages.flatMap(page => page.results)}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <MovieCard
          movie={item}
          onPress={() => push(APP_SCREEN.MOVIES_DETAIL_SCREEN, {movie: item})}
          style={{width: (width - 30) / 2}}
        />
      )}
      ItemSeparatorComponent={() => <View style={{height: 15}} />}
      numColumns={2}
      columnWrapperStyle={{gap: 10}}
      contentContainerStyle={{paddingHorizontal: 10}}
      onEndReached={() => fetchNextPage()}
      onEndReachedThreshold={0.3}
      style={{paddingVertical: 15, backgroundColor: 'white'}}
      ListFooterComponent={() =>
        isFetchingNextPage ? <ActivityIndicator /> : null
      }
    />
  );
};

const renderScene = ({
  route,
  navigation,
}: {
  route: {key: string; title: string};
  navigation: NativeStackNavigationProp<RootStackParamList>;
}) => <MoviesRoute type={route.key} navigation={navigation} />;

const routes = [
  {key: 'popular', title: 'Popular'},
  {key: 'now_playing', title: 'Now Playing'},
  {key: 'upcoming', title: 'Upcoming'},
  {key: 'top_rated', title: 'Top Rated'},
];

const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    activeColor="tomato"
    inactiveColor="grey"
    pressOpacity={0.5}
    gap={0}
    indicatorStyle={{backgroundColor: 'tomato'}}
    style={{backgroundColor: 'white', borderWidth: 0}}
  />
);

export const MoviesScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const {width} = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white'}}
      edges={{bottom: 'off', top: 'additive'}}>
      <TabView
        navigationState={{index, routes}}
        renderScene={({route}) => renderScene({route, navigation})}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{width: width}}
        pagerStyle={{backgroundColor: 'white'}}
      />
    </SafeAreaView>
  );
};
