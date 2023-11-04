import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFloorsComponent } from './edit-floors.component';

describe('EditFloorsComponent', () => {
  let component: EditFloorsComponent;
  let fixture: ComponentFixture<EditFloorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditFloorsComponent]
    });
    fixture = TestBed.createComponent(EditFloorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
