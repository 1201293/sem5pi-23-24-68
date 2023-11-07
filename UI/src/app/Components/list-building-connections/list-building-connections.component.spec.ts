import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBuildingConnectionsComponent } from './list-building-connections.component';

describe('ListBuildingConnectionsComponent', () => {
  let component: ListBuildingConnectionsComponent;
  let fixture: ComponentFixture<ListBuildingConnectionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListBuildingConnectionsComponent]
    });
    fixture = TestBed.createComponent(ListBuildingConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});