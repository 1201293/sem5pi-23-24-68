import { Component } from '@angular/core';
import { Observable, isEmpty,first,elementAt } from 'rxjs';
import { Building } from 'src/app/Interfaces/building';
import { BuildingService } from 'src/app/Services/building.service';
import { BuildingConnection } from 'src/app/Interfaces/buildingconnection';
import { BuildingConnectionService } from 'src/app/Services/buildingconnection.service';

@Component({
    selector: 'app-list-building-connections',
    templateUrl: './list-building-connections.component.html',
    styleUrls: ['./list-building-connections.component.css']
})
export class ListBuildingConnectionsComponent {
    buildingconnections:BuildingConnection[]=[];
    buildings$:Observable<Building[]>;
    buildingId1?:string;
    buildingId2?:string;
    index:number=0;
    size:number=0;
    menuBuildings:Boolean=false;
    menuInfo:Boolean=false;
    currentBuildingConnection?:BuildingConnection;
  
    constructor(private buildingService:BuildingService,private buildingconnectionService:BuildingConnectionService){this.buildings$=buildingService.getBuildings()}
  
    toggleInfo(){
        if(this.buildingId1 === undefined || this.buildingId2 === undefined || (this.buildingId1 === this.buildingId2)){
            alert("Error: The buildings selected are invalid or the same building was introduced on both boxes.");
            this.menuBuildings = false;
            this.menuInfo = false;
        }
        else{
        this.buildingconnectionService.getBuildingConnections(this.buildingId1, this.buildingId2).pipe(
          first()
        ).subscribe(firstBuildingConnection => {
          this.buildingconnections=firstBuildingConnection;
          this.currentBuildingConnection=firstBuildingConnection[0];
          this.size=firstBuildingConnection.length;
        }
       );
      }
    }
  
    toggleBoth(){
      this.menuBuildings=!this.menuBuildings;
      this.menuInfo=!this.menuInfo;
    }
  
  
    changeBuildingConnectionInfo(value:number){
        if(this.index==0 && value==-1){
          this.index=this.size -1;
          this.currentBuildingConnection=this.buildingconnections[this.index];
        }else if(value==1 && this.index+1 >= this.size){
          this.index=0;
          this.currentBuildingConnection=this.buildingconnections[this.index];
        }else if(value==1){
          this.index++;
          this.currentBuildingConnection=this.buildingconnections[this.index];
        }else{
          this.index--;
          this.currentBuildingConnection=this.buildingconnections[this.index];
        }
    }
  }