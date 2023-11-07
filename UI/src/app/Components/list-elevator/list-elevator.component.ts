import { Component } from '@angular/core';
import { Observable, First } from 'rxjs';
import { Building } from 'src/app/Interfaces/building';
import { Elevator } from 'src/app/Interfaces/elevator';
import { Floor } from 'src/app/Interfaces/floor';
import { BuildingService } from 'src/app/Services/building.service';
import { ElevatorService } from 'src/app/Services/elevator.service';
import { FloorService } from 'src/app/Services/floor.service';

@Component({
  selector: 'app-list-elevator',
  templateUrl: './list-elevator.component.html',
  styleUrls: ['./list-elevator.component.css']
})
export class ListElevatorComponent {
  buildingId?:string;
  floors:Floor[]=[];
  elevators:Elevator[]=[];
  floorsNumber:(number|undefined)[]=[];
  buildings$:Observable<Building[]>;
  size:number=0;
  index:number=0;
  menuBuilding:Boolean=false;
  menuInfo:Boolean=false;
  currentElevator?:Elevator;

  constructor(private buildingService:BuildingService, private floorService:FloorService, private elevatorService:ElevatorService){
    this.buildings$=buildingService.getBuildings();
  }

  toggleInfo(){
    if(this.buildingId===undefined){
      alert("Error: Failed to list elevators.\nReason: You must select one building.");
      this.menuInfo=false;
      this.menuBuilding=false;
    }else{
      this.floors = this.floorService.getFloors(this.buildingId);
      if (this.currentElevator && this.currentElevator.floorsIds) {
        for (let i = 0; i < this.floors.length; i++) {
          for (let j = 0; j < this.currentElevator.floorsIds.length; j++) {
            if  (this.currentElevator.floorsIds[j] == this.floors[i].id) {
              this.floorsNumber[i] = this.floors[i].number;
            }
          }
        }
      }
      this.elevatorService.getElevators(this.buildingId).pipe(
        first()
      ).subscribe(firstElevator => {
        this.elevators=firstElevator;
        this.currentElevator=firstElevator[0];
        this.size=firstElevator.length;
      }
     );
    }
  }

  toggleBoth(){
    this.menuBuilding=!this.menuBuilding;
    this.menuInfo=!this.menuInfo;
  }


  changeElevatorInfo(value:number){
      if(this.index==0 && value==-1){
        this.index=this.size -1;
        this.currentElevator=this.elevators[this.index];
      }else if(value==1 && this.index+1 >= this.size){
        this.index=0;
        this.currentElevator=this.elevators[this.index];
      }else if(value==1){
        this.index++;
        this.currentElevator=this.elevators[this.index];
      }else{
        this.index--;
        this.currentElevator=this.elevators[this.index];
      }
  }
}
