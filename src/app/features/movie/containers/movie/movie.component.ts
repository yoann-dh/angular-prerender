import { Component, OnInit } from '@angular/core';
import { MovieService } from 'features/movie/services/movie.service';
import { Observable } from 'rxjs';
import { Movie } from 'features/movie/models/movie.model';
import { SeoService } from '../../../../shared/services/seo.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  movies$: Observable<Movie[]>;

  constructor(private movieService: MovieService, private seoService: SeoService) {
  }

  ngOnInit(): void {
    this.movies$ = this.movieService.findPopular();
    this.seoService.generateTags(
      {
        title: 'Rendertron Seo Angular',
        description:
          'Seo friendly with google rendertron for angular 9 app by fruitylab.fr',
        image: 'https://book.fruitylab.fr/rendertron/assets/images/rendertron-base.png',
        slug: '',
      }
    );
  }
}
