export type Movie = {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
  vote_count: number;
  active: boolean;
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