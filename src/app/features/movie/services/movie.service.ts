import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie } from 'features/movie/models/movie.model';
import { environment } from 'env/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  API_KEY = environment.apiKey;
  constructor(private http: HttpClient) {}

  findPopular(): Observable<Movie[]> {
    return this.http.get<Movie[]>(
      `https://api.themoviedb.org/3/movie/popular?api_key=${this.API_KEY}&language=fr-FR&page=1`)
      .pipe(
        map((res) => res['results'])
      );
  }
  findOne(id: number): Observable<Movie> {
    return this.http.get<Movie>(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${this.API_KEY}&language=fr-FR`
    );
  }
}
