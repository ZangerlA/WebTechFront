import { Component, OnInit, Inject } from '@angular/core';
import {Media} from '../../models/media.model';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ReviewService} from '../../services/review.service';
import {Review} from '../../models/review.model';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-media-single-popup',
  templateUrl: './media-single-popup.component.html',
  styleUrls: ['./media-single-popup.component.css']
})
export class MediaSinglePopupComponent implements OnInit {
  media: Media;
  reviews: Review[];
  ownReview: Review;
  reviewForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public mediainc: Media, private reviewService: ReviewService, public fb: FormBuilder) {
    this.media = mediainc;
    this.reviewForm = this.fb.group({
      reviewPoints: [''],
      reviewText: ['']
    });
  }

  ngOnInit(): void {
    this.reviewService.getReview(this.media.id).subscribe(res => this.reviews = res.body);
  }

  setReview(): void{
    this.ownReview = new Review();
    this.ownReview.MediumId = this.media.id;
    this.ownReview.reviewText = this.reviewForm.value.reviewText;
    this.ownReview.reviewPoints = this.reviewForm.value.reviewPoints;
    this.reviewService.postReview(this.ownReview).subscribe(res => this.reviewForm.reset()); // TODO response feedback
  }
}
