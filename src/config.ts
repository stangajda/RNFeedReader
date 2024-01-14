const API_BASE_URL: string = 'https://api.themoviedb.org';
const API_TRENDING_PATH: string = '/3/trending/movie/day';
const API_KEY: string = 'babcada8d42a5fd4857231c42240debd';

const API_IMAGE_BASE_URL: string = 'https://image.tmdb.org/t/p/';
const API_IMAGE_SIZE: string = 'w200';

const createUrl = (
  base: string,
  path: string,
  params: Record<string, string>,
): URL => {
  const url = new URL(`${base}${path}`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value),
  );
  return url;
};

interface MovieApiConfig {
  baseUrl: string;
  trendingUrl: () => string;
  movieImageUrl: () => string;
}

const movieListUrl: URL = createUrl(API_BASE_URL, API_TRENDING_PATH, {
  api_key: API_KEY,
});

const pathMovieListUrl = movieListUrl
  .toString()
  .replace(API_BASE_URL, '')
  .replace(/(?:\/+(\?))/, '$1')
  .replace(/\/+$/, '');

const movieImageUrl: URL = createUrl(API_IMAGE_BASE_URL, API_IMAGE_SIZE, {});

export const MOVIE_API_CONFIG: MovieApiConfig = {
  baseUrl: API_BASE_URL,
  trendingUrl: () => {
    return pathMovieListUrl;
  },
  movieImageUrl: () => movieImageUrl.toString(),
};
