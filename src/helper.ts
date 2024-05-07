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

const cleanPath = (path: string): string => {
  return path
    .split('/')
    .filter(segment => segment.trim() !== '')
    .join('/');
};

const cleanQueryParams = (
  queryParams: string | undefined,
): string | undefined => {
  return queryParams?.split('/').join('');
};

const createPathUrl = (movieListUrl: string, apiBaseUrl: string): string => {
  if (!movieListUrl.startsWith(apiBaseUrl)) {
    throw new Error('Invalid movie list URL');
  }

  const pathUrl = movieListUrl.substring(apiBaseUrl.length);
  const [path, queryParams] = pathUrl.split('?');

  const cleanedPath = cleanPath(path);
  const cleanedQueryParams = cleanQueryParams(queryParams);

  return cleanedQueryParams
    ? `${cleanedPath}?${cleanedQueryParams}`
    : cleanedPath;
};

const movieListUrl: string = createUrl(API_BASE_URL, API_TRENDING_PATH, {
  api_key: API_KEY,
});

const moviePathUrl: string = createPathUrl(movieListUrl, API_BASE_URL);
const movieImageUrl: string = createUrl(API_IMAGE_BASE_URL, API_IMAGE_SIZE, {});

export const movieApiPaths: MovieApiConfig = {
  baseUrl: API_BASE_URL,
  trendingUrl: () => moviePathUrl,
  movieImageUrl: () => movieImageUrl,
};
