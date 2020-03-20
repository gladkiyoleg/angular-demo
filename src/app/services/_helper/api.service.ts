import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private defaultParams = {
    api_key: environment.API_KEY,
  };

  constructor(private http: HttpClient) {
  }

  get(url: string, options: any = this.defaultParams) {
    return this.http.get(url, {
      params: {
        ...this.defaultParams,
        ...options,
      },
    });
  }
}
