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

  private width: number = 600;
  private height: number = 400;
  private x: any;
  private y: any;
  private margin: Margin = {
    top: 10,
    bottom: 20,
    right: 40,
    left: 10,
  };

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {

    for (const prop in changes) {
      if (prop === 'data' && changes[prop].previousValue && !changes[prop].previousValue.length) {
        this.initSvg();
      }
    }
  }

  private initSvg() {
    let wrapper: any;
    let area: any;
    let xAxis: any;
    let svg: any;

    svg = d3.select('#chartZoomable')
      .append('svg')
      .attr('viewBox', `0, 0, ${this.width + this.margin.left + this.margin.right}, ${this.height + this.margin.top + this.margin.bottom}`);

    wrapper = svg
      .append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    this.x = d3.scaleTime()
      .range([0, this.width])
      .domain(d3.extent(this.data, (d) => new Date(d.date)));

    this.y = d3.scaleLinear()
      .range([this.height, 0])
      .domain(d3.extent(this.data, (d) => d.value.close)).nice();

    area = d3.area()
      .x((d: any) => this.x(new Date(d.date)))
      .y0(this.height)
      .y1((d: any) => this.y(d.value.close));

    xAxis = (g) => g
      .call(d3.axisBottom(this.x)
        .ticks(this.width / 100));

    const yAxis = (g) => g
      .call(d3.axisLeft(this.y)
        .ticks(null, 's')
        .tickSizeInner(-6)
        .tickPadding(-32),
      );

    wrapper.append('path')
      .datum(this.data)
      .attr('class', 'area')
      .attr('fill', 'steelblue')
      .attr('d', area);

    wrapper.append('g')
      .attr('transform', `translate(0, ${this.height})`)
      .call(xAxis);

    wrapper.append('g')
      .attr('transform', `translate(${this.width}, 0)`)
      .call(yAxis);

  }

}
