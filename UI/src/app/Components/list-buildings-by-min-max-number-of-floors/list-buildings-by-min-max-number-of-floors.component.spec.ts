import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBuildingsByMinMaxNumberOfFloorsComponent } from './list-buildings-by-min-max-number-of-floors.component';

describe('ListBuildingsByMinMaxNumberOfFloorsComponent', () => {
  let component: ListBuildingsByMinMaxNumberOfFloorsComponent;
  let fixture: ComponentFixture<ListBuildingsByMinMaxNumberOfFloorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListBuildingsByMinMaxNumberOfFloorsComponent]
    });
    fixture = TestBed.createComponent(ListBuildingsByMinMaxNumberOfFloorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
