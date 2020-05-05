import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'features/layout/containers/layout/layout.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('features/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'movie',
        loadChildren: () => import('features/movie/movie.module').then(m => m.MovieModule)
      },
      {
        path: 'no-rendertron/movie',
        loadChildren: () => import('features/no-rendertron-movie/no-rendertron-movie.module').then(m => m.NoRendertronMovieModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRouting { }
