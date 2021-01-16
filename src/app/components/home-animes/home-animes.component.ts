import { Component, OnInit } from '@angular/core';
import {Media} from '../../models/media.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {MediaService} from '../../services/media.service';
import {MatDialog} from '@angular/material/dialog';
import {MediaSinglePopupComponent} from '../media-single-popup/media-single-popup.component';

@Component({
  selector: 'app-home-animes',
  templateUrl: './home-animes.component.html',
  styleUrls: ['./home-animes.component.css']
})
export class HomeAnimesComponent implements OnInit {

  animes: Media[] = [];
  searchForm: FormGroup;

  constructor(public fb: FormBuilder, private router: Router, private mediaService: MediaService, public popup: MatDialog) {
    this.searchForm = this.fb.group({
      search: ['']
    });
  }

  ngOnInit(): void {
    this.fillContent();
  }

  fillContent(): void {
    this.mediaService.getMedia(undefined, 'Anime').subscribe(
      res => {this.animes = res.body; },
      error => {}
    );
  }

  goToAddMedia(): void {
    this.router.navigate(['newMedia']);
  }

  openPopup(media: Media): void{
    this.popup.open(MediaSinglePopupComponent, { data: media });
  }

}
