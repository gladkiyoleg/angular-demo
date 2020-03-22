import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChartService } from '../../../../services/chart.service';
import { Currency } from '../../../../interfaces/chart.interface';
import { CurrencyCode, CurrencyRequest } from '../../../../interfaces/requests/currency-request.interface';

@Component({
  selector: 'app-chart-currency-page',
  templateUrl: './chart-currency-page.component.html',
  styleUrls: ['./chart-currency-page.component.scss'],
})
export class ChartCurrencyPageComponent implements OnInit {
  loading: boolean = false;
  data: Currency[] = [];
  selectedDataRange: Currency[] = [];
  selectedDateFrom: Date;
  selectedDateTo: Date;
  currencyCodeFrom: CurrencyCode = CurrencyCode.USD;
  currencyCodeTo: CurrencyCode = CurrencyCode.UAH;

  constructor(private chartService: ChartService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getDataList();
  }

  selectedDataHandler(event: Date[]): void {
    this.selectedDataRange = [];
    this.selectedDateFrom = event[0];
    this.selectedDateTo = event[1];
    this.data.map((el) => {
      if (new Date(el.date) > event[0] && new Date(el.date) < event[1]) {
        this.selectedDataRange.push(el);
      }
    });
    this.cdr.detectChanges();
  }

  maxValue(type: string): number {
    return this.selectedDataRange ? Math.max.apply(Math, this.selectedDataRange.map((el) => el.value[type])) : 0;
  }

  private getDataList() {
    const params: CurrencyRequest = {
      from_symbol: this.currencyCodeFrom,
      to_symbol: this.currencyCodeTo,
    };
    return this.chartService.getDataList(params).subscribe((res) => {
      const obj = res['Time Series FX (Daily)'];
      const arr = [];
      const date = Object.keys(obj);
      const value = Object.values(obj);
      for (let i = 0; i < value.length; i++) {
        arr.push({
          date: date[i],
          value: {
            open: Number(value[i]['1. open']),
            high: Number(value[i]['2. high']),
            low: Number(value[i]['3. low']),
            close: Number(value[i]['4. close']),
          },
        });
      }
      this.data = arr;
    });
  }

}
