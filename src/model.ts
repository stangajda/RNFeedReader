export type Movie = {
  id: string;
  poster_path: string;
  title: string;
  vote_average: number;
  vote_count: number;
};

export enum Status {
  Idle = "Idle",
  Loading = "Loading",
  Succeeded = "Succeeded",
  Failed = "Failed",
}

export type Movies = {
  results: Movie[];
  page: number;
}