import {FetchBaseQueryError} from '@reduxjs/toolkit/query';
import {SerializedError} from '@reduxjs/toolkit';
import {Movies} from './Model';

interface IError {
  error: Error;
}

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

export interface IMoviesResponse {
  data?: Movies;
  error?: IError;
  status: number;
}

export interface IContainer {
  useGetMoviesQueryContainer: IMoviesQueryResult;
}
