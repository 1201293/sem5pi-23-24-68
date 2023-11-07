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
  floors:Floor[]=[];
  buildingId?:string;
  menuBuilding:Boolean=false;
  menuElevator:Boolean=false;
  menuEditBuilding:Boolean=false;
  menuEdit:Boolean=false;

  buildings$:Observable<Building[]>;

  constructor(private buildingService:BuildingService,private floorService:FloorService,private elevatorService:ElevatorService) {
    this.buildings$=buildingService.getBuildings()
  }

  toggleElevator(){
    if(this.buildingId===undefined){
      alert("Error: Failed to edit elevator.\nReason: You must select one building.");
      this.menuBuilding=false;
      this.menuElevator=false;
    }else{
      this.menuBuilding=!this.menuBuilding;
      this.menuElevator=!this.menuElevator;
      this.floors=this.floorService.getFloors(this.buildingId);
      this.elevator=this.elevatorService.getElevators(this.buildingId);
    }
  }

  toggleEdit(){
    if(this.elevator.id===undefined){
      alert("Error: Failed to edit elevator.\nReason: You must select one elevator.");
      this.menuElevator=true;
      this.menuEditBuilding=false;
    }else{
      this.menuElevator=!this.menuElevator;
      this.menuEditBuilding=!this.menuEditBuilding;
    }
  }

  editBuilding() {
    
  }

  editFloor() {
    if(this.floor.buildingId!=undefined && this.floor.number!=undefined && this.floor.description!=undefined ){
      this.floorService.updateAllFloor(this.floor as Floor).subscribe();
    }else{
      this.floorService.updateFloor(this.floor as Floor).subscribe();
    }
    this.menuEdit=!this.menuEdit;
    this.menuBuilding=!this.menuBuilding;
    this.floor={}
  }
}
