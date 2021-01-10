import {MovieDto} from './movieDto';
import {SeriesDto} from './seriesDto';
import {AnimeDto} from './animeDto';

export class Media {
  id: string;
  title: string;
  description: string;
  imgUrl: string;
  mediaScore: number;
  type: string;

  public static createFromAnime(source: AnimeDto): Media {
    const medium = new Media();
    medium.type = 'Anime';
    medium.title = source.title;
    medium.description = source.synopsis;
    medium.imgUrl = source.image_url;
    medium.mediaScore = 0;
    return medium;
  }

  public static createFromMovie(source: MovieDto): Media {
    const medium = new Media();
    medium.type = 'Movie';
    medium.title = source.Title;
    medium.description = source.Plot;
    medium.imgUrl = source.Poster;
    medium.mediaScore = 0;
    return medium;
  }
  public static createFromSeries(source: SeriesDto): Media {
    const medium = new Media();
    medium.type = 'Series';
    medium.title = source.Title;
    medium.description = source.Plot;
    medium.imgUrl = source.Poster;
    medium.mediaScore = 0;
    return medium;
  }
}
