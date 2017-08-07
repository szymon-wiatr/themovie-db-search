import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';
import { CollectionEffects } from './collection';
import { Database } from '@ngrx/db';
import { Movie } from '../models/movie';
import * as collection from '../actions/collection';
import { Observable } from 'rxjs/Observable';

describe('CollectionEffects', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      CollectionEffects,
      {
        provide: Database,
        useValue: jasmine.createSpyObj('database', ['open', 'query', 'insert', 'executeWrite'])
      }
    ]
  }));

  function setup() {
    return {
      db: TestBed.get(Database),
      runner: TestBed.get(EffectsRunner),
      collectionEffects: TestBed.get(CollectionEffects)
    };
  }

  describe('openDB$', () => {
    it('should call db.open when initially subscribed to', () => {
      const {db, collectionEffects} = setup();
      collectionEffects.openDB$.subscribe();
      expect(db.open).toHaveBeenCalledWith('movies_app');
    });
  });

  describe('loadCollection$', () => {
    it('should return a collection.LoadSuccessAction, with the movies, on success', () => {
      const movie1 = {id: 111} as Movie;
      const movie2 = {id: 222} as Movie;

      const {db, runner, collectionEffects} = setup();

      const moviesObservable = Observable.of(movie1, movie2);
      db.query.and.returnValue(moviesObservable);

      const expectedResult = new collection.LoadSuccessAction([movie1, movie2]);

      runner.queue(new collection.LoadAction());

      collectionEffects.loadCollection$.subscribe(result => {
        expect(result).toEqual(expectedResult);
      });
    });

    it('should return a collection.LoadFailAction, if the query throws', () => {
      const {db, runner, collectionEffects} = setup();

      const error = new Error('msg');
      db.query.and.returnValue(Observable.throw(error));

      const expectedResult = new collection.LoadFailAction(error);

      runner.queue(new collection.LoadAction());

      collectionEffects.loadCollection$.subscribe(result => {
        expect(result).toEqual(expectedResult);
      });
    });
  });

  describe('addMovieToCollection$', () => {
    it('should return a collection.AddMovieSuccessAction, with the movie, on success', () => {
      const movie = {id: 111, volumeInfo: {}} as Movie;

      const {db, runner, collectionEffects} = setup();
      db.insert.and.returnValue(Observable.of({}));

      const expectedResult = new collection.AddMovieSuccessAction(movie);

      runner.queue(new collection.AddMovieAction(movie));

      collectionEffects.addMovieToCollection$.subscribe(result => {
        expect(result).toEqual(expectedResult);
        expect(db.insert).toHaveBeenCalledWith('movies', [movie]);
      });
    });

    it('should return a collection.AddMovieFailAction, with the movie, when the db insert throws', () => {
      const movie = {id: 111, volumeInfo: {}} as Movie;

      const {db, runner, collectionEffects} = setup();
      db.insert.and.returnValue(Observable.throw(new Error()));

      const expectedResult = new collection.AddMovieFailAction(movie);

      runner.queue(new collection.AddMovieAction(movie));

      collectionEffects.addMovieToCollection$.subscribe(result => {
        expect(result).toEqual(expectedResult);
        expect(db.insert).toHaveBeenCalledWith('movies', [movie]);
      });
    });

    describe('removeMovieFromCollection$', () => {
      it('should return a collection.RemoveMovieSuccessAction, with the movie, on success', () => {
        const movie = {id: 111, volumeInfo: {}} as Movie;

        const {db, runner, collectionEffects} = setup();
        db.executeWrite.and.returnValue(Observable.of({}));

        const expectedResult = new collection.RemoveMovieSuccessAction(movie);

        runner.queue(new collection.RemoveMovieAction(movie));

        collectionEffects.removeMovieFromCollection$.subscribe(result => {
          expect(result).toEqual(expectedResult);
          expect(db.executeWrite).toHaveBeenCalledWith('movies', 'delete', [111]);
        });
      });

      it('should return a collection.RemoveMovieFailAction, with the movie, when the db insert throws', () => {
        const movie = {id: 111, volumeInfo: {}} as Movie;

        const {db, runner, collectionEffects} = setup();
        db.executeWrite.and.returnValue(Observable.throw(new Error()));

        const expectedResult = new collection.RemoveMovieFailAction(movie);

        runner.queue(new collection.RemoveMovieAction(movie));

        collectionEffects.removeMovieFromCollection$.subscribe(result => {
          expect(result).toEqual(expectedResult);
          expect(db.executeWrite).toHaveBeenCalledWith('movies', 'delete', [111]);
        });
      });
    });
  });
});
