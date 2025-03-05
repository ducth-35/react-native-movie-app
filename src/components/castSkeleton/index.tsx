import {FlatList, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import {scale} from 'react-native-size-matters';

const Data = Array.from({length: 10}, (_, index) => index + 1);

export const CastSkeleton = () => {
  const ItemSeparator = () => (
    <View style={{width: scale(15), backgroundColor: 'transparent'}} />
  );

  const Item = () => {
    return (
      <View style={styles.container}>
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          style={styles.itemShimmerImage}
        />
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          style={styles.itemShimmerTitle}
        />
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          style={styles.itemShimmerSubtitle}
        />
      </View>
    );
  };

  return (
    <FlatList
      renderItem={_ => <Item />}
      data={Data}
      keyExtractor={item => item.toString()}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingHorizontal: scale(10)}}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    gap: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemShimmerImage: {
    width: scale(120),
    height: scale(120),
    borderRadius: scale(100),
  },
  itemShimmerTitle: {
    height: scale(10),
    width: scale(100),
    borderRadius: scale(30),
  },
  itemShimmerSubtitle: {
    height: scale(10),
    width: scale(100),
    borderRadius: scale(30),
  },
});
