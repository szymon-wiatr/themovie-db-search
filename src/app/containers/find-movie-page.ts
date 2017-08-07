import 'rxjs/add/operator/let';
import 'rxjs/add/operator/take';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../reducers';
import * as movie from '../actions/movie';
import { Movie } from '../models/movie';


/**
 * 
 * 
 * @export
 * @class FindMoviePageComponent
 */
@Component({
  selector: 'bc-find-movie-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-movie-search [query]="searchQuery$ | async" [searching]="loading$ | async" (search)="search($event)"></bc-movie-search>
    <bc-movie-preview-list [movies]="movies$ | async"></bc-movie-preview-list>
  `
})
export class FindMoviePageComponent {
  /**
   * 
   * 
   * @type {Observable<string>}
   * @memberof FindMoviePageComponent
   */
  searchQuery$: Observable<string>;
  /**
   * 
   * 
   * @type {Observable<Movie[]>}
   * @memberof FindMoviePageComponent
   */
  movies$: Observable<Movie[]>;
  /**
   * 
   * 
   * @type {Observable<boolean>}
   * @memberof FindMoviePageComponent
   */
  loading$: Observable<boolean>;

  /**
   * Creates an instance of FindMoviePageComponent.
   * @param {Store<fromRoot.State>} store 
   * @memberof FindMoviePageComponent
   */
  constructor(private store: Store<fromRoot.State>) {
    this.searchQuery$ = store.select(fromRoot.getSearchQuery).take(1);
    this.movies$ = store.select(fromRoot.getSearchResults);
    this.loading$ = store.select(fromRoot.getSearchLoading);
  }

  search(query: string) {
    this.store.dispatch(new movie.SearchAction(query));
  }
}
