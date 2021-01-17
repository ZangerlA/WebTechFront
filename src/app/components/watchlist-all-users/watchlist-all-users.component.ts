import { Component, OnInit } from '@angular/core';
import { WatchlistService } from '../../services/watchlist.service';
import { MediaService } from '../../services/media.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import { Media } from "../../models/media.model";
import { MediaSinglePopupComponent } from "../media-single-popup/media-single-popup.component";
import { MatDialog } from "@angular/material/dialog";
import { User } from "../../models/user.model";

@Component({
  selector: 'app-watchlist-all-users',
  templateUrl: './watchlist-all-users.component.html',
  styleUrls: ['./watchlist-all-users.component.css']
})
export class WatchlistAllUsersComponent implements OnInit {
  searchUserWatchlist: FormGroup;
  watchlistsFound: any [];
  mediaFound: any[] = [];
  usersFound: any[] = [];

  constructor(public watchlistService: WatchlistService, public mediaService: MediaService, public popup: MatDialog, private fb: FormBuilder) {
    this.searchUserWatchlist = this.fb.group({
      user: ['']
    });
  }

  ngOnInit(): void {
    this.getAllWatchlists();

  }

  getWatchListOfUser(username: string): void{
    const idArray = [];
    for (const user of this.watchlistsFound) {
      if (Object.keys(user)[0] === username) {
        idArray.push(user[username]);
      }
    }
    this.getMediasFromWatchlist(idArray);
  }

  getMediasFromWatchlist(idArray: string[]): void{
    this.mediaFound = [];
    for (const id of idArray[0]){
      this.mediaService.getMedia(id, undefined).subscribe(res => {
        this.mediaFound.push(res.body);
      });
    }
  }

  getAllWatchlists(): void{
    this.watchlistService.getWatchlistUsers().subscribe(res => {
      this.watchlistsFound = res.body;
      for (const user of this.watchlistsFound){
        this.usersFound.push(Object.keys(user)[0]);
      }
    });
  }

  findWatchlist(): void{
    this.getWatchListOfUser(this.searchUserWatchlist.value.user);
  }

  openPopup(media: Media): void{
    this.popup.open(MediaSinglePopupComponent,{data: media});
  }
}
