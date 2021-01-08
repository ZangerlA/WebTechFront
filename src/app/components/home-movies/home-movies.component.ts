import { Component, OnInit } from '@angular/core';
import {Media} from '../../models/media.model';

@Component({
  selector: 'app-home-movies',
  templateUrl: './home-movies.component.html',
  styleUrls: ['./home-movies.component.css']
})
export class HomeMoviesComponent implements OnInit {
  movies: Media[] = [];
  constructor() { }

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
}
