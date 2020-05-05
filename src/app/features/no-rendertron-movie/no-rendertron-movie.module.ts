import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoRendertronMovieRouting } from './no-rendertron-movie.routing';
import { NoRendertronMovieComponent } from './containers/no-rendertron-movie/no-rendertron-movie.component';
import { NoRendertronMovieDetailComponent } from './containers/no-rendertron-movie-detail/no-rendertron-movie-detail.component';
import { NoRendertronMovieListComponent } from './components/list/no-rendertron-movie-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [NoRendertronMovieComponent, NoRendertronMovieDetailComponent, NoRendertronMovieListComponent],
  imports: [
    CommonModule,
    NoRendertronMovieRouting,
    FlexLayoutModule
  ]
})
export class NoRendertronMovieModule { }
