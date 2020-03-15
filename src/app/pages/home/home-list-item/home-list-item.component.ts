import { Component, Input, OnInit } from '@angular/core';
import { Genre, Movie } from '../../../interfaces/movie.interface';
import { ApiResourcesEnum } from '../../../constants/api-resources.enum';

@Component({
  selector: 'app-home-list-item',
  templateUrl: './home-list-item.component.html',
  styleUrls: ['./home-list-item.component.scss'],
})

export class HomeListItemComponent implements OnInit {
  @Input() film: Movie;
  @Input() genres: Genre[];

  constructor() {
  }

  ngOnInit(): void {

  }

  getMoviePoster(url: string): string {
    return `${ApiResourcesEnum.BASE_POSTER_URL}/${ApiResourcesEnum.IMAGE_SIZE_92}${url}`;
  }

  setGenreName(id: number) {
    for (let i = 0; i <= this.genres.length; i++) {
      if (this.genres[i].id === id) {
        return this.genres[i].name;
      }
    }
  }

}
