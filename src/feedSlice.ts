import { createSlice } from '@reduxjs/toolkit'
import { getMovies } from './Api';
import { Movie } from './Model';
import type { AnyAction, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

export interface FeedState {
    isLoading: boolean;
    data: Movie[];
}

const initialState = {
  isLoading: true,
  data: []
}

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    onLoaded: (state, action: PayloadAction<never[]>) => {
        state.data = action.payload;
        state.isLoading = false;
    },
   },
})

export const { onLoaded } = feedSlice.actions
export const getData = (state: RootState) => state.feed.data
export const getIsLoading = (state: RootState) => state.feed.isLoading

export const onAppear = () => (dispatch: any) => {
    getMovies().then((results) => {
        dispatch(onLoaded(results));
    });
}

export default feedSlice.reducer