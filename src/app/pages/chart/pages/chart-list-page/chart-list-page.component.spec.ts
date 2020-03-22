import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartListPageComponent } from './chart-list-page.component';

describe('ChartListPageComponent', () => {
  let component: ChartListPageComponent;
  let fixture: ComponentFixture<ChartListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartListPageComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
