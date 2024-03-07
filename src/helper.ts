import {
  API_BASE_URL,
  API_TRENDING_PATH,
  API_KEY,
  API_IMAGE_BASE_URL,
  API_IMAGE_SIZE,
} from './config';
import {MovieApiConfig} from './interfaces';

const createUrl = (
  base: string,
  path: string,
  params: Record<string, string>,
): string => {
  const url = new URL(`${base}${path}`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value),
  );
  return url.toString();
};

const createPathUrl = (
  movieListUrlLocal: string,
  apiBaseUrl: string,
): string => {
  return movieListUrlLocal
    .replace(apiBaseUrl, '')
    .replace(/(?:\/+(\?))/, '$1')
    .replace(/\/+$/, '');
};

const movieListUrl: string = createUrl(API_BASE_URL, API_TRENDING_PATH, {
  api_key: API_KEY,
});

const moviePathUrl: string = createPathUrl(movieListUrl, API_BASE_URL);
const movieImageUrl: string = createUrl(API_IMAGE_BASE_URL, API_IMAGE_SIZE, {});

export const movieApiPaths: MovieApiConfig = {
  baseUrl: API_BASE_URL,
  trendingUrl: () => {
    return moviePathUrl;
  },
  movieImageUrl: () => movieImageUrl,
};
