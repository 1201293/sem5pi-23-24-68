import { Component } from '@angular/core';
import { Observable,first } from 'rxjs';
import { Building } from 'src/app/Interfaces/building';
import { BuildingService } from 'src/app/Services/building.service';
import { Floor } from 'src/app/Interfaces/floor';
import { FloorService } from 'src/app/Services/floor.service';
import { Elevator } from 'src/app/Interfaces/elevator';
import { ElevatorService } from 'src/app/Services/elevator.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-create-elevator',
  templateUrl: './create-elevator.component.html',
  styleUrls: ['./create-elevator.component.css']
})
export class CreateElevatorComponent {

  elevator : Elevator = {};

  menuBuilding = true;

  menuFloors = true;

  menuElevator = true;

  buildings$:Observable<Building[]>;

  floors:Floor[]=[];

  constructor(private buildingService:BuildingService,private floorService:FloorService, private elevatorService:ElevatorService) {
    this.buildings$ = buildingService.getBuildings()
  }

  extractCheckedFloorIds(): void {
    this.elevator.floorsIds=(this.floors.filter((floor)=> floor.isChecked).map((floor)=> floor.id)).filter((value):value is string => typeof value === 'string');
  }

  buildingMenu() {
    if (!!this.elevator.buildingId === false) {
      alert("Error: Failed to create elevator.\nReason: You must select one building.");
    } else {
      this.floorService.getFloors(this.elevator.buildingId).pipe(
        first()
      ).subscribe(firstFloor => {
        this.floors=firstFloor;
      });
      this.menuBuilding = !this.menuBuilding;
      this.menuFloors = !this.menuFloors;
    }
  }

  floorMenu() {
    if (!!this.elevator.floorsIds === false || this.elevator.floorsIds?.length===0) {
      alert("Error: Failed to create elevator.\nReason: You must select at least one floor.");
    } else {
      this.menuFloors = !this.menuFloors;
      this.menuElevator = !this.menuElevator;
    }
  }

  createElevator() {
    if(!!this.elevator.code === false){
      alert("Error: Failed to create elevator.\nReason: You must write a code.");
    } else {
      const elevator1 = this.elevatorService.createElevator(this.elevator as Elevator).subscribe(
        (response) => {
          alert("Success: Elevator created successfully");
        },
        (error) => {
          alert("Error: Failed to create elevator.\nReason: "+error.error.error);
        }
      );
      this.menuElevator = !this.menuElevator;
      this.menuBuilding = !this.menuBuilding;
    }
  }
}
