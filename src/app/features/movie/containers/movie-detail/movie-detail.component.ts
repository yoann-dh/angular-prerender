import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'features/movie/services/movie.service';
import { Movie } from 'features/movie/models/movie.model';
import { SeoService } from 'shared/services/seo.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  movie: Movie;
  IMG_BASE_PATH = 'https://image.tmdb.org/t/p/w500';
  currentUrl = window.location.href;
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
