import { Component, OnInit } from '@angular/core';
import { Movie } from 'features/movie/models/movie.model';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'features/movie/services/movie.service';
import { SeoService } from 'shared/services/seo.service';

@Component({
  selector: 'app-no-rendertron-movie-detail',
  templateUrl: './no-rendertron-movie-detail.component.html',
  styleUrls: ['./no-rendertron-movie-detail.component.scss']
})
export class NoRendertronMovieDetailComponent implements OnInit {
  movie: Movie;
  IMG_BASE_PATH = 'https://image.tmdb.org/t/p/w500';
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private seoService: SeoService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.movieService.findOne(+id).subscribe(
      (movie) => {
        this.movie = movie;
        this.seoService.generateTags({
          title: movie.title,
          description:
          movie.overview,
          image: this.IMG_BASE_PATH + movie.backdrop_path,
          slug: '',
        });
      }
    );
  }

}
