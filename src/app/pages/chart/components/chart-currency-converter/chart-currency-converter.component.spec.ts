import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartCurrencyConverterComponent } from './chart-currency-converter.component';

describe('ChartCurrencyConverterComponent', () => {
  let component: ChartCurrencyConverterComponent;
  let fixture: ComponentFixture<ChartCurrencyConverterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartCurrencyConverterComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartCurrencyConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
