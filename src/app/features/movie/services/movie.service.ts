import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from 'features/movie/models/movie.model';
import { APP_BASE_HREF } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient, @Inject(APP_BASE_HREF) private baseHref: string) {}

  findPopular(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.baseHref}api/moviedb/popular-movies`);
  }
  findOne(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.baseHref}api/moviedb/${id}`);
  }
}
