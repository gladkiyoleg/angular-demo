import { Component, ViewEncapsulation, OnInit, ElementRef, ViewChild } from '@angular/core';

import * as d3Selection from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import { ChartService } from '../../../../services/chart.service';
import * as d3 from 'd3';

export interface Stock {
  date: string;
  value: {
    open: number;
    high: number;
    low: number;
    close: number;
  };
}

@Component({
  selector: 'app-chart-one',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './chart-one.component.html',
  styleUrls: ['./chart-one.component.scss'],
})

export class ChartOneComponent implements OnInit {
  @ViewChild('chartOne') chartOne: ElementRef;

  loading: boolean;
  private stocks: Stock[] = [];
  private width: number;
  private height: number = 350;
  private x: any;
  private y: any;
  private scaleSvg: any;
  private svg: any;
  private lineClose: d3Shape.Line<[number, number]>;

  constructor(private chartService: ChartService) {
  }

  ngOnInit() {
    this.getDataList();
  }

  private getDataList() {
    return this.chartService.getDataList().subscribe((res) => {
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
      this.stocks = arr;
      this.width = this.stocks.length * 40;
      this.initSvg();
      this.initScaleSvg();
      this.xAxis();
      this.yAxis();
      this.drawLineClose();

      const chartOneEl = this.chartOne.nativeElement as HTMLElement;
      chartOneEl.scrollLeft = this.width;
    });
  }

  private initSvg() {
    this.svg = d3Selection.select('#main')
      .attr('width', `${this.width + 10}px`)
      .attr('height', `${this.height + 30}px`)
      .append('g');
  }

  private initScaleSvg() {
    this.scaleSvg = d3Selection.select('#scale')
      .attr('width', `50px`)
      .attr('height', `${this.height + 50}px`)
      .append('g');

    this.y = d3Scale.scaleLinear().range([this.height, 0]);
    this.y.domain(d3Array.extent(this.stocks, (d) => d.value.close));

    this.scaleSvg.append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisRight(this.y));
  }

  private xAxis() {
    this.x = d3Scale.scaleTime().range([0, this.width]);
    this.x.domain(d3Array.extent(this.stocks, (d) => new Date(d.date)));

    this.svg.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0, ${this.height})`)
      .call(d3Axis.axisBottom(this.x)
        .ticks(this.stocks.length)
        .tickFormat(d3.timeFormat('%d.%m'))
        .tickPadding(5)
        .tickSizeOuter(0)
        .tickSizeInner(0))
      .call((g) => g.selectAll('.tick line').clone()
        .attr('class', 'line--x')
        .attr('y1', this.height));
  }

  private yAxis() {
    this.y = d3Scale.scaleLinear().range([this.height, 0]);
    this.y.domain(d3Array.extent(this.stocks, (d) => d.value.close));

    this.svg.append('g')
      .attr('class', 'axis axis--y')
      .attr('transform', `translate(${this.width}, 0)`)
      .call(d3Axis.axisRight(this.y)
        .tickFormat(() => '')
        .tickSizeInner(0)
        .tickSizeOuter(0))
      .call((g) => g.selectAll('.tick line').clone()
        .attr('class', 'line--y')
        .attr('x1', this.width + 10));
  }

  private drawLineClose() {
    this.lineClose = d3Shape.line()
      .x((d: any) => this.x(new Date(d.date)))
      .y((d: any) => this.y(d.value.close));

    this.svg.append('path')
      .datum(this.stocks)
      .attr('class', 'line line--close')
      .attr('d', this.lineClose);
  }
}
