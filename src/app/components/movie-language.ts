import { Component, Input } from '@angular/core';

import { Movie } from '../models/movie';


/**
 * 
 * 
 * @export
 * @class MovieLanguageComponent
 */
@Component({
  selector: 'bc-movie-language',
  template: `
    <h5 md-subheader>Original language:</h5>
    <span>
      {{ language }}
    </span>
  `,
  styles: [`
    h5 {
      margin-bottom: 5px;
    }
  `]
})
export class MovieLanguageComponent {
  @Input() movie: Movie;

  get language() {
    return this.movie.original_language;
  }
}
