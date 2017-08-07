import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../models/movie';


/**
 * 
 * 
 * @export
 * @class MovieDetailComponent
 */
@Component({
  selector: 'bc-movie-detail',
  template: `
    <md-card *ngIf="movie">
      <md-card-title-group>
        <md-card-title>{{ title }}</md-card-title>
        <md-card-subtitle *ngIf="subtitle">{{ subtitle }}</md-card-subtitle>
        <img md-card-sm-image *ngIf="thumbnail" [src]="thumbnail"/>
      </md-card-title-group>
      <md-card-content>
        <p [innerHtml]="description"></p>
      </md-card-content>
      <md-card-footer class="footer">
        <bc-movie-language [movie]="movie"></bc-movie-language>
      </md-card-footer>
      <md-card-actions align="start">
        <button md-raised-button color="warn" *ngIf="inCollection" (click)="remove.emit(movie)">
        Remove Movie from Collection
        </button>

        <button md-raised-button color="primary" *ngIf="!inCollection" (click)="add.emit(movie)">
        Add Movie to Collection
        </button>
      </md-card-actions>
    </md-card>

  `,
  styles: [`
    :host {
      display: flex;
      justify-content: center;
      margin: 75px 0;
    }
    md-card {
      max-width: 600px;
    }
    md-card-title-group {
      margin-left: 0;
    }
    img {
      width: 60px;
      min-width: 60px;
      margin-left: 5px;
    }
    md-card-content {
      margin: 15px 0 50px;
    }
    md-card-actions {
      margin: 25px 0 0 !important;
    }
    md-card-footer {
      padding: 0 25px 25px;
      position: relative;
    }
  `]
})
export class MovieDetailComponent {
  /**
   * Presentational components receieve data through @Input() and communicate events
   * through @Output() but generally maintain no internal state of their
   * own. All decisions are delegated to 'container', or 'smart'
   * components before data updates flow back down.
   */
  @Input() movie: Movie;
  @Input() inCollection: boolean;
  @Output() add = new EventEmitter<Movie>();
  @Output() remove = new EventEmitter<Movie>();


  /**
   * Utilize getters to keep templates clean
   */
  get id() {
    return this.movie.id;
  }

  get title() {
    return this.movie.title;
  }

  get subtitle() {
    return this.movie.release_date;
  }

  get description() {
    return this.movie.overview;
  }

  get thumbnail(): string | boolean {
    const POSTER_PREFIX = 'https://image.tmdb.org/t/p/w500/';
    if (this.movie.poster_path) {
      return POSTER_PREFIX + this.movie.poster_path;
    }

    return false;
  }
}
