import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getMovies } from './api';
import { Movie, LoadableStatus } from './model';
import type { RootState } from './store'

export interface FeedState {
    loadableStatus: LoadableStatus;
    movieList: Movie[];
}

const initialState: FeedState = {
  loadableStatus: LoadableStatus.Start,
  movieList: []
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
        state.loadableStatus = LoadableStatus.Loading
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loadableStatus = LoadableStatus.Loaded
        state.movieList = action.payload
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.loadableStatus = LoadableStatus.FailedLoaded
      })
  }
})


export const getMovieList = (state: RootState): Movie[] => state.feed.movieList
export const getLoadableStatus = (state: RootState): LoadableStatus => state.feed.loadableStatus

export default feedSlice.reducer