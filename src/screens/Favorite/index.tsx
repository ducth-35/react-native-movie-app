import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, {useMemo} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TabBar, TabView} from 'react-native-tab-view';
import {APP_SCREEN, RootStackParamList} from '../../navigators/screen-type';
import EmptyContent from '../../components/empty';
import {useFavoriteStore} from '../../store/useFavoriteStore';
import {push} from '../../navigators/navigation-services';
import {scale} from 'react-native-size-matters';
import TextApp from '../../components/textApp';

const FavoriteRoute = ({
  type,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  type: string;
}) => {
  const movies = useFavoriteStore(state => state.movies);

  const favoriteMovies = useMemo(() => {
    if (type === 'all') return movies.slice().reverse();
    if (type === 'movie')
      return movies
        .filter(movie => movie.title != null)
        .slice()
        .reverse();
    if (type === 'tv')
      return movies
        .filter(movie => movie.name != null)
        .slice()
        .reverse();
    return [];
  }, [type, movies]);

  if (favoriteMovies.length <= 0) {
    return (
      <EmptyContent
        title={`No Favorite${
          type !== 'all'
            ? ` ${type.substring(0, 1).toUpperCase()}${type.substring(1)}`
            : ''
        } Available`}
        icon="heart"
      />
    );
  }

  return (
    <FlatList
      data={favoriteMovies}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <Item
          item={item}
          onPress={() => push(APP_SCREEN.MOVIES_DETAIL_SCREEN, {movie: item})}
        />
      )}
      ItemSeparatorComponent={() => (
        <View style={{height: scale(10), backgroundColor: 'transparent'}} />
      )}
      style={styles.container}
      contentContainerStyle={{paddingHorizontal: scale(10)}}
    />
  );
};

type ItemProps = {
  item: Movie;
  onPress: () => void;
};

const Item = ({item, onPress}: ItemProps) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <Image
        style={styles.image}
        source={{
          uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
        }}
      />
      <View style={styles.content}>
        <TextApp
          preset="txt16SemiBold"
          numberOfLines={1}
          style={styles.itemTitle}>
          {item.title ?? item.name}
        </TextApp>
        {item.release_date && (
          <TextApp style={styles.itemDate}>
            {item.release_date ?? item.first_air_date}
          </TextApp>
        )}
        <TextApp numberOfLines={3}>{item.overview}</TextApp>
      </View>
    </TouchableOpacity>
  );
};

const renderScene = ({
  route,
  navigation,
}: {
  route: {key: string; title: string};
  navigation: NativeStackNavigationProp<RootStackParamList>;
}) => <FavoriteRoute navigation={navigation} type={route.key} />;

const routes = [
  {key: 'all', title: 'All'},
  {key: 'movie', title: 'Movie'},
  {key: 'tv', title: 'TV'},
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

export const FavoriteScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const {width} = useWindowDimensions();
  const [index, setIndex] = React.useState<number>(0);

  return (
    <SafeAreaView
      edges={{bottom: 'off', top: 'additive'}}
      style={{flex: 1, backgroundColor: 'white'}}>
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: scale(10),
  },
  image: {
    height: scale(120),
    width: scale(80),
    resizeMode: 'cover',
    borderRadius: scale(5),
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    gap: 5,
  },
  title: {
    fontSize: scale(20),
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    gap: scale(10),
  },
  itemTitle: {
    marginTop: scale(5),
  },
  itemDate: {
    color: 'grey',
  },
  itemOverview: {
    fontSize: scale(14),
    fontWeight: '400',
  },
});
