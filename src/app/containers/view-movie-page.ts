import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as fromRoot from '../reducers';
import * as movie from '../actions/movie';

/**
 * Note: Container components are also reusable. Whether or not
 * a component is a presentation component or a container
 * component is an implementation detail.
 *
 * The View Movie Page's responsibility is to map router params
 * to a 'Select' movie action. Actually showing the selected
 * movie remains a responsibility of the
 * SelectedMoviePageComponent
 */
@Component({
  selector: 'bc-view-movie-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-selected-movie-page></bc-selected-movie-page>
  `
})
export class ViewMoviePageComponent implements OnDestroy {
  /**
   * 
   * 
   * @type {Subscription}
   * @memberof ViewMoviePageComponent
   */
  actionsSubscription: Subscription;

  /**
   * Creates an instance of ViewMoviePageComponent.
   * @param {Store<fromRoot.State>} store 
   * @param {ActivatedRoute} route 
   * @memberof ViewMoviePageComponent
   */
  constructor(store: Store<fromRoot.State>, route: ActivatedRoute) {
    this.actionsSubscription = route.params
      .select<string>('id')
      .map(id => new movie.SelectAction(id))
      .subscribe(store);
  }

  /**
   * 
   * 
   * @memberof ViewMoviePageComponent
   */
  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
