import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getMovies } from './Api';
import { Movie } from './Model';
import type { RootState, AppDispatch } from './store'

export interface FeedState {
    isLoading: boolean;
    data: Movie[];
}

const initialState: FeedState = {
  isLoading: true,
  data: []
}

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    onLoaded: (state, action: PayloadAction<Movie[]>) => {
        state.data = action.payload;
        state.isLoading = false;
    },
   },
})

export const { onLoaded } = feedSlice.actions
export const getMovieList = (state: RootState): Movie[] => state.feed.data
export const getIsLoading = (state: RootState): boolean => state.feed.isLoading

export const onAppear = () => (dispatch: AppDispatch) => {
    getMovies().then((results) => {
        dispatch(onLoaded(results));
    });
}

export default feedSlice.reducer