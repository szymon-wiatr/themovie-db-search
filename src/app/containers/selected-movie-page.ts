import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../reducers';
import * as collection from '../actions/collection';
import { Movie } from '../models/movie';


/**
 * 
 * 
 * @export
 * @class SelectedMoviePageComponent
 */
@Component({
  selector: 'bc-selected-movie-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-movie-detail
      [movie]="movie$ | async"
      [inCollection]="isSelectedMovieInCollection$ | async"
      (add)="addToCollection($event)"
      (remove)="removeFromCollection($event)">
    </bc-movie-detail>
  `
})
export class SelectedMoviePageComponent {
  /**
   * 
   * 
   * @type {Observable<Movie>}
   * @memberof SelectedMoviePageComponent
   */
  movie$: Observable<Movie>;
  /**
   * 
   * 
   * @type {Observable<boolean>}
   * @memberof SelectedMoviePageComponent
   */
  isSelectedMovieInCollection$: Observable<boolean>;

  /**
   * Creates an instance of SelectedMoviePageComponent.
   * @param {Store<fromRoot.State>} store 
   * @memberof SelectedMoviePageComponent
   */
  constructor(private store: Store<fromRoot.State>) {
    this.movie$ = store.select(fromRoot.getSelectedMovie);
    this.isSelectedMovieInCollection$ = store.select(fromRoot.isSelectedMovieInCollection);
  }

  /**
   * 
   * 
   * @param {Movie} movie 
   * @memberof SelectedMoviePageComponent
   */
  addToCollection(movie: Movie) {
    this.store.dispatch(new collection.AddMovieAction(movie));
  }

  /**
   * 
   * 
   * @param {Movie} movie 
   * @memberof SelectedMoviePageComponent
   */
  removeFromCollection(movie: Movie) {
    this.store.dispatch(new collection.RemoveMovieAction(movie));
  }
}
