import { Action } from '@ngrx/store';
import { Movie } from '../models/movie';

export const SEARCH =           '[Movie] Search';
export const SEARCH_COMPLETE =  '[Movie] Search Complete';
export const LOAD =             '[Movie] Load';
export const SELECT =           '[Movie] Select';


/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handmovie/advanced-types.html#discriminated-unions
 */
/**
 * 
 * 
 * @export
 * @class SearchAction
 * @implements {Action}
 */
export class SearchAction implements Action {
  readonly type = SEARCH;

  /**
   * Creates an instance of SearchAction.
   * @param {string} payload 
   * @memberof SearchAction
   */
  constructor(public payload: string) { }
}

/**
 * 
 * 
 * @export
 * @class SearchCompleteAction
 * @implements {Action}
 */
export class SearchCompleteAction implements Action {
  readonly type = SEARCH_COMPLETE;

  /**
   * Creates an instance of SearchCompleteAction.
   * @param {Movie[]} payload 
   * @memberof SearchCompleteAction
   */
  constructor(public payload: Movie[]) { }
}

/**
 * 
 * 
 * @export
 * @class LoadAction
 * @implements {Action}
 */
export class LoadAction implements Action {
  readonly type = LOAD;

  /**
   * Creates an instance of LoadAction.
   * @param {Movie} payload 
   * @memberof LoadAction
   */
  constructor(public payload: Movie) { }
}

/**
 * 
 * 
 * @export
 * @class SelectAction
 * @implements {Action}
 */
export class SelectAction implements Action {
  readonly type = SELECT;

  /**
   * Creates an instance of SelectAction.
   * @param {string} payload 
   * @memberof SelectAction
   */
  constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = SearchAction
  | SearchCompleteAction
  | LoadAction
  | SelectAction;
