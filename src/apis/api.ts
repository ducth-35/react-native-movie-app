import Api from '.';
import {shuffle} from '../utils';

const API_KEY = process.env.API_KEY;

export const fetchMoviesWithType = async (
  page: number = 1,
  type: string,
): Promise<MovieResponse> => {
  try {
    const response = await Api.get(
      `/movie/${type}?api_key=${API_KEY}&page=${page}`,
    );

    if (!response.data) {
      throw new Error('An error occurred while fetching movies');
    }

    response.data.results = shuffle(response.data.results);
    return response.data as MovieResponse;
  } catch (error) {
    throw new Error('An error occurred, Try again');
  }
};

export const fetchDataWithPath = async (
  path: string,
  page = 1,
): Promise<MovieResponse> => {
  try {
    const response = await Api.get(
      `/${path}?api_key=${API_KEY}&page=${page}&region=VN&language=vi-VN`,
    );

    if (!response.data) {
      throw new Error('An error occurred while fetching movies');
    }

    response.data.results = shuffle(response.data.results);
    return response.data as MovieResponse;
  } catch (error) {
    throw new Error('An error occurred, Try again');
  }
};

export const fetchCasts = async (type: string, id: number): Promise<Cast[]> => {
  try {
    const response = await Api.get(`/${type}/${id}/credits?api_key=${API_KEY}`);

    if (!response.data) {
      return [];
    }

    response.data.cast = shuffle(response.data.cast);
    return response.data.cast as Cast[];
  } catch (error) {
    return [];
  }
};

export const fetchSimilarMoviesorTv = async (
  type: string,
  movieId: number,
): Promise<Movie[]> => {
  try {
    const response = await Api.get(
      `/${type}/${movieId}/similar?api_key=${API_KEY}`,
    );

    if (!response.data) {
      return [];
    }

    response.data.results = shuffle(response.data.results);
    return response.data.results as Movie[];
  } catch (error) {
    return [];
  }
};

export const fetchTVWithType = async (
  page: number = 1,
  type: string,
): Promise<MovieResponse> => {
  try {
    const response = await Api.get(
      `/tv/${type}?api_key=${API_KEY}&page=${page}`,
    );

    if (!response.data) {
      throw new Error('An error occurred while fetching movies');
    }

    response.data.results = shuffle(response.data.results);

    return response?.data;
  } catch (error) {
    throw new Error('An error occurred, Try again');
  }
};
