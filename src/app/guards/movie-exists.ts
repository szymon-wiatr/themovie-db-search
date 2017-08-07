import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/let';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { SearchMoviesService } from '../services/search-movies';
import * as fromRoot from '../reducers';
import * as movie from '../actions/movie';


/**
 * Guards are hooks into the route resolution process, providing an opportunity
 * to inform the router's navigation process whether the route should continue
 * to activate this route. Guards must return an observable of true or false.
 */
/**
 * 
 * 
 * @export
 * @class MovieExistsGuard
 * @implements {CanActivate}
 */
@Injectable()
export class MovieExistsGuard implements CanActivate {
  /**
   * Creates an instance of MovieExistsGuard.
   * @param {Store<fromRoot.State>} store 
   * @param {SearchMoviesService} searchMovies 
   * @param {Router} router 
   * @memberof MovieExistsGuard
   */
  constructor(
    private store: Store<fromRoot.State>,
    private searchMovies: SearchMoviesService,
    private router: Router
  ) { }

  /**
   * This method creates an observable that waits for the `loaded` property
   * of the collection state to turn `true`, emitting one time once loading
   * has finished.
   */
  /**
   * 
   * 
   * @returns {Observable<boolean>} 
   * @memberof MovieExistsGuard
   */
  waitForCollectionToLoad(): Observable<boolean> {
    return this.store.select(fromRoot.getCollectionLoaded)
      .filter(loaded => loaded)
      .take(1);
  }

  /**
   * This method checks if a movie with the given ID is already registered
   * in the Store
   */
  /**
   * 
   * 
   * @param {string} id 
   * @returns {Observable<boolean>} 
   * @memberof MovieExistsGuard
   */
  hasMovieInStore(id: string): Observable<boolean> {
    return this.store.select(fromRoot.getMovieEntities)
      .map(entities => !!entities[id])
      .take(1);
  }

  /**
   * This method loads a movie with the given ID from the API and caches
   * it in the store, returning `true` or `false` if it was found.
   */
  /**
   * 
   * 
   * @param {string} id 
   * @returns {Observable<boolean>} 
   * @memberof MovieExistsGuard
   */
  hasMovieInApi(id: string): Observable<boolean> {
    return this.searchMovies.retrieveMovie(id)
      .map(movieEntity => new movie.LoadAction(movieEntity))
      .do((action: movie.LoadAction) => this.store.dispatch(action))
      .map(movie => !!movie)
      .catch(() => {
        this.router.navigate(['/404']);
        return of(false);
      });
  }

  /**
   * `hasMovie` composes `hasMovieInStore` and `hasMovieInApi`. It first checks
   * if the movie is in store, and if not it then checks if it is in the
   * API.
   */
  /**
   * 
   * 
   * @param {string} id 
   * @returns {Observable<boolean>} 
   * @memberof MovieExistsGuard
   */
  hasMovie(id: string): Observable<boolean> {
    return this.hasMovieInStore(id)
      .switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }

        return this.hasMovieInApi(id);
      });
  }

  /**
   * This is the actual method the router will call when our guard is run.
   *
   * Our guard waits for the collection to load, then it checks if we need
   * to request a movie from the API or if we already have it in our cache.
   * If it finds it in the cache or in the API, it returns an Observable
   * of `true` and the route is rendered successfully.
   *
   * If it was unable to find it in our cache or in the API, this guard
   * will return an Observable of `false`, causing the router to move
   * on to the next candidate route. In this case, it will move on
   * to the 404 page.
   */
  /**
   * 
   * 
   * @param {ActivatedRouteSnapshot} route 
   * @returns {Observable<boolean>} 
   * @memberof MovieExistsGuard
   */
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.waitForCollectionToLoad()
      .switchMap(() => this.hasMovie(route.params['id']));
  }
}
