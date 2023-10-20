import { createSlice } from '@reduxjs/toolkit'
import { getMovies } from './Api';

const initialState = {
  isLoading: true,
  data: []
}

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
reducers: {
    onLoaded: (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
    },
},
})


export const { onLoaded } = feedSlice.actions


export const onAppear = () => (dispatch) => {
    getMovies().then((results) => {
        dispatch(onLoaded(results));
    });
}

export default feedSlice.reducer