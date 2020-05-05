import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Movie } from 'features/movie/models/movie.model';

@Component({
  selector: 'app-no-rendertron-movie-list',
  templateUrl: './no-rendertron-movie-list.component.html',
  styleUrls: ['./no-rendertron-movie-list.component.scss']
})
export class NoRendertronMovieListComponent implements OnChanges {
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
