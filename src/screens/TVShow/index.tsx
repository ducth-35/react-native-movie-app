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
import EmptyContent from '../../components/empty';
import LoadingIndicator from '../../components/loading';
import {MovieCard} from '../../components/movieCard';
import {useTVShows} from '../../hooks/useTVShows';
import {APP_SCREEN, RootStackParamList} from '../../navigators/screen-type';
import {push} from '../../navigators/navigation-services';

type TVShowsProps = {
  type: string;
  navigation: NativeStackNavigationProp<RootStackParamList>;
};
const TVShowsRoute = ({navigation, type}: TVShowsProps) => {
  const {status, error, fetchNextPage, data, isFetchingNextPage} =
    useTVShows(type);
  const {width} = useWindowDimensions();

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
  route: any;
  navigation: NativeStackNavigationProp<RootStackParamList>;
}) => <TVShowsRoute type={route.key} navigation={navigation} />;

const routes = [
  {key: 'popular', title: 'Popular'},
  {key: 'airing_today', title: 'Airing Today'},
  {key: 'on_the_air', title: 'On TV'},
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

export const TVShowScreen = ({
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
