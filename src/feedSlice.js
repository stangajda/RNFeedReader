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
    onAppear: (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
       
    },
    onLoaded: (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
    },
},
})


export const { onAppear } = feedSlice.actions


export const getFeed = () => (dispatch) => {
    getMovies().then((results) => {
        dispatch(onAppear(results));
    });
}

export default feedSlice.reducer