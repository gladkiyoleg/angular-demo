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

  private width: number = 600;
  private height: number = 100;
  private x: any;
  private y: any;
  private margin: Margin = {
    top: 10,
    bottom: 20,
    right: 40,
    left: 0,
  };
  private brushMinWidth = 30;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data.currentValue) {
      this.initSvg();
    }
  }

  private initSvg() {
    this.x = d3.scaleTime()
      .range([this.margin.left, this.width])
      .domain(d3.extent(this.data, (d) => new Date(d.date)));

    this.y = d3.scaleLinear()
      .range([0, this.height])
      .domain(d3.extent(this.data, (d) => d.value.close));

    const area: any = (x, y) => d3.area()
      .x((d: any) => x(new Date(d.date)))
      .y0(y(0))
      .y1((d: any) => y(d.value.close));

    const brushHandler = () => {
      if (d3.event.selection && Math.floor(d3.event.selection[1] - d3.event.selection[0]) >= this.brushMinWidth) {
        this.onSelectData.emit(d3.event.selection.map(this.x.invert, this.x));
      }
    };

    const brushEndHandler = () => {
      if (!d3.event.selection) {
        gb.call(brush.move, defaultSelection);
      }
    };

    const svg = d3.select('#chartSelectDate')
      .append('svg')
      .attr('viewBox', `0, 0, ${this.width}, ${this.height + this.margin.top + this.margin.bottom}`);

    const wrapper = svg.append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    const xAxis = (g) => g
      .attr('transform', `translate(0,${this.height})`)
      .call(d3.axisBottom(this.x)
        .ticks(this.data.length / 30)
        .tickFormat(d3.timeFormat('%B')));

    const brush = d3.brushX()
      .extent([[this.margin.left, 0.5], [this.width, this.height + this.margin.top + 0.5]])
      .on('brush', brushHandler)
      .on('end', brushEndHandler);

    const defaultSelection = [this.x(d3.utcMonth.offset(this.x.domain()[1], -1)), this.x.range()[1]];

    wrapper.append('g')
      .call(xAxis);

    wrapper.append('path')
      .datum(this.data)
      .attr('class', 'path')
      .attr('d', area(this.x, this.y.copy().range([this.height, 4])));

    const gb = svg.append('g')
      .call(brush)
      .call(brush.move, defaultSelection);
  }
}

