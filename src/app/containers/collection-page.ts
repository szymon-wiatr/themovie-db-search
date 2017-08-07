import 'rxjs/add/operator/let';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../reducers';
import { Movie } from '../models/movie';


/**
 * 
 * 
 * @export
 * @class CollectionPageComponent
 */
@Component({
  selector: 'movies-collection-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <md-card>
      <md-card-title>My Collection</md-card-title>
    </md-card>

    <bc-movie-preview-list [movies]="movies$ | async"></bc-movie-preview-list>
  `,
  /**
   * Container components are permitted to have just enough styles
   * to bring the view together. If the number of styles grow,
   * consider breaking them out into presentational
   * components.
   */
  styles: [`
    md-card-title {
      display: flex;
      justify-content: center;
    }
  `]
})
export class CollectionPageComponent {
  /**
   * 
   * 
   * @type {Observable<Movie[]>}
   * @memberof CollectionPageComponent
   */
  movies$: Observable<Movie[]>;

  /**
   * Creates an instance of CollectionPageComponent.
   * @param {Store<fromRoot.State>} store 
   * @memberof CollectionPageComponent
   */
  constructor(store: Store<fromRoot.State>) {
    this.movies$ = store.select(fromRoot.getMovieCollection);
  }
}
