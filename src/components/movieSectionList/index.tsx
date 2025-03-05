import React from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {SkeletonLoading} from '../skeleton';
import {useMoviesHome} from '../../hooks/useMoviesHome';
import {MovieCard} from '../movieCard';
import {navigate} from '../../navigators/navigation-services';
import {APP_SCREEN} from '../../navigators/screen-type';

export enum MovieSectionType {
  trending = 'trending/movie/day',
  popularMovies = 'movie/popular',
  popularTV = 'tv/popular',
}

type MovieSectionListProps = {
  title: string;
  path: MovieSectionType;
};

export const MovieSectionList = ({title, path}: MovieSectionListProps) => {
  const {loading, error, movies} = useMoviesHome(path);

  const handleSeeAll = () => {
    navigate(APP_SCREEN.ALL_MOVIES_SCREEN, {title, type: path});
  };

  const handleMovieDetails = (item: Movie) => {
    navigate(APP_SCREEN.MOVIES_DETAIL_SCREEN, {movie: item});
  };

  const ItemSeparator = () => (
    <View style={{width: scale(15), backgroundColor: 'transparent'}} />
  );

  const renderItem: ListRenderItem<Movie> = ({item}) => {
    return (
      <MovieCard movie={item} onPress={handleMovieDetails?.bind(null, item)} />
    );
  };

  if (error) {
    return <Text>Error loading movies</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerText}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={handleSeeAll}>
          <Text>See all</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <SkeletonLoading />
      ) : (
        <FlatList
          renderItem={renderItem}
          data={movies}
          keyExtractor={item => item.id.toString()}
          horizontal={true}
          ItemSeparatorComponent={ItemSeparator}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 10}}
          initialNumToRender={5}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: scale(15),
  },
  headerText: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: scale(10),
    marginBottom: scale(10),
  },
  title: {
    fontSize: scale(18),
    fontWeight: '800',
  },
});
