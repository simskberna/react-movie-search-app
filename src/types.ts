export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type?: string;
  Poster?: string;
  Genre?: string;
  Plot?: string;
}

export interface Data extends Movie {
  Poster?: string;
}