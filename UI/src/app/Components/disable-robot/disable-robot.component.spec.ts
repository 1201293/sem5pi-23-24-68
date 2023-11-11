import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisableRobotComponent } from './disable-robot.component';

describe('DisableRobotComponent', () => {
    let component: DisableRobotComponent;
    let fixture: ComponentFixture<DisableRobotComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DisableRobotComponent]
        });
        fixture = TestBed.createComponent(DisableRobotComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    

});