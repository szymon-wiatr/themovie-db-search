import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MovieLanguageComponent } from './movie-language';
import { MovieDetailComponent } from './movie-detail';
import { MoviePreviewComponent } from './movie-preview';
import { MoviePreviewListComponent } from './movie-preview-list';
import { MovieSearchComponent } from './movie-search';
import { LayoutComponent } from './layout';
import { NavItemComponent } from './nav-item';
import { SidenavComponent } from './sidenav';
import { ToolbarComponent } from './toolbar';

import { PipesModule } from '../pipes';


export const COMPONENTS = [
  MovieLanguageComponent,
  MovieDetailComponent,
  MoviePreviewComponent,
  MoviePreviewListComponent,
  MovieSearchComponent,
  LayoutComponent,
  NavItemComponent,
  SidenavComponent,
  ToolbarComponent,
];


/**
 * 
 * 
 * @export
 * @class ComponentsModule
 */
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    PipesModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule { }
