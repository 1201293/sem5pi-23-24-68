import { Component } from '@angular/core';
import { Observable, first } from 'rxjs';
import { Building } from 'src/app/Interfaces/building';
import { Elevator } from 'src/app/Interfaces/elevator';
import { Floor } from 'src/app/Interfaces/floor';
import { BuildingService } from 'src/app/Services/building.service';
import { ElevatorService } from 'src/app/Services/elevator.service';
import { FloorService } from 'src/app/Services/floor.service';

@Component({
  selector: 'app-edit-elevator',
  templateUrl: './edit-elevator.component.html',
  styleUrls: ['./edit-elevator.component.css']
})
export class EditElevatorComponent {
  elevator:Elevator={};
  elevators$?:Observable<Elevator[]>;
  floors:Floor[]=[];
  floor!:Floor;
  buildingId?:string;
  menuBuilding:Boolean=false;
  menuElevator:Boolean=false;
  menuEditFloors:Boolean=false;
  menuEdit:Boolean=false;

  buildings$:Observable<Building[]>;

  constructor(private buildingService:BuildingService,private floorService:FloorService,private elevatorService:ElevatorService) {
    this.buildings$=buildingService.getBuildings()
  }

  toggleElevator() {
    if(this.buildingId===undefined){
      alert("Error: Failed to edit elevator.\nReason: You must select one building.");
      this.menuBuilding=false;
      this.menuElevator=false;
    }else{
      this.menuBuilding=!this.menuBuilding;
      this.menuElevator=!this.menuElevator;
      this.elevators$ = this.elevatorService.getElevators(this.buildingId);
      this.floorService.getFloors(this.buildingId).pipe(first()).subscribe(firstFloor => {
        this.floors = firstFloor;
      });
    }
  }

  toggleEdit() {
    if(this.elevator.id===undefined){
      alert("Error: Failed to edit elevator.\nReason: You must select one elevator.");
      this.menuElevator=true;
      this.menuEditFloors=false;
    }else{
      this.menuElevator=!this.menuElevator;
      this.menuEditFloors=!this.menuEditFloors;
    }
  }

  editFloors() {
    this.menuEditFloors = !this.menuEditFloors;
    this.menuEdit = !this.menuEdit;
  }

  extractCheckedFloorIds(): void {
    console.log(this.elevator);
    if (this.floors.some((floor)=> floor.isChecked)) {
      this.elevator.floorsIds=(this.floors.filter((floor)=> floor.isChecked).map((floor)=> floor.id)).filter((value):value is string => typeof value === 'string');
    }
    console.log(this.elevator);
  }

  editElevator() {
    console.log(this.elevator);
    if(this.elevator.buildingId!=undefined && this.elevator.floorsIds?.length!=0 && this.elevator.code!=undefined && this.elevator.brand!=undefined && this.elevator.model!=undefined && this.elevator.serialNumber!=undefined && this.elevator.description!=undefined ){
      this.elevatorService.updateAllElevator(this.elevator as Elevator).subscribe(
        (response) => {
          alert("Success: Elevator edited successfully");
        },
        (error) => {
          alert("Error: Failed to edit elevator.\nReason: "+error.error.error);
        }
      );
    }else{
      this.elevatorService.updateElevator(this.elevator as Elevator).subscribe(
        (response) => {
          alert("Success: Elevator edited successfully");
        },
        (error) => {
          alert("Error: Failed to edit elevator.\nReason: "+error.error.error);
        }
      );
    }
    this.menuEdit=!this.menuEdit;
    this.menuBuilding=!this.menuBuilding;
    this.elevator={};
  }
}
