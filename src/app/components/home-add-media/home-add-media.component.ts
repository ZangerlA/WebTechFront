import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { MovieSeriesInfoService } from '../../services/movie-series-info.service';
import { AnimeInfoService } from '../../services/anime-info.service';
import {Media} from '../../models/media.model';

@Component({
  selector: 'app-home-add-media',
  templateUrl: './home-add-media.component.html',
  styleUrls: ['./home-add-media.component.css']
})
export class HomeAddMediaComponent implements OnInit {
  searchNewForm: FormGroup;
  searchResult: Media[];

  constructor(private router: Router, private fb: FormBuilder, private animeInfo: AnimeInfoService, private seriesMovieService: MovieSeriesInfoService) {
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
        res => {this.searchResult = res.body.results; console.log(this.searchResult); },
        error => {}
      );
    }
    else if (val.type === 'Series'){
      this.seriesMovieService.searchSeries(val.search).subscribe(
        res => {this.searchResult = res.body.Search; console.log(res); },
        error => {console.log(error); }
      );
    }
    else if (val.type === 'Movie'){
      this.seriesMovieService.searchMovies(val.search).subscribe(
        res => {this.searchResult = res.body.Search; console.log(res); },
        error => {console.log(error); }
      );
    }
  }

  fillContent(): void {

  }

}
