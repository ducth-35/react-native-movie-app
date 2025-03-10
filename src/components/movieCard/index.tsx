import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import ImageViewWithProgess from '../imageWithProgress';
import TextApp from '../textApp';

type MovieCardProps = {
  movie: Movie;
  onPress: () => void;
  style?: ViewStyle;
};

export const MovieCard = ({movie, onPress, style}: MovieCardProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.container, style]}>
        <ImageViewWithProgess
          imageUri={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
          progress={movie?.vote_average}
        />
        <TextApp preset="txt16SemiBold" numberOfLines={1} style={styles.title}>
          {movie?.title ?? movie?.name}
        </TextApp>
        {(movie?.release_date || movie?.first_air_date) && (
          <TextApp style={styles.date}>
            {movie?.release_date ?? movie?.first_air_date}
          </TextApp>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    width: 170,
    gap: 5,
  },
  title: {
    marginTop: 5,
  },
  date: {
    color: 'grey',
  },
});
