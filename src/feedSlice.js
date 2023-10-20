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
    onAppear: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    onLoaded: (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
    },
  },
})

// Action creators are generated for each case reducer function
export const { onAppear } = feedSlice.actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
const getFeed = (results) => (dispatch) => {
    getMovies().then((results) => {
    //   setData(results);
    //   setLoading(false);
        //dispatch(onAppear());
        dispatch(onLoaded(results));
    });
}
  
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = (state) => state.counter.value

export default feedSlice.reducer