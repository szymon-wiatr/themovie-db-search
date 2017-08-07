import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Movie } from '../models/movie';


/**
 * 
 * 
 * @export
 * @class SearchMoviesService
 */
@Injectable()
export class SearchMoviesService {
  private API_KEY =  'f466363a7028535dab20543b1750e0e9';
  private API_PATH = `https://api.themoviedb.org/3/search/movie?api_key=${this.API_KEY}&language=en-US&query=al&page=1&include_adult=false`;

  /**
   * Creates an instance of SearchMoviesService.
   * @param {Http} http 
   * @memberof SearchMoviesService
   */
  constructor(private http: Http) {}

  /**
   * 
   * 
   * @param {string} queryTitle 
   * @returns {Observable<Movie[]>} 
   * @memberof SearchMoviesService
   */
  searchMovies(queryTitle: string): Observable<Movie[]> {
    return this.http.get(`${this.API_PATH}?&query=${queryTitle}`)
      .map(res => res.json().results || []);
  }

  /**
   * 
   * 
   * @param {string} volumeId 
   * @returns {Observable<Movie>} 
   * @memberof SearchMoviesService
   */
  retrieveMovie(volumeId: string): Observable<Movie> {
    return this.http.get(`${this.API_PATH}/${volumeId}`)
      .map(res => res.json());
  }
}
