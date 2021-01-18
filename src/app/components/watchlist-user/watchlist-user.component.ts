import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { WatchlistService } from '../../services/watchlist.service';
import { MediaService } from '../../services/media.service';
import {Media} from "../../models/media.model";
import {MediaSinglePopupComponent} from "../media-single-popup/media-single-popup.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-watchlist-user',
  templateUrl: './watchlist-user.component.html',
  styleUrls: ['./watchlist-user.component.css']
})
export class WatchlistUserComponent implements OnInit {
  wantToWatchListMedia: Media[] = [];
  watchedListMedia: Media[] = [];

  constructor(public watchListService: WatchlistService, public mediaService: MediaService, public popup: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getWatchlist();
  }
  getWatchlist(): void{
    this.watchListService.getWantToWatchListUser().subscribe(res => this.getMediasFromWatchlistAndAddToWantToWatch(res.body));
    this.watchListService.getWatchedListUser().subscribe(res => this.getMediasFromWatchlistAndAddToWatched(res.body));
  }
  getMediasFromWatchlistAndAddToWatched(idArray: string[]): void{
    for (let id of idArray){
      this.mediaService.getMedia(id, undefined).subscribe(res => this.watchedListMedia.push(res.body));
      console.log(this.wantToWatchListMedia);
    }
  }

  getMediasFromWatchlistAndAddToWantToWatch(idArray: string[]): void{
    for (let id of idArray){
      this.mediaService.getMedia(id, undefined).subscribe(res => this.wantToWatchListMedia.push(res.body));
      console.log(this.wantToWatchListMedia);
    }
  }
  openPopup(media: Media): void{
    this.popup.open(MediaSinglePopupComponent, { data: media });
  }
  removeFromWatchlist(MediaId: string): void{
    this.wantToWatchListMedia = this.wantToWatchListMedia.filter((media) => media.id !== MediaId);
    this.watchListService.removeElementFromWantToWatchlist(MediaId).subscribe(res => console.log(res));
    this.snackBar.open('Success!', 'dismiss', {
      duration: 2000, panelClass: ['mat-toolbar', 'mat-primary', 'custom-dialog-container']
    });
  }
}
