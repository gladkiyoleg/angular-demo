import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartApiResourcesEnum } from '../constants/api-resources.enum';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChartService {

  constructor(private http: HttpClient) {
  }

  getDataList() {
    const params = {
      function: 'FX_DAILY',
      from_symbol: 'USD',
      to_symbol: 'UAH',
      apikey: environment.AV_API_KEY,
    };
    return this.http.get(`${ChartApiResourcesEnum.BASE_API_URL}`, { params });

  }
}
