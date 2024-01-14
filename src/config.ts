import 'react-native-url-polyfill/auto';

const API_BASE_URL: string = 'https://api.themoviedb.org';
const API_TRENDING_PATH: string = '/3/trending/movie/day';
const API_KEY: string = 'babcada8d42a5fd4857231c42240debd';

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
}

const movieListUrl: URL = createUrl(API_BASE_URL, API_TRENDING_PATH, {
  api_key: API_KEY,
});

export const MOVIE_API_CONFIG: MovieApiConfig = {
  baseUrl: API_BASE_URL,
  trendingUrl: () => {
    const movieList = movieListUrl.pathname.toString();
    const searchParams = movieListUrl.searchParams.toString();
    return `${movieList}?${searchParams}`;
  },
};
