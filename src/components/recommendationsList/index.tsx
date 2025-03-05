import { useQuery } from '@tanstack/react-query';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { fetchSimilarMoviesorTv } from '../../apis/api';
import { navigate } from '../../navigators/navigation-services';
import { APP_SCREEN } from '../../navigators/screen-type';
import { MovieCard } from '../movieCard';
import { SkeletonLoading } from '../skeleton';

type RecommendationsListProps = {
  movieId: number;
  type: string;
};
export const RecommendationsList = ({
  movieId,
  type,
}: RecommendationsListProps) => {
  const {
    isPending: loading,
    error,
    data: movies,
  } = useQuery({
    queryKey: ['fetchSimilarMoviesorTv', type, movieId],
    queryFn: async () => fetchSimilarMoviesorTv(type, movieId),
  });

  const handleMovieDetail = (item: Movie) => {
    navigate(APP_SCREEN.MOVIES_DETAIL_SCREEN, {movie: item});
  };

  if (error) {
    return <Text>Error loading movies</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommendations</Text>
      {loading ? (
        <SkeletonLoading />
      ) : (
        <FlatList
          renderItem={({item}) => (
            <MovieCard
              movie={item}
              onPress={handleMovieDetail.bind(null, item)}
            />
          )}
          data={movies}
          keyExtractor={item => item.id.toString()}
          horizontal={true}
          ItemSeparatorComponent={ItemSeparator}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: scale(10)}}
          initialNumToRender={5}
        />
      )}
    </View>
  );
};

const ItemSeparator = () => (
  <View style={{width: scale(15), backgroundColor: 'transparent'}} />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: scale(15),
  },
  headerText: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: scale(10),
    marginBottom: scale(10),
  },
  title: {
    fontSize: scale(18),
    fontWeight: '800',
    marginHorizontal: scale(15),
    marginBottom: scale(10),
  },
});
