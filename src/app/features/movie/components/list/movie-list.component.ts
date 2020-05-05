import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Movie } from 'features/movie/models/movie.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnChanges {
  @Input() movies: Movie[];
  @Output() navigate = new EventEmitter();
  IMG_BASE_PATH = 'https://image.tmdb.org/t/p/w500';
  constructor() { }

  ngOnChanges(): void {
    if (this.movies) {
      this.movies.length = 6;
    }
  }
}
