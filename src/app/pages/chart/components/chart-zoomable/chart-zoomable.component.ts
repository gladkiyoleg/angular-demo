import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import * as d3 from 'd3';

import { Currency, Margin } from '../../../../interfaces/chart.interface';

@Component({
  selector: 'app-chart-zoomable',
  templateUrl: './chart-zoomable.component.html',
  styleUrls: ['./chart-zoomable.component.scss'],
})
export class ChartZoomableComponent implements OnInit, OnChanges {

  @Input() data: Currency[];
  @Input() fullData: Currency[];

  private isInit: boolean;
  private width: number = 600;
  private height: number = 400;
  private x: any;
  private y: any;
  private margin: Margin = {
    top: 10,
    bottom: 20,
    right: 40,
    left: 0,
  };

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {

    for (const prop in changes) {
      if (changes.hasOwnProperty(prop)) {
        if (prop === 'data' && changes[prop].currentValue.length) {
          if (!this.isInit) {
            this.updateSvg(false);
          } else {
            this.updateSvg(true);
          }
        }
      }
    }
  }

  private updateSvg(isInit: boolean): boolean | null {
    let svg: d3.Selection<SVGElement, any, HTMLElement, any>;
    let wrapper: d3.Selection<SVGElement, any, HTMLElement, any>;
    let area: any;
    let xAxis: any;
    let yAxis: any;

    this.isInit = true;

    area = d3.area()
      .x((d: any) => this.x(new Date(d.date)))
      .y0(this.height)
      .y1((d: any) => this.y(d.value.close));

    xAxis = (g) => g
      .attr('class', 'axis--x')
      .call(d3.axisBottom(this.x)
        .ticks(this.width / 100));

    if (isInit) {
      if (this.data.length >= 2) {
        this.x.domain(d3.extent(this.data, (d) => new Date(d.date)));

        d3.select('.area')
          .datum(this.data)
          .attr('d', area);
        d3.select('.axis--x')
          .call(xAxis);
      }
      return false;
    }

    this.x = d3.scaleTime()
      .range([0, this.width])
      .domain(d3.extent(this.data, (d) => new Date(d.date)));

    this.y = d3.scaleLinear()
      .range([this.height, 0])
      .domain(d3.extent(this.fullData, (d) => d.value.close)).nice();

    yAxis = (g) => g
      .call(d3.axisLeft(this.y)
        .ticks(null, 's')
        .tickSizeInner(0)
        .tickPadding(-32))
      .call((g) => g.selectAll('.tick line').clone()
        .attr('class', 'line--x')
        .attr('x1', `-${this.width}`));

    svg = d3.select('#chartZoomable')
      .append('svg')
      .attr('viewBox', `0, 0, ${this.width + this.margin.left + this.margin.right},
        ${this.height + this.margin.top + this.margin.bottom}`);

    wrapper = svg
      .append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    wrapper.append('path')
      .datum(this.data)
      .attr('class', 'area')
      .attr('d', area);

    wrapper.append('g')
      .attr('transform', `translate(0, ${this.height})`)
      .call(xAxis);

    wrapper.append('g')
      .attr('transform', `translate(${this.width}, 0)`)
      .call(yAxis);
  }

}
