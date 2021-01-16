export interface AnimeResponse {
  body: AnimeDto;
}

export interface AnimeDto {
  title: string;
  synopsis: string;
  image_url: string;
  premiered: string;
  genres: any;
}
