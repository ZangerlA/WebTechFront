import { Component, OnInit } from '@angular/core';
import {Media} from '../../models/media.model';

@Component({
  selector: 'app-media-single',
  templateUrl: './media-single.component.html',
  styleUrls: ['./media-single.component.css']
})
export class MediaSingleComponent implements OnInit {
  movie: Media;
  constructor() {
  }

  ngOnInit(): void {
  }

}
