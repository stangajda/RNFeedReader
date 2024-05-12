export interface MovieApiConfig {
  baseUrl: string;
  trendingUrl: () => string;
  movieImageUrl: () => string;
}
