import { Component } from '@angular/core';
import { Observable, first } from 'rxjs';
import { BuildingConnection } from 'src/app/Interfaces/buildingconnection';
import { BuildingConnectionService } from 'src/app/Services/buildingconnection.service';
import { Floor } from 'src/app/Interfaces/floor';
import { FloorService } from 'src/app/Services/floor.service';
import { Building } from 'src/app/Interfaces/building';
import { BuildingService } from 'src/app/Services/building.service';

@Component({
  selector: 'app-create-building-connection',
  templateUrl: './create-building-connection.component.html',
  styleUrls: ['./create-building-connection.component.css']
})
export class CreateBuildingConnectionComponent {

  buildingconnection ={
    floor1Id: '',
    floor2Id: '',
  };

  floors1$?:Observable<Floor[]>;
  floors2$?:Observable<Floor[]>;
  buildings$:Observable<Building[]>;
  buildingId1?:string;
  buildingId2?:string;
  menuBuilding:Boolean=false;
  menuFloors:Boolean=false;

  constructor(private buildingService:BuildingService,private buildingconnectionService:BuildingConnectionService, private floorService:FloorService){this.buildings$=buildingService.getBuildings()}

  loadFloors(){
    if(this.buildingId1 === undefined || this.buildingId2 === undefined || (this.buildingId1 === this.buildingId2)){
      alert("Error: The buildings selected are invalid or the same building was introduced on both boxes.");
      this.menuBuilding = false;
      this.menuFloors = false;
    }
    else{
      this.floors1$ = this.floorService.getFloors(this.buildingId1);
      console.log(this.floors1$)
      this.floors2$ = this.floorService.getFloors(this.buildingId2);
    }
  }

  toggleBoth(){
    this.menuBuilding = !this.menuBuilding;
    this.menuFloors = !this.menuFloors;
  }

  createBuildingConnection() {
    if(!!this.buildingconnection.floor1Id === false){
      alert("Error: Failed to create building connection.\nReason: You must select the floor number 1.");
    }else if(!!this.buildingconnection.floor2Id === false){
      alert("Error: Failed to create building connection.\nReason: You must select the floor number 2.");
    }else{
      const buildingconnection1=this.buildingconnectionService.createBuildingConnection(this.buildingconnection as BuildingConnection).subscribe(
        (response) => {
          alert("Success: Building Connection created successfully");
        },
        (error) => {
          alert("Error: Failed to create Building Connection.\nReason: "+error.error.error);
        }
      );
    }
  }

  
}
