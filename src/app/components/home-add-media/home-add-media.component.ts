import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { MovieSeriesInfoService } from '../../services/movie-series-info.service';
import { AnimeInfoService } from '../../services/anime-info.service';
import { MediaService } from '../../services/media.service';
import {Media} from '../../models/media.model';

@Component({
  selector: 'app-home-add-media',
  templateUrl: './home-add-media.component.html',
  styleUrls: ['./home-add-media.component.css']
})
export class HomeAddMediaComponent implements OnInit {
  searchNewForm: FormGroup;
  mediaFound = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private animeInfo: AnimeInfoService,
    private seriesMovieService: MovieSeriesInfoService,
    private mediaService: MediaService
  ) {
    this.searchNewForm = this.fb.group({
      search: [''],
      type: ['']
    });
  }

  ngOnInit(): void {
  }

  findMedia(): any {
    const val = this.searchNewForm.value;
    if (val.type === 'Anime'){
      this.animeInfo.getAnimeInfo(val.search).subscribe(
        res => {this.mediaFound = res.body.results; console.log(this.mediaFound); },
        error => {}
      );
    }
    else if (val.type === 'Series'){
      this.seriesMovieService.searchSeries(val.search).subscribe(
        res => {this.mediaFound = res.body.Search; console.log(res); },
        error => {console.log(error); }
      );
    }
    else if (val.type === 'Movie'){
      this.seriesMovieService.searchMovies(val.search).subscribe(
        res => {this.mediaFound = res.body.Search; console.log(res); },
        error => {console.log(error); }
      );
    }
  }

  convertSearchToMedia(result): Media {
    const medium = new Media();
    if (result.Type === 'movie'){
      this.seriesMovieService.getMovieInfo(result.imdbID).subscribe(movieRes => console.log(movieRes));
    }
    else if (result.Type === 'series'){
      this.seriesMovieService.getSeriesInfo(result.imdbID).subscribe(seriesRes => console.log(seriesRes));
    }

    medium.title = result.title || result.Title;
    medium.description = result.this.mediaFound.push();
  }

  addToDatabase(result): void {
    const medium = this.convertSearchToMedia(result);
  }

}
