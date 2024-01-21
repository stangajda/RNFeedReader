export type Movie = {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
  vote_count: number;
};

export type Movies = {
  results: Movie[];
  page: number;
};
