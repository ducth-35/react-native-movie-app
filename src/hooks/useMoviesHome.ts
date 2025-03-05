import {useQuery} from '@tanstack/react-query';
import {fetchDataWithPath} from '../apis/api';

export const useMoviesHome = (path: string) => {
  const {
    isPending: loading,
    error,
    data: movies,
  } = useQuery({
    queryKey: ['fetchMovies', path],
    queryFn: async () => {
      const movieResponse = await fetchDataWithPath(path);
      return movieResponse.results;
    },
  });
  return {loading, error, movies};
};
