import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChartService {

  constructor() {
  }

  getDataList(): Observable<any> {
    return of([
      { date: new Date('2020 03 15'), value: '26.1900' },
      { date: new Date('2020 03 14'), value: '26.1900' },
      { date: new Date('2020 03 13'), value: '26.0100' },
      { date: new Date('2020 03 12'), value: '25.7000' },
      { date: new Date('2020 03 11'), value: '25.3900' },
      { date: new Date('2020 03 10'), value: '24.9600' },
      { date: new Date('2020 03 09'), value: '24.9725' },
    ]);
  }
}
