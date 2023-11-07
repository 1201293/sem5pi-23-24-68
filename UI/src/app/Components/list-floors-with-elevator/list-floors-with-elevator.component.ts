import { Component } from '@angular/core';
import { Observable, first } from 'rxjs';
import { Building } from 'src/app/Interfaces/building';
import { Floor } from 'src/app/Interfaces/floor';
import { BuildingService } from 'src/app/Services/building.service';
import { FloorService } from 'src/app/Services/floor.service';

@Component({
  selector: 'app-list-floors-with-elevator',
  templateUrl: './list-floors-with-elevator.component.html',
  styleUrls: ['./list-floors-with-elevator.component.css']
})
export class ListFloorsWithElevatorComponent {
  buildingId?:string;
  floors:Floor[]=[];
  buildings$:Observable<Building[]>;
  size:number=0;
  index:number=0;
  menuBuilding:Boolean=false;
  menuInfo:Boolean=false;
  currentFloor?:Floor;

  constructor(private buildingService:BuildingService,private floorService:FloorService){
    this.buildings$=buildingService.getBuildings();
  }

  toggleInfo(){
    if(this.buildingId===undefined){
      alert("Error: Failed to list floors.\nReason: You must select one building.");
      this.menuInfo=false;
      this.menuBuilding=false;
    }else{
      this.floorService.getFloors(this.buildingId).pipe(
        first()
      ).subscribe(firstFloor => {
        this.floors=firstFloor;
        this.currentFloor=firstFloor[0];
        this.size=firstFloor.length;
      }
     );
    }
  }

  toggleBoth(){
    this.menuBuilding=!this.menuBuilding;
    this.menuInfo=!this.menuInfo;
  }


  changeFloorInfo(value:number){
      if(this.index==0 && value==-1){
        this.index=this.size -1;
        this.currentFloor=this.floors[this.index];
      }else if(value==1 && this.index+1 >= this.size){
        this.index=0;
        this.currentFloor=this.floors[this.index];
      }else if(value==1){
        this.index++;
        this.currentFloor=this.floors[this.index];
      }else{
        this.index--;
        this.currentFloor=this.floors[this.index];
      }
  }
}
