import {createUrl, createPathUrl} from './helper';
import {MovieApiConfig} from './interfaces';

const API_BASE_URL: string = 'https://api.themoviedb.org';
const API_TRENDING_PATH: string = '/3/trending/movie/day';
const API_KEY: string = 'babcada8d42a5fd4857231c42240debd';

const API_IMAGE_BASE_URL: string = 'https://image.tmdb.org/t/p/';
const API_IMAGE_SIZE: string = 'w200';

const movieListUrl: string = createUrl(API_BASE_URL, API_TRENDING_PATH, {
  api_key: API_KEY,
});

const moviePathUrl: string = createPathUrl(movieListUrl, API_BASE_URL);

const movieImageUrl: string = createUrl(API_IMAGE_BASE_URL, API_IMAGE_SIZE, {});

export const MOVIE_API_CONFIG: MovieApiConfig = {
  baseUrl: API_BASE_URL,
  trendingUrl: () => {
    return moviePathUrl;
  },
  movieImageUrl: () => movieImageUrl,
};
