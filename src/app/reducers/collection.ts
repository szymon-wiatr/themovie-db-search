import * as collection from '../actions/collection';


/**
 * 
 * 
 * @export
 * @interface State
 */
export interface State {
  loaded: boolean;
  loading: boolean;
  ids: number[];
  entities?: any;
};

const initialState: State = {
  loaded: false,
  loading: false,
  ids: []
};

/**
 * 
 * 
 * @export
 * @param {any} [state=initialState] 
 * @param {collection.Actions} action 
 * @returns {State} 
 */
export function reducer(state = initialState, action: collection.Actions): State {
  switch (action.type) {
    case collection.LOAD: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case collection.LOAD_SUCCESS: {
      const movies = action.payload;

      return {
        loaded: true,
        loading: false,
        ids: movies.map(movie => movie.id)
      };
    }

    case collection.ADD_MOVIE_SUCCESS:
    case collection.REMOVE_MOVIE_FAIL: {
      const movie = action.payload;

      if (state.ids.indexOf(movie.id) > -1) {
        return state;
      }

      return Object.assign({}, state, {
        ids: [ ...state.ids, movie.id ]
      });
    }

    case collection.REMOVE_MOVIE_SUCCESS:
    case collection.ADD_MOVIE_FAIL: {
      const movie = action.payload;

      return Object.assign({}, state, {
        ids: state.ids.filter(id => id !== movie.id)
      });
    }

    default: {
      return state;
    }
  }
}


export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getIds = (state: State) => state.ids;
