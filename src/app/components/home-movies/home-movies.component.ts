import { Component, OnInit } from '@angular/core';
import {Media} from '../../models/media.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {MediaService} from '../../services/media.service';


@Component({
  selector: 'app-home-movies',
  templateUrl: './home-movies.component.html',
  styleUrls: ['./home-movies.component.css']
})
export class HomeMoviesComponent implements OnInit {
  movies: Media[] = [];
  searchForm: FormGroup;

  constructor(public fb: FormBuilder, private router: Router, private mediaService: MediaService) {
    this.searchForm = this.fb.group({
      search: ['']
    });
  }

  ngOnInit(): void {
    this.fillContent();
  }

  fillContent(): void {
    this.mediaService.getMedia(undefined, 'Movie').subscribe(
      res => {this.movies = res.body; console.log(res.body); },
      error => {}
    );
  }

  goToAddMedia(): void {
    this.router.navigate(['newMedia']);
  }

}
