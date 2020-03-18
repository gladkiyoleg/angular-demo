import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import { ChartService } from '../../../../services/chart.service';

export interface Stock {
  date: Date;
  value: string;
}

@Component({
  selector: 'app-chart-one',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './chart-one.component.html',
  styleUrls: ['./chart-one.component.scss'],
})
export class ChartOneComponent implements OnInit {
  private stocks: Stock[] = [];
  private width: number = 620;
  private height: number = 300;
  private x: any;
  private y: any;
  private svg: any;
  private line: d3Shape.Line<[number, number]>;

  constructor(private chartService: ChartService) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.getDataList();
      this.initSvg();
      this.initAxis();
      this.drawAxis();
      this.drawLine();
    }, 1);
  }

  private getDataList() {
    return this.chartService.getDataList().subscribe((res) => {
      this.stocks = res;
    });
  }

  private initSvg() {
    this.svg = d3.select('svg')
      .append('g')
      .attr('transform', 'translate(50, 20)');
  }

  private initAxis() {
    this.x = d3Scale.scaleTime().range([0, this.width]);
    this.y = d3Scale.scaleLinear().range([this.height, 0]);
    this.x.domain(d3Array.extent(this.stocks, (d) => d.date));
    this.y.domain(d3Array.extent(this.stocks, (d) => d.value));
  }

  private drawAxis() {

    this.svg.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x));

    this.svg.append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.y))
      .append('text')
      .attr('y', 6)
      .attr('dy', '2em')
      .style('text-anchor', 'end');
  }

  private drawLine() {
    this.line = d3Shape.line()
      .x((d: any) => this.x(d.date))
      .y((d: any) => this.y(d.value));

    this.svg.append('path')
      .datum(this.stocks)
      .attr('class', 'line')
      .attr('d', this.line);
  }

}
