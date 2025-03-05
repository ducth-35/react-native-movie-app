import React from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View, ViewStyle} from 'react-native';
import ImageViewWithProgess from '../imageWithProgress';

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
          imageUri={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          progress={movie.vote_average}
        />
        <Text numberOfLines={1} style={styles.title}>
          {movie.title ?? movie.name}
        </Text>
        {(movie.release_date || movie.first_air_date) && (
          <Text style={styles.date}>
            {movie.release_date ?? movie.first_air_date}
          </Text>
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
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
    marginTop: 5,
  },
  date: {
    fontSize: 14,
    fontWeight: '400',
    color: 'grey',
  },
});
