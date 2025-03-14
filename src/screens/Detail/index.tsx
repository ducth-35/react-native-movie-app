import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useMemo} from 'react';
import {
  Alert,
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CastSectionList from '../../components/castSectionList';
import {RecommendationsList} from '../../components/recommendationsList';
import {pop} from '../../navigators/navigation-services';
import {APP_SCREEN, RootStackParamList} from '../../navigators/screen-type';
import {useFavoriteStore} from '../../store/useFavoriteStore';
import TextApp from '../../components/textApp';

type MovieDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  APP_SCREEN.MOVIES_DETAIL_SCREEN
>;

export const MovieDetailScreen: React.FC<MovieDetailScreenProps> = ({
  route,
}) => {
  const movie = route?.params?.movie;
  const setFavoriteMovie = useFavoriteStore(state => state.setMovie);
  const removeFavoriteMovies = useFavoriteStore(state => state.removeMovie);
  const isFavorite = useFavoriteStore(state => state.checkMovie(movie.id));

  const toogleFavorite = useCallback(() => {
    if (isFavorite) {
      removeFavoriteMovies(movie.id);
    } else {
      setFavoriteMovie(movie);
    }
  }, [movie.id, isFavorite, removeFavoriteMovies, setFavoriteMovie]);

  const handleOpenURL = useCallback(async () => {
    const url = `https://www.themoviedb.org/${
      movie.title == null ? 'tv' : 'movie'
    }/${movie.id}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      Linking.openURL(url);
    } else {
      Alert.alert('Error', 'Cannot open URL');
    }
  }, [movie]);

  const progressColor = useMemo(() => {
    if (movie.vote_average >= 7) return '#26CA67';
    if (movie.vote_average >= 4) return '#C9CF26';
    return '#CF004E';
  }, [movie.vote_average]);

  const backgroundColor = useMemo(() => {
    if (movie.vote_average >= 7) return '#19361E';
    if (movie.vote_average >= 4) return '#322F0D';
    return '#440C28';
  }, [movie.vote_average]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.imageContainer}>
        <SafeAreaView
          edges={{bottom: 'off', top: 'additive'}}
          style={styles.topButtonContainer}>
          <View style={styles.circleButton}>
            <TouchableOpacity onPress={pop}>
              <Ionicons name="arrow-back" size={24} color={'white'} />
            </TouchableOpacity>
          </View>

          <View style={styles.circleButton}>
            <TouchableOpacity onPress={toogleFavorite}>
              <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={24}
                color={'white'}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <Image
          style={styles.backdropImage}
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`,
          }}
        />
        <LinearGradient
          colors={[
            'rgba(32, 32, 53, 1)',
            'rgba(32, 32, 53, 0.84)',
            'rgba(32, 32, 53, 0.84)',
          ]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          locations={[0.2, 0.5, 1]}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: 20,
            marginBottom: 20,
            gap: 10,
          }}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
            }}
            style={styles.image}
          />
          <View style={{flex: 1, gap: 10}}>
            <TextApp preset="txt24Bold">
              {movie.title ?? movie.name} (
              {new Date(
                movie.release_date ?? movie.first_air_date ?? '',
              ).getFullYear()}
              )
            </TextApp>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <View
                style={{
                  backgroundColor: '#091619',
                  height: 50,
                  width: 50,
                  borderRadius: 25,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <AnimatedCircularProgress
                  size={45}
                  width={3}
                  fill={movie.vote_average * 10}
                  tintColor={progressColor}
                  onAnimationComplete={() => console.log('onAnimationComplete')}
                  backgroundColor={backgroundColor}
                  rotation={0}>
                  {_ => (
                    <TextApp preset="txt12Bold">
                      {(movie.vote_average * 10).toFixed() + '%'}
                    </TextApp>
                  )}
                </AnimatedCircularProgress>
              </View>
              <TextApp style={{color: 'white', fontWeight: 'bold'}}>
                {'User\nScore'}
              </TextApp>
            </View>
            {movie.overview && (
              <>
                <View
                  style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                  <TextApp preset="txt18Bold" style={{color: 'white'}}>
                    Overview
                  </TextApp>
                  <Ionicons name="information-circle" size={20} color="white" />
                </View>
                <TextApp preset="txt12Regular" numberOfLines={4}>
                  {movie.overview}
                </TextApp>
              </>
            )}
          </View>
        </View>

        <View
          style={{
            backgroundColor: '#091619',
            height: 50,
            width: 50,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            right: 20,
            bottom: -25,
          }}>
          <TouchableOpacity onPress={handleOpenURL}>
            <Ionicons name="play" size={24} color={'white'} />
          </TouchableOpacity>
        </View>
      </View>

      <CastSectionList
        title="Top Casts"
        id={movie.id}
        type={movie.title == null ? 'tv' : 'movie'}
      />
      <RecommendationsList
        type={movie.title ? 'movie' : 'tv'}
        movieId={movie.id}
      />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageContainer: {
    width: '100%',
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  backdropImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    resizeMode: 'cover',
  },
  image: {
    height: 'auto',
    borderRadius: 10,
    minHeight: 170,
  },
  topButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
    marginTop: Platform.OS === 'android' ? 20 : 0,
  },
  circleButton: {
    height: 40,
    width: 40,
    backgroundColor: 'black',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
