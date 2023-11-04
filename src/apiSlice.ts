import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: 'https://api.themoviedb.org/3/'}),
  tagTypes: ['Movie'],
  endpoints: builder => ({
    getMovies: builder.query({
      query: () =>
        'trending/movie/day?api_key=babcada8d42a5fd4857231c42240debd',
      providesTags: ['Movie'],
    }),
  }),
});

export const {useGetMoviesQuery} = apiSlice;
