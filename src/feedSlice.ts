// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { getMovies } from './api';
// import { Movie, Status } from './model';
// import type { RootState } from './store'

// export interface FeedState {
//     loadableStatus: Status;
//     movieList: Movie[];
// }

// const initialState: FeedState = {
//   loadableStatus: Status.Idle,
//   movieList: []
// }

// // export const fetchMovies = createAsyncThunk('posts/fetchMovies', async () => {
// //   const response = await getMovies()
// //   return response
// // })

// export const feedSlice = createSlice({
//   name: 'feed',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // .addCase(fetchMovies.pending, (state) => {
//       //   state.loadableStatus = Status.Loading
//       // })
//       // .addCase(fetchMovies.fulfilled, (state, action) => {
//       //   state.loadableStatus = Status.Succeeded
//       //   state.movieList = action.payload
//       // })
//       // .addCase(fetchMovies.rejected, (state) => {
//       //   state.loadableStatus = Status.Failed
//       // })
//   }
// })


// export const getMovieList = (state: RootState): Movie[] => state.feed.movieList
// export const getLoadableStatus = (state: RootState): Status => state.feed.loadableStatus

// export default feedSlice.reducer