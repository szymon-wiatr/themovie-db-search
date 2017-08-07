import { Component, Input } from '@angular/core';
import { Movie } from '../models/movie';

/**
 * 
 * 
 * @export
 * @class MoviePreviewListComponent
 */
@Component({
  selector: 'bc-movie-preview-list',
  template: `
    <bc-movie-preview *ngFor="let movie of movies" [movie]="movie"></bc-movie-preview>
  `,
  styles: [`
    :host {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  `]
})
export class MoviePreviewListComponent {
  @Input() movies: Movie[];
}
