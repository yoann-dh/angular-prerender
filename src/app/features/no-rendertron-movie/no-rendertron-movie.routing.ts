import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoRendertronMovieComponent } from 'features/no-rendertron-movie/containers/no-rendertron-movie/no-rendertron-movie.component';
// tslint:disable-next-line:max-line-length
import { NoRendertronMovieDetailComponent } from 'features/no-rendertron-movie/containers/no-rendertron-movie-detail/no-rendertron-movie-detail.component';


const routes: Routes = [
  {
    path: '',
    component: NoRendertronMovieComponent
  },
  {
    path: ':id',
    component: NoRendertronMovieDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoRendertronMovieRouting { }
