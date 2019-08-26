import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcatViewComponent } from './subcat-view.component';

describe('SubcatViewComponent', () => {
  let component: SubcatViewComponent;
  let fixture: ComponentFixture<SubcatViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcatViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcatViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
