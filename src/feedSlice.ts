import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getMovies } from './api';
import { Movie } from './model';
import type { RootState } from './store'

export interface FeedState {
    isLoading: boolean;
    data: Movie[];
}

const initialState: FeedState = {
  isLoading: true,
  data: []
}

export const fetchMovies = createAsyncThunk('posts/fetchMovies', async () => {
  const response = await getMovies()
  return response
})

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.isLoading = false
      })
  }
})


export const getMovieList = (state: RootState): Movie[] => state.feed.data
export const getIsLoading = (state: RootState): boolean => state.feed.isLoading

export default feedSlice.reducer