export type Movie = {
  id: string;
  poster_path: string;
  title: string;
  vote_average: number;
  vote_count: number;
};

export enum LoadableStatus {
  Start = "Start",
  Loading = "Loading",
  Loaded = "Loaded",
  FailedLoaded = "FailedLoaded",
}