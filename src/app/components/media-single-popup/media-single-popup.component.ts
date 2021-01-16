import { Component, OnInit, Inject } from '@angular/core';
import {Media} from "../../models/media.model";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-media-single-popup',
  templateUrl: './media-single-popup.component.html',
  styleUrls: ['./media-single-popup.component.css']
})
export class MediaSinglePopupComponent implements OnInit {
  media: Media;

  constructor(@Inject(MAT_DIALOG_DATA) public mediainc: Media) {
    this.media = mediainc;
    console.log(this.media)
  }

  ngOnInit(): void {
  }


}
