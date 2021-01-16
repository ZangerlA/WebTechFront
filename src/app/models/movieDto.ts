export interface MovieRespone {
  body: MovieDto;
}

export interface MovieDto {
  Type: string;
  Title: string;
  Plot: string;
  Poster: string;
  Released: string;
  Actors: string;
  Genre: string;
}
