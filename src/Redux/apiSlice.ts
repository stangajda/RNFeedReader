import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {movieApiPaths} from '../helper';
import {Movies} from '../model';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: movieApiPaths.baseUrl}),
  tagTypes: ['Movie'],
  endpoints: builder => ({
    getMovies: builder.query<Movies, object>({
      query: () => movieApiPaths.trendingUrl(),
      providesTags: ['Movie'],
    }),
  }),
});

export const {useGetMoviesQuery} = apiSlice;
