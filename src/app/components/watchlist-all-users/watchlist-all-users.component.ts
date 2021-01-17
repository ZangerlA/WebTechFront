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
  mediaFound: any[];
  usersFound: any[];

  constructor(public watchlistService: WatchlistService, public mediaService: MediaService, public popup: MatDialog, private fb: FormBuilder) {
    this.searchUserWatchlist = this.fb.group({
      user: ['']
    })
  }

  ngOnInit(): void {
    this.getAllWatchlists();

  }

  getAllWatchlists(): void{
    this.watchlistService.getWatchlistUsers().subscribe(res => {this.watchlistsFound = res.body;
        //let help = 0;
        for (let users of this.watchlistsFound){
          /*console.log(Object.keys(users))
          console.log(Object.values(users))
          console.log(Object.entries(users))
          this.usersFound.push(Object.keys(users));
          this.usersFound[help] = Object.keys(users)
          console.log(this.usersFound)
          help++;*/
        }
    });

  }

  findWatchlist(userId: string):void{

  }

  openPopup(media: Media): void{
    this.popup.open(MediaSinglePopupComponent,{data: media});
  }
}
