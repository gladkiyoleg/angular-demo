import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../../../services/movie.service';
import { Genre, Movie } from '../../../../interfaces/movie.interface';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
})
export class MoviesListComponent implements OnInit {
  list: Movie[] = [];
  genres: Genre[] = [];
  totalPages: number;
  totalResults: number;
  pageSize: number;
  page: number;

  constructor(private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.getMoviesList();
    this.getGenresList();
  }

  getMoviesList(event?: PageEvent): void {
    const params = {
      page: event && event.pageIndex ? ++event.pageIndex : 1,
    };
    this.movieService.getMoviesList(params).subscribe((res) => {
      this.list = res.results;
      this.page = res.page;
      this.pageSize = this.list.length;
      this.totalPages = res.total_pages;
      this.totalResults = res.total_results;
    });
  }

  private getGenresList() {
    this.movieService.getGenresList().subscribe(({ genres }) => {
      this.genres = genres;
    });
  }
}

