import {Component, Inject, OnInit} from '@angular/core';
import {Media} from '../../models/media.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { MovieSeriesInfoService } from '../../services/movie-series-info.service';
import { AnimeInfoService } from '../../services/anime-info.service';
import { MediaService } from '../../services/media.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-media-single-popup-add-media',
  templateUrl: './media-single-popup-add-media.component.html',
  styleUrls: ['./media-single-popup-add-media.component.css']
})
export class MediaSinglePopupAddMediaComponent implements OnInit {
  result;


  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public mediaInc: [],
    private animeInfo: AnimeInfoService,
    private seriesMovieService: MovieSeriesInfoService,
    private mediaService: MediaService,
    private snackBar: MatSnackBar
  ) {
    this.result = mediaInc;
  }

  ngOnInit(): void {
  }

  addToDatabase(result): void {
    this.convertSearchToMedia(result).subscribe(media => {
      this.mediaService.postMedia(media).subscribe(
        res => {
          this.dialogRef.close();
          this.snackBar.open('Success!', 'dismiss', {
            duration: 2000, panelClass: ['mat-toolbar', 'mat-primary', 'custom-dialog-container']
          });
          },
        error => {console.error(error); }
      );
    });
  }

  convertSearchToMedia(result): Observable<Media> {
    if (result.Type === 'movie'){
      return this.seriesMovieService.getMovieInfo(result.imdbID).pipe(map(Media.createFromMovie));
    }
    else if (result.Type === 'series'){
      return this.seriesMovieService.getSeriesInfo(result.imdbID).pipe(map(Media.createFromSeries));
    }
    else {
      return this.animeInfo.getAnimeInfo(result.mal_id).pipe(map(Media.createFromAnime));
    }
  }

}
