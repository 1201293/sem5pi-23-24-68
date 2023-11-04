import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFloorsWithConnectionsComponent } from './list-floors-with-connections.component';

describe('ListFloorsWithConnectionsComponent', () => {
  let component: ListFloorsWithConnectionsComponent;
  let fixture: ComponentFixture<ListFloorsWithConnectionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListFloorsWithConnectionsComponent]
    });
    fixture = TestBed.createComponent(ListFloorsWithConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
