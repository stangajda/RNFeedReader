import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {movieApiPaths} from '@src/utils/helper';
import {Movies} from '@src/model';
import {API_PROVIDED_TAGS, API_REDUCER_PATH, API_TAG_TYPES} from '@src/config';

export const apiSlice = createApi({
  reducerPath: API_REDUCER_PATH,
  baseQuery: fetchBaseQuery({baseUrl: movieApiPaths.baseUrl}),
  tagTypes: API_TAG_TYPES,
  endpoints: builder => ({
    getMovies: builder.query<Movies, object>({
      query: () => movieApiPaths.trendingUrl(),
      providesTags: API_PROVIDED_TAGS,
    }),
  }),
});

export const {useGetMoviesQuery} = apiSlice;
