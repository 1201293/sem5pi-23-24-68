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

  floor:Floor={}
  buildingId?:string;
  floors$?:Observable<Floor[]>;
  menuBuilding:Boolean=false;
  menuFloor:Boolean=false;
  menuEdit:Boolean=false;

  buildings$:Observable<Building[]>;

  constructor(private buildingService:BuildingService,private floorService:FloorService){this.buildings$=buildingService.getBuildings()
  }

  toggleFloor(){
    if(this.buildingId===undefined){
      alert("Error: Failed to edit floors.\nReason: You must select one building.");
      this.menuBuilding=false;
      this.menuFloor=false;
    }else{
      this.menuBuilding=!this.menuBuilding;
      this.menuFloor=!this.menuFloor;
      this.floors$=this.floorService.getFloors(this.buildingId);
    }
  }

  toggleEdit(){
    if(this.floor.id===undefined){
      alert("Error: Failed to edit floors.\nReason: You must select one floor.");
      this.menuFloor=true;
      this.menuEdit=false;
    }else{
      this.menuFloor=!this.menuFloor;
      this.menuEdit=!this.menuEdit;
    }
  }

  editFloor() {
    if(this.floor.buildingId!=undefined && this.floor.number!=undefined && this.floor.description!=undefined ){
      this.floorService.updateAllFloor(this.floor as Floor).subscribe();
    }else{
      this.floorService.updateFloor(this.floor as Floor).subscribe();
    }
    this.menuEdit=!this.menuEdit;
    this.menuBuilding=!this.menuBuilding;
    this.floor={}
    
  }

}
