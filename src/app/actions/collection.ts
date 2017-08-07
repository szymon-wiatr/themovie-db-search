import { Action } from '@ngrx/store';
import { Movie } from '../models/movie';


export const ADD_MOVIE =             '[Collection] Add Movie';
export const ADD_MOVIE_SUCCESS =     '[Collection] Add Movie Success';
export const ADD_MOVIE_FAIL =        '[Collection] Add Movie Fail';
export const REMOVE_MOVIE =          '[Collection] Remove Movie';
export const REMOVE_MOVIE_SUCCESS =  '[Collection] Remove Movie Success';
export const REMOVE_MOVIE_FAIL =     '[Collection] Remove Movie Fail';
export const LOAD =                 '[Collection] Load';
export const LOAD_SUCCESS =         '[Collection] Load Success';
export const LOAD_FAIL =            '[Collection] Load Fail';


/**
 * Add Movie to Collection Actions
 */
export class AddMovieAction implements Action {
  readonly type = ADD_MOVIE;

  /**
   * Creates an instance of AddMovieAction.
   * @param {Movie} payload 
   * @memberof AddMovieAction
   */
  constructor(public payload: Movie) { }
}

export class AddMovieSuccessAction implements Action {
  readonly type = ADD_MOVIE_SUCCESS;

  /**
   * Creates an instance of AddMovieSuccessAction.
   * @param {Movie} payload 
   * @memberof AddMovieSuccessAction
   */
  constructor(public payload: Movie) { }
}

export class AddMovieFailAction implements Action {
  readonly type = ADD_MOVIE_FAIL;

  /**
   * Creates an instance of AddMovieFailAction.
   * @param {Movie} payload 
   * @memberof AddMovieFailAction
   */
  constructor(public payload: Movie) { }
}


/**
 * Remove Movie from Collection Actions
 */
export class RemoveMovieAction implements Action {
  readonly type = REMOVE_MOVIE;

  /**
   * Creates an instance of RemoveMovieAction.
   * @param {Movie} payload 
   * @memberof RemoveMovieAction
   */
  constructor(public payload: Movie) { }
}

export class RemoveMovieSuccessAction implements Action {
  readonly type = REMOVE_MOVIE_SUCCESS;

  /**
   * Creates an instance of RemoveMovieSuccessAction.
   * @param {Movie} payload 
   * @memberof RemoveMovieSuccessAction
   */
  constructor(public payload: Movie) { }
}

export class RemoveMovieFailAction implements Action {
  readonly type = REMOVE_MOVIE_FAIL;

  /**
   * Creates an instance of RemoveMovieFailAction.
   * @param {Movie} payload 
   * @memberof RemoveMovieFailAction
   */
  constructor(public payload: Movie) {}
}

/**
 * Load Collection Actions
 */

/**
 * 
 * 
 * @export
 * @class LoadAction
 * @implements {Action}
 */
export class LoadAction implements Action {
  readonly type = LOAD;
}

/**
 * 
 * 
 * @export
 * @class LoadSuccessAction
 * @implements {Action}
 */
export class LoadSuccessAction implements Action {
  readonly type = LOAD_SUCCESS;

  /**
   * Creates an instance of LoadSuccessAction.
   * @param {Movie[]} payload 
   * @memberof LoadSuccessAction
   */
  constructor(public payload: Movie[]) { }
}

/**
 * 
 * 
 * @export
 * @class LoadFailAction
 * @implements {Action}
 */
export class LoadFailAction implements Action {
  readonly type = LOAD_FAIL;

  /**
   * Creates an instance of LoadFailAction.
   * @param {*} payload 
   * @memberof LoadFailAction
   */
  constructor(public payload: any) { }
}


export type Actions
  = AddMovieAction
  | AddMovieSuccessAction
  | AddMovieFailAction
  | RemoveMovieAction
  | RemoveMovieSuccessAction
  | RemoveMovieFailAction
  | LoadAction
  | LoadSuccessAction
  | LoadFailAction;
