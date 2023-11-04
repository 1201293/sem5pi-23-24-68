import { Component } from '@angular/core';
import { Observable, isEmpty,first,elementAt } from 'rxjs';
import { Floor } from 'src/app/Interfaces/floor';
import { Building } from 'src/app/Interfaces/building';
import { BuildingService } from 'src/app/Services/building.service';
import { FloorService } from 'src/app/Services/floor.service';

@Component({
  selector: 'app-list-floors-with-connections',
  templateUrl: './list-floors-with-connections.component.html',
  styleUrls: ['./list-floors-with-connections.component.css']
})
export class ListFloorsWithConnectionsComponent {
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
      this.floorService.getFloorsWithConnections(this.buildingId).pipe(
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
