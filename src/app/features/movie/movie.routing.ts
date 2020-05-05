import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieComponent } from './containers/movie/movie.component';
import { MovieDetailComponent } from './containers/movie-detail/movie-detail.component';


const routes: Routes = [
  {
    path: '',
    component: MovieComponent
  },
  {
    path: ':id',
    component: MovieDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRouting { }
