import {FetchBaseQueryError} from '@reduxjs/toolkit/query';
import {SerializedError} from '@reduxjs/toolkit';
import {Movies} from './model';

export interface MovieApiConfig {
  baseUrl: string;
  trendingUrl: () => string;
  movieImageUrl: () => string;
}

export interface IMoviesQueryResult {
  data?: Movies;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error?: FetchBaseQueryError | SerializedError;
}
