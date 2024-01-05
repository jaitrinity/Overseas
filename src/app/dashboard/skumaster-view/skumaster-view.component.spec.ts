import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkumasterViewComponent } from './skumaster-view.component';

describe('SkumasterViewComponent', () => {
  let component: SkumasterViewComponent;
  let fixture: ComponentFixture<SkumasterViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkumasterViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkumasterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
