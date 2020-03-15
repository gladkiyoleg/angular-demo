import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiResourcesEnum } from '../constants/api-resources.enum';
import { ApiService } from './_helper/api.service';
import { MovieRequest } from '../interfaces/requests/movie-request.interface';

@Injectable({
  providedIn: 'root',
})

export class MovieService {

  constructor(private http: HttpClient, private apiService: ApiService) {
  }

  getMoviesList(params: MovieRequest): Observable<any> {
    return this.apiService.get(ApiResourcesEnum.MOVIE_POPULAR, params);
  }

  getFilmInfoById(id: string): Observable<any> {
    return this.apiService.get(`${ApiResourcesEnum.MOVIE}/${id}`);
  }

  getGenresList(): Observable<any> {
    return this.apiService.get(ApiResourcesEnum.GENRE_ALL);
  }
}
