import { Component, Input, OnInit } from '@angular/core';

import * as d3 from 'd3';

import { Currency, Margin } from '../../../../interfaces/chart.interface';

@Component({
  selector: 'app-chart-currency-converter',
  templateUrl: './chart-currency-converter.component.html',
  styleUrls: ['./chart-currency-converter.component.scss'],
})
export class ChartCurrencyConverterComponent implements OnInit {

  @Input() data: Currency[];

  private width: number;
  private height: number;
  private x: any;
  private y: any;
  private margin: Margin = {
    top: 20,
    bottom: 20,
    right: 0,
    left: 0,
  };

  constructor() {
  }

  ngOnInit() {
    this.initSvg();
  }

  private initSvg() {
    this.width = 600;
    this.height = 350;

    const svg = d3.select('#chartCurrencyConverter')
      .attr('viewBox', `0, 0, ${this.width}, ${this.height}`);
  }

}
