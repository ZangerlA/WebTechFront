import { Component, OnInit } from '@angular/core';
import {Media} from '../../models/media.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {MediaService} from '../../services/media.service';
import {MatDialog} from '@angular/material/dialog';
import {MediaSinglePopupComponent} from '../media-single-popup/media-single-popup.component';
import {WatchlistService} from '../../services/watchlist.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-home-animes',
  templateUrl: './home-animes.component.html',
  styleUrls: ['./home-animes.component.css']
})
export class HomeAnimesComponent implements OnInit {

  animes: Media[] = [];
  searchForm: FormGroup;
  found: Media[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private mediaService: MediaService,
    private popup: MatDialog,
    private watchlistService: WatchlistService,
    private snackBar: MatSnackBar)
    {
    this.searchForm = this.fb.group({
      search: ['']
    });
  }

  ngOnInit(): void {
    this.fillContent();
  }

  fillContent(): void {
    this.mediaService.getMedia(undefined, 'Anime').subscribe(
      res => {this.animes = res.body; this.found = res.body},
      error => {}
    );
  }

  goToAddMedia(): void {
    this.router.navigate(['newMedia']);
  }

  openPopup(media: Media): void{
    this.popup.open(MediaSinglePopupComponent, { data: media });
  }

  addToWatchlist(MediaId: string): void{
    this.watchlistService.addElementWantToWatchlist(MediaId).subscribe(res => console.log(res));
    this.snackBar.open('Success!', 'dismiss', {
      duration: 2000, panelClass: ['mat-toolbar', 'mat-primary', 'custom-dialog-container']
    });
  }

  foundMedia(MediaName: string): void{
    this.found = this.animes.filter(media => media.title.toLowerCase().includes(MediaName.search.toString().toLowerCase()));
  }
}
