export interface Movie {
  title: string;
  poster_path: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  id: number;
  adult: boolean;
  backdrop_path: string;
  original_language: string;
  original_title: string;
  genre_ids: number[];
  vote_average: number;
  overview: string;
  release_date: string;
}

export interface Genre {
  id: number;
  name: string;
}
