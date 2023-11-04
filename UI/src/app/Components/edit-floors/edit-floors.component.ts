import { Component } from '@angular/core';
import { Observable,first } from 'rxjs';
import { Building } from 'src/app/Interfaces/building';
import { BuildingService } from 'src/app/Services/building.service';
import { Floor } from 'src/app/Interfaces/floor';
import { FloorService } from 'src/app/Services/floor.service';

@Component({
  selector: 'app-edit-floors',
  templateUrl: './edit-floors.component.html',
  styleUrls: ['./edit-floors.component.css']
})
export class EditFloorsComponent {
  floor ={
    buildingId: '',
    number: 0,
    description: ''
  };
  currentFloor?:Floor;
  buildingId?:string;
  floors$?:Observable<Floor[]>;
  menuBuilding:Boolean=false;
  menuInfo:Boolean=false;

  buildings$:Observable<Building[]>;

  constructor(private buildingService:BuildingService,private floorService:FloorService){this.buildings$=buildingService.getBuildings()
  }

  toggleBoth(){
    this.menuBuilding=!this.menuBuilding;
    this.menuInfo=!this.menuInfo;
  }

  toggleInfo(){
    if(this.buildingId===undefined){
      alert("Error: Failed to list floors.\nReason: You must select one building.");
      this.menuInfo=false;
      this.menuBuilding=false;
    }else{
      this.floors$=this.floorService.getFloors(this.buildingId);
    }
  }

  editFloor() {
    
  }

}
