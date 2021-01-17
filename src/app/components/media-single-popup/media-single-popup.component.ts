import { Component, OnInit, Inject } from '@angular/core';
import {Media} from "../../models/media.model";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ReviewService} from "../../services/review.service";
import {Review} from "../../models/review.model";

@Component({
  selector: 'app-media-single-popup',
  templateUrl: './media-single-popup.component.html',
  styleUrls: ['./media-single-popup.component.css']
})
export class MediaSinglePopupComponent implements OnInit {
  media: Media;
  reviews: Review[];
  ownReview: Review;
  ReviewMessage: string = 'Review added!';

  constructor(@Inject(MAT_DIALOG_DATA) public mediainc: Media, private reviewService: ReviewService) {
    this.media = mediainc;
  }

  ngOnInit(): void {
    this.reviewService.getReview(this.media.id).subscribe(res => {this.reviews = res.body; });
  }

  setReview(){
    this.ownReview.MediumId = this.media.id;
    this.reviewService.postReview(this.ownReview).subscribe(res => console.log(this.ReviewMessage));
  }
}
