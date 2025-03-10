import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {fetchCasts} from '../../apis/api';
import {CastSkeleton} from '../castSkeleton';
import TextApp from '../textApp';

type CastSectionListProps = {
  title: string;
  id: number;
  type: string;
};
const CastSectionList = ({title, id, type}: CastSectionListProps) => {
  const {
    isPending: loading,
    error,
    data: casts,
  } = useQuery({
    queryKey: ['fetchCasts', id],
    queryFn: () => fetchCasts(type, id),
  });

  if (error) {
    return <TextApp>An Error occur</TextApp>;
  }
  return (
    <View style={styles.container}>
      {(loading || casts.length > 0) && (
        <TextApp preset="txt18Bold" style={styles.title}>
          {title}
        </TextApp>
      )}
      {loading ? (
        <CastSkeleton />
      ) : (
        <FlatList
          renderItem={({item}) => <Item item={item} />}
          data={casts}
          keyExtractor={item => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 10}}
          ItemSeparatorComponent={ItemSeparator}
        />
      )}
    </View>
  );
};

const ItemSeparator = () => (
  <View style={{width: 15, backgroundColor: 'transparent'}} />
);

type ItemProps = {item: Cast};
const Item = ({item}: ItemProps) => {
  return (
    <View style={styles.itemContainer}>
      <Image
        style={styles.image}
        source={{
          uri: `https://image.tmdb.org/t/p/w500/${item.profile_path}`,
        }}
      />
      <TextApp
        preset="txt14SemiBold"
        numberOfLines={1}
        style={styles.itemTitle}>
        {item.name}
      </TextApp>
      <TextApp numberOfLines={2} style={styles.itemDate}>
        {item.character}
      </TextApp>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 120,
    width: 120,
    resizeMode: 'cover',
    borderRadius: 100,
  },
  title: {
    margin: 10,
  },
  itemContainer: {
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 120,
  },
  itemTitle: {
    marginTop: 5,
  },
  itemDate: {
    color: 'grey',
  },
});

export default CastSectionList;
