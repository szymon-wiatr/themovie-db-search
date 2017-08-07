import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Database } from '@ngrx/db';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';

import * as collection from '../actions/collection';
import { Movie } from '../models/movie';


/**
 * 
 * 
 * @export
 * @class CollectionEffects
 */
@Injectable()
export class CollectionEffects {

  /**
   * This effect does not yield any actions back to the store. Set
   * `dispatch` to false to hint to @ngrx/effects that it should
   * ignore any elements of this effect stream.
   *
   * The `defer` observable accepts an observable factory function
   * that is called when the observable is subscribed to.
   * Wrapping the database open call in `defer` makes
   * effect easier to test.
   */
  /**
   * 
   * 
   * @type {Observable<any>}
   * @memberof CollectionEffects
   */
  @Effect({ dispatch: false })
  openDB$: Observable<any> = defer(() => {
    return this.db.open('movies_app');
  });

  /**
   * This effect makes use of the `startWith` operator to trigger
   * the effect immediately on startup.
   */
  /**
   * 
   * 
   * @type {Observable<Action>}
   * @memberof CollectionEffects
   */
  @Effect()
  loadCollection$: Observable<Action> = this.actions$
    .ofType(collection.LOAD)
    .startWith(new collection.LoadAction())
    .switchMap(() =>
      this.db.query('movies')
        .toArray()
        .map((movies: Movie[]) => new collection.LoadSuccessAction(movies))
        .catch(error => of(new collection.LoadFailAction(error)))
    );

  /**
   * 
   * 
   * @type {Observable<Action>}
   * @memberof CollectionEffects
   */
  @Effect()
  addMovieToCollection$: Observable<Action> = this.actions$
    .ofType(collection.ADD_MOVIE)
    .map((action: collection.AddMovieAction) => action.payload)
    .mergeMap(movie =>
      this.db.insert('movies', [ movie ])
        .map(() => new collection.AddMovieSuccessAction(movie))
        .catch(() => of(new collection.AddMovieFailAction(movie)))
    );


  /**
   * 
   * 
   * @type {Observable<Action>}
   * @memberof CollectionEffects
   */
  @Effect()
  removeMovieFromCollection$: Observable<Action> = this.actions$
    .ofType(collection.REMOVE_MOVIE)
    .map((action: collection.RemoveMovieAction) => action.payload)
    .mergeMap(movie =>
      this.db.executeWrite('movies', 'delete', [ movie.id ])
        .map(() => new collection.RemoveMovieSuccessAction(movie))
        .catch(() => of(new collection.RemoveMovieFailAction(movie)))
    );

    constructor(private actions$: Actions, private db: Database) { }
}
