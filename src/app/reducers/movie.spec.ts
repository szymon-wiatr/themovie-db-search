import {} from 'jasmine';
import { reducer } from './movies';
import * as fromMovies from './movies';
import { SearchCompleteAction, LoadAction, SelectAction } from '../actions/movie';
import { Movie } from '../models/movie';
import { LoadSuccessAction } from '../actions/collection';

describe('MoviesReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;

      const result = reducer(undefined, action);
      expect(result).toEqual(fromMovies.initialState);
    });
  });

  describe('SEARCH_COMPLETE & LOAD_SUCCESS', () => {
    function noExistingMovies(action) {
      const movie1 = {id: 111} as Movie;
      const movie2 = {id: 222} as Movie;
      const createAction = new action([movie1, movie2]);

      const expectedResult = {
        ids: [111, 222],
        entities: {
          '111': movie1,
          '222': movie2
        },
        selectedMovieId: null,
      };

      const result = reducer(fromMovies.initialState, createAction);
      expect(result).toEqual(expectedResult);
    }

    function existingMovies(action) {
      const movie1 = {id: 111} as Movie;
      const movie2 = {id: 222} as Movie;
      const initialState = {
        ids: [111, 222],
        entities: {
          111: movie1,
          222: movie2
        },
        selectedMovieId: null,
      } as any;
      // should not replace existing movies
      const differentMovie2 = {id: 222, foo: 'bar'} as any;
      const movie3 = {id: 333} as Movie;
      const createAction = new action([movie3, differentMovie2]);

      const expectedResult = {
        ids: [111, 222, 333],
        entities: {
          111: movie1,
          222: movie2,
          333: movie3
        },
        selectedMovieId: null,
      };

      const result = reducer(initialState, createAction);
      expect(result).toEqual(expectedResult);
    }

    it('should add all movies in the payload when none exist', () => {
      noExistingMovies(SearchCompleteAction);
      noExistingMovies(LoadSuccessAction);
    });

    it('should add only new movies when movies already exist', () => {
      existingMovies(SearchCompleteAction);
      existingMovies(LoadSuccessAction);
    });
  });

  describe('LOAD', () => {
    it('should add a single movie, if the movie does not exist', () => {
      const movie = {id: 888} as Movie;
      const action = new LoadAction(movie);

      const expectedResult = {
        ids: [888],
        entities: {
          888: movie
        },
        selectedMovieId: null
      };

      const result = reducer(fromMovies.initialState, action);
      expect(result).toEqual(expectedResult);
    });

    it('should return the existing state if the movie exists', () => {
      const initialState = {
        ids: [999],
        entities: {
          '999': {id: 999}
        }
      } as any;
      const movie = {id: 999, foo: 'baz'} as any;
      const action = new LoadAction(movie);

      const result = reducer(initialState, action);
      expect(result).toEqual(initialState);
    });
  });

  describe('SELECT', () => {
    it('should set the selected movie id on the state', () => {
      const action = new SelectAction('1');

      const result = reducer(fromMovies.initialState, action);
      expect(result.selectedMovieId).toBe('1');
    });
  });

  describe('Selections', () => {
    const movie1 = {id: 111} as Movie;
    const movie2 = {id: 222} as Movie;
    const state: fromMovies.State = {
      ids: [111, 222],
      entities: {
        111: movie1,
        222: movie2,
      },
      selectedMovieId: 111
    };

    describe('getEntities', () => {
      it('should return entities', () => {
        const result = fromMovies.getEntities(state);
        expect(result).toBe(state.entities);
      });
    });

    describe('getIds', () => {
      it('should return ids', () => {
        const result = fromMovies.getIds(state);
        expect(result).toBe(state.ids);
      });
    });

    describe('getSelectedId', () => {
      it('should return the selected id', () => {
        const result = fromMovies.getSelectedId(state);
        expect(result).toBe(111);
      });
    });

    describe('getSelected', () => {
      it('should return the selected movie', () => {
        const result = fromMovies.getSelected(state);
        expect(result).toBe(movie1);
      });
    });

    describe('getAll', () => {
      it('should return all movies as an array ', () => {
        const result = fromMovies.getAll(state);
        expect(result).toEqual([movie1, movie2]);
      });
    });

  });
});
