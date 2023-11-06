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

  elevator ={
    buildingId: '',
    floorsId: [],
    code: '',
    brand: '',
    model: '',
    serialNumber: '',
    description: ''
  };

  buildings$:Observable<Building[]>;

  floors$:Observable<Floor[]>;

  constructor(private buildingService:BuildingService,private floorService:FloorService, private elevatorService:ElevatorService){this.buildings$=buildingService.getBuildings(), this.floors$=floorService.getFloors(this.buildings$)}

  createElevator() {
    if(!!this.elevator.buildingId === false){
      alert("Error: Failed to create elevator.\nReason: You must select one building.");
    }else if(!!this.elevator.floorsId === null){
        alert("Error: Failed to create elevator.\nReason: You must select one floor.");
    }else if(!!this.elevator.description === false){
      alert("Error: Failed to create elevator.\nReason: You must write a description.");
    }else{
      const elevator1=this.elevatorService.createElevator(this.elevator as Elevator).subscribe(
        (response) => {
          alert("Success: Elevator created successfully");
        },
        (error) => {
          alert("Error: Failed to create elevator.\nReason: "+error.error.error);
        }
      );
    }
  }

  
}
