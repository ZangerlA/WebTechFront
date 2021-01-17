import { Component, OnInit } from '@angular/core';
import { WatchlistService } from '../../services/watchlist.service';
import { MediaService } from '../../services/media.service';
import {Media} from "../../models/media.model";
import {MediaSinglePopupComponent} from "../media-single-popup/media-single-popup.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-watchlist-user',
  templateUrl: './watchlist-user.component.html',
  styleUrls: ['./watchlist-user.component.css']
})
export class WatchlistUserComponent implements OnInit {
  watchlistMedia: Media[] = [];

  constructor(public watchListService: WatchlistService, public mediaService: MediaService, public popup: MatDialog) { }

  ngOnInit(): void {
    this.getWatchlist();
  }
  getWatchlist(): void{
    this.watchListService.getWatchlistUser().subscribe(res => this.getMediasFromWatchlist(res.body));
  }
  getMediasFromWatchlist(idArray: string[]):void{
    for (let id of idArray){
      this.mediaService.getMedia(id, undefined).subscribe(res => this.watchlistMedia.push(res.body));
      console.log(this.watchlistMedia)
    }
  }
  openPopup(media: Media): void{
    this.popup.open(MediaSinglePopupComponent,{data: media});
  }
  removeFromWatchlist(MediaId: string):void{
    this.watchListService.removeElementFromWatchlist(MediaId).subscribe(res => console.log(res));
  }
}
