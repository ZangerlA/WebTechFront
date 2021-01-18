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
  wantToWatchListsFound: any [];
  WantToWatchMediaFound: any[] = [];
  WantToWatchUsersFound: any[] = [];

  watchedListsFound: any [];
  watchedMediaFound: any[] = [];
  watchedUsersFound: any[] = [];

  constructor(public watchlistService: WatchlistService, public mediaService: MediaService, public popup: MatDialog, private fb: FormBuilder) {
    this.searchUserWatchlist = this.fb.group({
      user: ['']
    });
  }

  ngOnInit(): void {
    this.getAllWatchlistsAndUsers();

  }

  getAllWatchlistsAndUsers(): void{
    this.watchlistService.getWantToWatchListUsers().subscribe(res => {
      this.wantToWatchListsFound = res.body;
      for (const user of this.wantToWatchListsFound){
        this.WantToWatchUsersFound.push(Object.keys(user)[0]);
      }
    });

    this.watchlistService.getWatchedListUsers().subscribe(res => {
      this.watchedListsFound = res.body;
      for (const user of this.watchedListsFound){
        this.watchedUsersFound.push(Object.keys(user)[0]);
      }
    });
  }

  findWatchlist(): void{
    this.getWantToWatchListOfUser(this.searchUserWatchlist.value.user);
    this.getWatchedListOfUser(this.searchUserWatchlist.value.user);
  }

  getWantToWatchListOfUser(username: string): void{
    const idArray = [];
    for (const user of this.wantToWatchListsFound) {
      if (Object.keys(user)[0] === username) {
        idArray.push(user[username]);
      }
    }
    this.getMediasFromWantToWatchWatchlist(idArray);
  }

  getWatchedListOfUser(username: string): void{
    const idArray = [];
    for (const user of this.watchedListsFound) {
      if (Object.keys(user)[0] === username) {
        idArray.push(user[username]);
      }
    }
    this.getMediasFromWatchedWatchlist(idArray);
  }

  getMediasFromWantToWatchWatchlist(idArray: string[]): void{
    this.WantToWatchMediaFound = [];
    for (const id of idArray[0]){
      this.mediaService.getMedia(id, undefined).subscribe(res => {
        this.WantToWatchMediaFound.push(res.body);
      });
    }
    console.log(this.WantToWatchMediaFound);
  }

  getMediasFromWatchedWatchlist(idArray: string[]): void{
    this.watchedMediaFound = [];
    for (const id of idArray[0]){
      this.mediaService.getMedia(id, undefined).subscribe(res => {
        this.watchedMediaFound.push(res.body);
      });
    }
    console.log(this.watchedMediaFound);
  }

  openPopup(media: Media): void{
    this.popup.open(MediaSinglePopupComponent, {data: media});
  }
}
