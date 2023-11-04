import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBuildingConnectionComponent } from './create-building-connection.component';

describe('CreateBuildingConnectionComponent', () => {
  let component: CreateBuildingConnectionComponent;
  let fixture: ComponentFixture<CreateBuildingConnectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateBuildingConnectionComponent]
    });
    fixture = TestBed.createComponent(CreateBuildingConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
