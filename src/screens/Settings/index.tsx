import React from 'react';
import {Linking, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextApp from '../../components/textApp';

export const SettingsScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TextApp preset="txt18Bold" style={styles.heading}>
        About the App
      </TextApp>
      <TextApp preset="txt16Medium" style={styles.text}>
        App Name: A simple and clean movie browsing app.
      </TextApp>
      <TextApp preset="txt16Medium" style={styles.text}>
        Purpose: To display movie lists such as Trending Today, Popular Movies,
        and more using data from The Movie Database (TMDb).
      </TextApp>
      <TextApp preset="txt18Bold" style={styles.heading}>
        Data Source
      </TextApp>
      <TextApp
        preset="txt16Medium"
        style={styles.link}
        onPress={() => Linking.openURL('https://www.themoviedb.org/')}>
        https://www.themoviedb.org/
      </TextApp>
      <TextApp style={styles.note}>
        “This product uses the TMDb API but is not endorsed or certified by
        TMDb.”
      </TextApp>
      <TextApp preset="txt18Bold" style={styles.heading}>
        Privacy Policy
      </TextApp>
      <TextApp preset="txt16Medium" style={styles.text}>
        We do not collect any personal data from users. All data is fetched only
        for displaying movie information.
      </TextApp>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },

  heading: {
    marginTop: 20,
  },
  text: {
    marginTop: 8,
    lineHeight: 22,
  },
  note: {
    marginTop: 4,
    color: '#666',
  },
  link: {
    marginTop: 6,
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
});
