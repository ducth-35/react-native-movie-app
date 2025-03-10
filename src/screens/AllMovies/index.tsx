import {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useInfiniteQuery} from '@tanstack/react-query';
import {APP_SCREEN, RootStackParamList} from '../../navigators/screen-type';
import {fetchDataWithPath} from '../../apis/api';
import {navigate, setParams} from '../../navigators/navigation-services';
import {MovieCard} from '../../components/movieCard';
import LoadingIndicator from '../../components/loading';
import EmptyContent from '../../components/empty';

type AllMovieScreenProps = NativeStackScreenProps<
  RootStackParamList,
  APP_SCREEN.ALL_MOVIES_SCREEN
>;

export const AllMovieScreen = ({route, navigation}: AllMovieScreenProps) => {
  const {title, type} = route?.params;
  const {width} = useWindowDimensions();

  const {status, data, error, fetchNextPage, isFetchingNextPage} =
    useInfiniteQuery({
      queryKey: ['trending', title, type],
      queryFn: ({pageParam}) => fetchDataWithPath(type, pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) =>
        lastPage.total_pages > pages.length ? pages.length + 1 : undefined,
    });

  const [query, setQuery] = useState<string>('');

  const queryData = useMemo(() => {
    if (status === 'pending' || status === 'error') return [];
    if (query == '') {
      return data.pages.flatMap(moviesResponse => moviesResponse.results);
    } else {
      const movies = data.pages.flatMap(
        moviesResponse => moviesResponse.results,
      );
      return movies.filter(
        movie =>
          movie.name?.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
          movie.title?.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
      );
    }
  }, [query, data]);

  useEffect(() => {
    navigation.setOptions({
      title: title,
      headerLargeTitle: true,
      headerSearchBarOptions: {
        inputType: 'text',
        placeholder: 'Enter your search',
        onChangeText: (event: any) => setQuery(event.nativeEvent.text),
        onSearchButtonPress: (event: any) => setQuery(event.nativeEvent.text),
      },
      headerTransparent: false,
      headerBackTitleVisible: true,
      headerBackTitle: 'Back',
    });
  }, []);

  if (status === 'pending') {
    return <LoadingIndicator />;
  }

  if (status === 'error') {
    return <EmptyContent title={error.message} icon="information-circle" />;
  }

  if (query != '' && queryData.length < 1) {
    return <EmptyContent title={`${query} not found`} icon="search-circle" />;
  }

  const handleMovieDetails = (item: Movie) => {
    navigate(APP_SCREEN.MOVIES_DETAIL_SCREEN, {movie: item});
  };

  const renderItem: ListRenderItem<Movie> = ({item}) => {
    return (
      <MovieCard
        movie={item}
        onPress={handleMovieDetails.bind(null, item)}
        style={{width: (width - 30) / 2}}
      />
    );
  };

  const onEndReached = () => {
    if (query != '') {
      return;
    }
    fetchNextPage();
  };

  return (
    <FlatList
      data={queryData}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      numColumns={2}
      ItemSeparatorComponent={() => (
        <View style={{height: 15, backgroundColor: 'transparent'}} />
      )}
      contentContainerStyle={{paddingHorizontal: 10}}
      columnWrapperStyle={{gap: 10}}
      style={{paddingVertical: 10, backgroundColor: 'white'}}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.3}
      ListFooterComponent={() =>
        isFetchingNextPage ? <ActivityIndicator /> : null
      }
    />
  );
};
