import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRouting } from './movie.routing';
import { MovieComponent } from './containers/movie/movie.component';
import { MovieDetailComponent } from './containers/movie-detail/movie-detail.component';
import { MovieListComponent } from './components/list/movie-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [MovieComponent, MovieDetailComponent, MovieListComponent],
  imports: [
    CommonModule,
    MovieRouting,
    FlexLayoutModule,
  ]
})
export class MovieModule { }
