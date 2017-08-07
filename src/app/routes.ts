import { Routes } from '@angular/router';

import { MovieExistsGuard } from './guards/movie-exists';
import { FindMoviePageComponent } from './containers/find-movie-page';
import { ViewMoviePageComponent } from './containers/view-movie-page';
import { CollectionPageComponent } from './containers/collection-page';
import { NotFoundPageComponent } from './containers/not-found-page';

export const routes: Routes = [
  {
    path: '',
    component: CollectionPageComponent
  },
  {
    path: 'movie/find',
    component: FindMoviePageComponent
  },
  {
    path: 'movie/:id',
    canActivate: [ MovieExistsGuard ],
    component: ViewMoviePageComponent
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];
