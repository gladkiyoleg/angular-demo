import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartZoomableComponent } from './chart-zoomable.component';

describe('ChartCurrencyConverterComponent', () => {
  let component: ChartZoomableComponent;
  let fixture: ComponentFixture<ChartZoomableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartZoomableComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartZoomableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
