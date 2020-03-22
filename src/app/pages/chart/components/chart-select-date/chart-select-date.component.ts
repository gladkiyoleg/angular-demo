import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import * as d3 from 'd3';

import { Currency, Margin } from '../../../../interfaces/chart.interface';

@Component({
  selector: 'app-chart-select-date',
  templateUrl: './chart-select-date.component.html',
  styleUrls: ['./chart-select-date.component.scss'],
})

export class ChartSelectDateComponent implements OnChanges {

  @Input() data: Currency[];

  @Output() onSelectData = new EventEmitter();

  private area: any;
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data.currentValue) {
      this.initSvg();
    }
  }

  private initSvg() {
    this.width = 600;
    this.height = 100;

    this.x = d3.scaleTime()
      .range([this.margin.left, this.width])
      .domain(d3.extent(this.data, (d) => new Date(d.date)));

    this.y = d3.scaleLinear()
      .range([0, this.height])
      .domain(d3.extent(this.data, (d) => d.value.close));

    this.area = (x, y) => d3.area()
      .x((d: any) => x(new Date(d.date)))
      .y0(y(0))
      .y1((d: any) => y(d.value.close));

    const brushHandler = () => {
      if (d3.event.selection) {
        svg.property('value', d3.event.selection.map(this.x.invert, this.x).map(d3.utcDay.round));
        svg.dispatch('input');
        this.onSelectData.emit(d3.event.selection.map(this.x.invert, this.x).map(d3.utcDay.round));
      }
    };

    const brushEndHandler = () => {
      if (!d3.event.selection) {
        gb.call(brush.move, defaultSelection);
      }
    };

    const svg = d3.select('#chartSelectDate')
      .attr('viewBox', `0, 0, ${this.width}, ${this.height}`);

    const xAxis = (g, x, height) => g
      .attr('transform', `translate(0,${height - this.margin.bottom})`)
      .call(d3.axisBottom(this.x)
        .ticks(this.data.length / 30)
        .tickFormat(d3.timeFormat('%B')));

    const brush = d3.brushX()
      .extent([[this.margin.left, 0.5], [this.width, this.height - this.margin.bottom + 0.5]])
      .on('brush', brushHandler)
      .on('end', brushEndHandler);

    const defaultSelection = [this.x(d3.utcMonth.offset(this.x.domain()[1], -1)), this.x.range()[1]];

    svg.append('g')
      .call(xAxis, this.x, this.height);

    svg.append('path')
      .datum(this.data)
      .attr('class', 'path')
      .attr('d', this.area(this.x, this.y.copy().range([this.height - this.margin.bottom, 4])));

    const gb = svg.append('g')
      .call(brush)
      .call(brush.move, defaultSelection);
  }
}

