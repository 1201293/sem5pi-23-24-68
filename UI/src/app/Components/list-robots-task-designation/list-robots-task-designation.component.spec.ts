import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRobotsTaskDesignationComponent } from './list-robots-task-designation.component';

describe('ListRobotsTaskDesignationComponent', () => {
    let component: ListRobotsTaskDesignationComponent;
    let fixture: ComponentFixture<ListRobotsTaskDesignationComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ListRobotsTaskDesignationComponent]
        });
        fixture = TestBed.createComponent(ListRobotsTaskDesignationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    

});