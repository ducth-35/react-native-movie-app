import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  MovieSectionList,
  MovieSectionType,
} from '../../components/movieSectionList';
import {scale} from 'react-native-size-matters';
import {SafeAreaView} from 'react-native-safe-area-context';

export const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView
      edges={{bottom: 'off', top: 'additive'}}
      style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MovieSectionList
          title="Trending Today"
          path={MovieSectionType.trending}
        />
        <MovieSectionList
          title="Popular Movies"
          path={MovieSectionType.popularMovies}
        />
        <MovieSectionList
          title="Popular TV"
          path={MovieSectionType.popularTV}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
