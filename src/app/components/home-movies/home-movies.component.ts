import { Component, OnInit } from '@angular/core';
import {Media} from '../../models/media.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-movies',
  templateUrl: './home-movies.component.html',
  styleUrls: ['./home-movies.component.css']
})
export class HomeMoviesComponent implements OnInit {
  movies: Media[] = [];
  searchForm: FormGroup;

  constructor(public fb: FormBuilder, private router: Router) {
    this.searchForm = this.fb.group({
      search: ['']
    });
  }

  ngOnInit(): void {
    this.fillContent();
  }

  fillContent(): void {
    const movie = new Media();
    movie.id = '1';
    movie.description = 'Lorem';
    movie.imgUrl = '../../../assets/images/Others/Overlord.jpg';
    movie.title = 'Overlord';
    movie.points = 10;
    this.movies.push(movie);
    const movie2 = new Media();
    movie2.id = '2';
    movie2.description = 'Lorem Ipsumard';
    movie2.imgUrl = '../../../assets/images/Others/Overlord.jpg';
    movie2.title = 'Star wars';
    movie2.points = 3;
    this.movies.push(movie2);
  }

  goToAddMedia(): void {
    this.router.navigate(['newMedia']);
  }

}
