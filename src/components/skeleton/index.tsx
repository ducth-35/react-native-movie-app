import React from 'react';
import {ListRenderItem, StyleSheet} from 'react-native';
import {FlatList} from 'react-native';
import {View} from 'react-native';
import {scale} from 'react-native-size-matters';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import {LinearGradient} from 'react-native-linear-gradient';

const DATA_SKELETON = Array.from({length: 10}, (_, index) => index + 1);

export const SkeletonLoading = () => {
  const ItemSeparator = () => (
    <View style={{width: 15, backgroundColor: 'transparent'}} />
  );
  const renderItem: ListRenderItem<number> = ({item}) => {
    return (
      <View style={styles.container}>
        <View style={{marginBottom: 25}}>
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={styles.shimmerImage}
          />
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={styles.progressShimmerItem}
          />
        </View>
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          style={styles.titleShimmerItem}
        />
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          style={styles.dateShimmerItem}
        />
      </View>
    );
  };
  return (
    <FlatList
      data={DATA_SKELETON}
      keyExtractor={item => item.toString()}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingHorizontal: 10}}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    width: scale(170),
    gap: scale(5),
  },
  shimmerImage: {
    height: scale(250),
    width: scale(170),
    borderRadius: scale(25),
  },
  progressShimmerItem: {
    position: 'absolute',
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    bottom: -scale(25),
    left: scale(10),
  },
  titleShimmerItem: {
    height: scale(15),
    borderRadius: scale(5),
    width: scale(170),
  },
  dateShimmerItem: {
    height: scale(15),
    width: scale(80),
    borderRadius: scale(5),
  },
});
