import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartCurrencyPageComponent } from './chart-currency-page.component';

describe('ChartCurrencyComponent', () => {
  let component: ChartCurrencyPageComponent;
  let fixture: ComponentFixture<ChartCurrencyPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartCurrencyPageComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartCurrencyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
