import { Component, OnInit } from '@angular/core';
import {Media} from '../../models/media.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {MediaService} from '../../services/media.service';
import {MatDialog} from '@angular/material/dialog';
import {MediaSinglePopupComponent} from '../media-single-popup/media-single-popup.component';

@Component({
  selector: 'app-home-series',
  templateUrl: './home-series.component.html',
  styleUrls: ['./home-series.component.css']
})
export class HomeSeriesComponent implements OnInit {

  series: Media[] = [];
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
    this.mediaService.getMedia(undefined, 'Series').subscribe(
      res => {this.series = res.body; },
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
