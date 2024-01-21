// import { SerializedError } from '@reduxjs/toolkit';
// import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
// import { Movies } from './Model';
import {useGetMoviesQuery} from './apiSlice';
import {IMoviesQueryResult} from './interfaces';

// function useGetMoviesQueryContainer(): IMoviesQueryResult {
//   const mockQueryResult: IMoviesQueryResult = {
//     isLoading: false,
//     isSuccess: true,
//     isError: false,
//     data: {
//       results: [
//         {
//           id: 1,
//           poster_path: 'path',
//           title: 'title',
//           vote_average: 1,
//           vote_count: 1,
//         },
//       ],
//       page: 1,
//     },
//   };

//   return mockQueryResult;
// }

interface IContainer {
  useGetMoviesQueryContainer: IMoviesQueryResult;
}

function useContainer(): IContainer {
  return {
    useGetMoviesQueryContainer: useGetMoviesQuery({}),
  };
}

export default useContainer;
