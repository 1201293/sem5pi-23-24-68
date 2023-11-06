import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Building } from 'src/app/Interfaces/building';
import { BuildingService } from 'src/app/Services/building.service';
import { Floor } from 'src/app/Interfaces/floor';
import { FloorService } from 'src/app/Services/floor.service';
import { Elevator } from 'src/app/Interfaces/elevator';
import { ElevatorService } from 'src/app/Services/elevator.service';

@Component({
  selector: 'app-create-elevator',
  templateUrl: './create-elevator.component.html',
  styleUrls: ['./create-elevator.component.css']
})
export class CreateElevatorComponent {

  elevator : Elevator = {};

  floorsId = [];

  menuBuilding = true;

  menuFloors = true;

  menuElevator = true;

  buildings$:Observable<Building[]>;

  floors$:Observable<Floor[]>;

  constructor(private buildingService:BuildingService,private floorService:FloorService, private elevatorService:ElevatorService) {
    this.buildings$ = buildingService.getBuildings()
  }

  buildingMenu() {
    if (!!this.elevator.buildingId === false) {
      alert("Error: Failed to create elevator.\nReason: You must select one building.");
    } else {
      this.floors$ = this.floorService.getFloors(this.elevator.buildingId);
      this.menuBuilding = !this.menuBuilding;
      this.menuFloors = !this.menuFloors;
    }
  }

  floorMenu() {
    if (this.floorsId.length === 0) {
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
