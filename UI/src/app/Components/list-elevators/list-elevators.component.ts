import { Component } from '@angular/core';
import { Observable, isEmpty,first,elementAt } from 'rxjs';
import { Floor } from 'src/app/Interfaces/floor';
import { Building } from 'src/app/Interfaces/building';
import { BuildingService } from 'src/app/Services/building.service';
import { FloorService } from 'src/app/Services/floor.service';
import { Elevator } from 'src/app/Interfaces/elevator';
import { ElevatorService } from 'src/app/Services/elevator.service';

@Component({
  selector: 'app-list-elevators',
  templateUrl: './list-elevators.component.html',
  styleUrls: ['./list-elevators.component.css']
})
export class ListElevatorsComponent {
  buildingId?:string;
  floorId?:string;
  buildings$:Observable<Building[]>;
  floors$:Observable<Floor[]>;
  elevators:Elevator[]=[];
  size:number=0;
  index:number=0;
  menuBuilding:Boolean=false;
  menuInfo:Boolean=false;
  currentElevator?:Elevator;

  constructor(private buildingService:BuildingService,private floorService:FloorService,private elevatorService:ElevatorService){
    this.buildings$=buildingService.getBuildings();
  }

  toggleInfo(){
    if(this.buildingId===undefined){
      alert("Error: Failed to list elevators.\nReason: You must select one building.");
      this.menuInfo=false;
      this.menuBuilding=false;
    }else{
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
