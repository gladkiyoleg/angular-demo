import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartSelectDateComponent } from './chart-select-date.component';

describe('ChartTwoComponent', () => {
  let component: ChartSelectDateComponent;
  let fixture: ComponentFixture<ChartSelectDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartSelectDateComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartSelectDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
