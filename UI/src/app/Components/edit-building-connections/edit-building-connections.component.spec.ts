import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBuildingConnectionsComponent } from './edit-building-connections.component';

describe('EditBuildingConnectionsComponent', () => {
  let component: EditBuildingConnectionsComponent;
  let fixture: ComponentFixture<EditBuildingConnectionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditBuildingConnectionsComponent]
    });
    fixture = TestBed.createComponent(EditBuildingConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});