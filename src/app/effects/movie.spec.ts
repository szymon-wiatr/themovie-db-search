import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MovieEffects } from './movie';
import { SearchMoviesService } from '../services/search-movies';
import { Observable } from 'rxjs/Observable';
import { SearchAction, SearchCompleteAction } from '../actions/movie';
import { Movie } from '../models/movie';

describe('MovieEffects', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      MovieEffects,
      {
        provide: SearchMoviesService,
        useValue: jasmine.createSpyObj('googleMoviesService', ['searchMovies'])
      }
    ]
  }));

  function setup(params?: {searchMoviesReturnValue: any}) {
    const googleMoviesService = TestBed.get(SearchMoviesService);
    if (params) {
      googleMoviesService.searchMovies.and.returnValue(params.searchMoviesReturnValue);
    }

    return {
      runner: TestBed.get(EffectsRunner),
      movieEffects: TestBed.get(MovieEffects)
    };
  }

  describe('search$', () => {
    it('should return a new movie.SearchCompleteAction, with the movies, on success, after the de-bounce', fakeAsync(() => {
      const movie1 = {id: 111, volumeInfo: {}} as Movie;
      const movie2 = {id: 222, volumeInfo: {}} as Movie;
      const movies = [movie1, movie2];

      const {runner, movieEffects} = setup({searchMoviesReturnValue: Observable.of(movies)});

      const expectedResult = new SearchCompleteAction(movies);
      runner.queue(new SearchAction('query'));

      let result = null;
      movieEffects.search$.subscribe(_result => result = _result);
      tick(299); // test de-bounce
      expect(result).toBe(null);
      tick(300);
      expect(result).toEqual(expectedResult);
    }));

    it('should return a new movie.SearchCompleteAction, with an empty array, if the movies service throws', fakeAsync(() => {
      const {runner, movieEffects} = setup({searchMoviesReturnValue: Observable.throw(new Error())});

      const expectedResult = new SearchCompleteAction([]);
      runner.queue(new SearchAction('query'));

      let result = null;
      movieEffects.search$.subscribe(_result => result = _result);
      tick(299); // test de-bounce
      expect(result).toBe(null);
      tick(300);
      expect(result).toEqual(expectedResult);
    }));

    it(`should not do anything if the query is an empty string`, fakeAsync(() => {
      const {runner, movieEffects} = setup();

      runner.queue(new SearchAction(''));
      let result = null;
      movieEffects.search$.subscribe({
        next: () => result = false,
        complete: () => result = false,
        error: () => result = false
      });

      tick(300);
      expect(result).toBe(null);
    }));

  });
});

