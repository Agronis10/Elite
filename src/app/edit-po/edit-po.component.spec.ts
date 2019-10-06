import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPOComponent } from './edit-po.component';

describe('EditPOComponent', () => {
  let component: EditPOComponent;
  let fixture: ComponentFixture<EditPOComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPOComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
