import { Component } from '@angular/core';
import { Observable, first } from 'rxjs';
import { Building } from 'src/app/Interfaces/building';
import { BuildingConnection } from 'src/app/Interfaces/buildingconnection';
import { Elevator } from 'src/app/Interfaces/elevator';
import { Floor } from 'src/app/Interfaces/floor';
import { BuildingService } from 'src/app/Services/building.service';
import { BuildingConnectionService } from 'src/app/Services/buildingconnection.service';
import { ElevatorService } from 'src/app/Services/elevator.service';
import { FloorService } from 'src/app/Services/floor.service';

@Component({
  selector: 'app-load-flor-map',
  templateUrl: './load-flor-map.component.html',
  styleUrls: ['./load-flor-map.component.css']
})
export class LoadFlorMapComponent {
  floorId?:string;
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
  menuInitial:Boolean=false;
  initialPosition:number[]=[0,0];
  initialDirection:number=0;
  menuRoom:Boolean=false;
  rooms$?:Observable<Room[]>
  buildingConnections$?:Observable<BuildingConnection[]>;

  constructor(private buildingService:BuildingService,private floorService:FloorService,private elevatorService:ElevatorService,private bcService:BuildingConnectionService){
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
    if(!!this.floorId===false){
      alert('');
    }else{
      this.menuFloor=!this.menuFloor;
      this.menuLoadMap=!this.menuLoadMap;
    }
  }

  extractCheckedElevatorIds(){

  }

  toggleElevatorsMenu(){
    this.menuInitial=!this.menuInitial;
    this.menuElevator=!this.menuElevator;
  }

  toggleInitialMenu(){
    this.menuLoadMap=!this.menuLoadMap;
    this.menuInitial=!this.menuInitial;
  }

  toggleBuildingConnectionsMenu(){
    this.menuElevator=!this.menuElevator;
    this.menuBuildingConnection=!this.menuBuildingConnection;
  }

  toggleRoomsMenu(){
    this.menuBuildingConnection=!this.menuBuildingConnection;
    this.menuRoom=!this.menuRoom;
  }

  toggleInitMenu(){
    this.menuRoom=!this.menuRoom;
    this.menuBuilding=!this.menuBuilding;
  }

}
