import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadFlorMapComponent } from './load-flor-map.component';

describe('LoadFlorMapComponent', () => {
  let component: LoadFlorMapComponent;
  let fixture: ComponentFixture<LoadFlorMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadFlorMapComponent]
    });
    fixture = TestBed.createComponent(LoadFlorMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
