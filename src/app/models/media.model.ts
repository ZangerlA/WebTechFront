import {MovieDto} from './movieDto';
import {SeriesDto} from './seriesDto';
import {AnimeDto} from './animeDto';

export class Media {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  mediaScore: number;
  mediaType: string;
  genres: string;
  actors: string;
  premiered: string;

  public static createFromAnime(source: AnimeDto): Media {
    // tslint:disable-next-line
    let genres = '';
    // tslint:disable-next-line
    for (let genre of source.genres) {
      genres += genre.name + ', ';
    }

    const medium = new Media();
    medium.mediaType = 'Anime';
    medium.title = source.title;
    medium.description = source.synopsis;
    medium.imageUrl = source.image_url;
    medium.mediaScore = 0;
    medium.genres = genres;
    medium.actors = '--';
    medium.premiered = source.premiered;
    return medium;
  }

  public static createFromMovie(source: MovieDto): Media {
    const medium = new Media();
    medium.mediaType = 'Movie';
    medium.title = source.Title;
    medium.description = source.Plot;
    medium.imageUrl = source.Poster;
    medium.mediaScore = 0;
    medium.genres = source.Genre;
    medium.actors = source.Actors;
    medium.premiered = source.Released;
    return medium;
  }
  public static createFromSeries(source: SeriesDto): Media {
    const medium = new Media();
    medium.mediaType = 'Series';
    medium.title = source.Title;
    medium.description = source.Plot;
    medium.imageUrl = source.Poster;
    medium.mediaScore = 0;
    medium.genres = source.Genre;
    medium.actors = source.Actors;
    medium.premiered = source.Released;
    return medium;
  }
}
