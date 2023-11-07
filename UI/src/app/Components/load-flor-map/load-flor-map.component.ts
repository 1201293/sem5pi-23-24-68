import { Component } from '@angular/core';
import { Observable, first } from 'rxjs';
import { Building } from 'src/app/Interfaces/building';
import { Elevator } from 'src/app/Interfaces/elevator';
import { Floor } from 'src/app/Interfaces/floor';
import { BuildingService } from 'src/app/Services/building.service';
import { ElevatorService } from 'src/app/Services/elevator.service';
import { FloorService } from 'src/app/Services/floor.service';

@Component({
  selector: 'app-load-flor-map',
  templateUrl: './load-flor-map.component.html',
  styleUrls: ['./load-flor-map.component.css']
})
export class LoadFlorMapComponent {
  floor$:Floor={};
  currentBuilding:Building={};
  buildings$:Observable<Building[]>
  floors$?:Observable<Floor[]>
  width!:number;
  depth!:number;
  menuFloor:Boolean=false;
  menuBuilding:Boolean=false;
  menuBuildingConnection:Boolean=false;
  menuLoadMap:Boolean=false;
  menuElevator:Boolean=false;
  matrix!:number[][];
  elevators$?:Observable<Elevator[]>;

  constructor(private buildingService:BuildingService,private floorService:FloorService,private elevatorService:ElevatorService){
    this.buildings$=buildingService.getBuildings();
  }

  toggleFloorMenu(){
    if(!!this.currentBuilding.id===false){
      alert('');
    }else{
      if(this.currentBuilding.width!=undefined && this.currentBuilding.depth!=undefined){
        this.width=this.currentBuilding.width + 1;
        this.depth=this.currentBuilding.depth + 1;
        this.matrix = new Array(this.depth)
        .fill([])
        .map(() => new Array(this.width).fill(0));
      }
      this.floors$=this.floorService.getFloors(this.currentBuilding.id);
      this.menuBuilding=!this.menuBuilding;
      this.menuFloor=!this.menuFloor;
    }
  }

  toggleLoadMapMenu(){
    if(!!this.currentBuilding.id===false){
      alert('');
    }else{
      this.menuFloor=!this.menuFloor;
      this.menuLoadMap=!this.menuLoadMap;
      this.elevators$=this.elevatorService.getElevators(this.currentBuilding.id);
    }
  }

  extractCheckedElevatorIds(){

  }

  toggleElevatorsMenu(){
    this.menuLoadMap=!this.menuLoadMap;
    this.menuElevator=!this.menuElevator;
    this.floor$.map=this.matrix;
  }

  toggleBuildingConnectionsMenu(){
    
  }

}
