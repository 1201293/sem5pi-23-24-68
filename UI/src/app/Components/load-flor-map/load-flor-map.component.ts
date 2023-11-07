import { Component } from '@angular/core';
import { Observable, first } from 'rxjs';
import { Building } from 'src/app/Interfaces/building';
import { Floor } from 'src/app/Interfaces/floor';
import { BuildingService } from 'src/app/Services/building.service';
import { FloorService } from 'src/app/Services/floor.service';

@Component({
  selector: 'app-load-flor-map',
  templateUrl: './load-flor-map.component.html',
  styleUrls: ['./load-flor-map.component.css']
})
export class LoadFlorMapComponent {
  currentFloor:Floor={};
  currentBuilding:any;
  buildingId?:string;
  buildings$:Observable<Building[]>
  floors$?:Observable<Floor[]>
  menuFloor:Boolean=false;
  menuBuilding:Boolean=false;
  building:Building={};

  constructor(private buildingService:BuildingService,private floorService:FloorService){
    this.buildings$=buildingService.getBuildings();
  }

  

  toggleFloorMenu(){
    console.log(this.currentBuilding);
    if(!!this.currentBuilding.id===false){
      alert('');
    }else{
      this.floors$=this.floorService.getFloors(this.buildingId);
      this.menuBuilding=!this.menuBuilding;
      this.menuFloor=!this.menuFloor;
    }
  }

}
