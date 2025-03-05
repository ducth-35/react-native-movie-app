import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  MovieSectionList,
  MovieSectionType,
} from '../../components/movieSectionList';
import {scale} from 'react-native-size-matters';

export const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingTop: scale(40)}}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
