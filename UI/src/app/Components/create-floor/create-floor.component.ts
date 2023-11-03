import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Building } from 'src/app/Interfaces/building';
import { BuildingService } from 'src/app/Services/building.service';
import { Floor } from 'src/app/Interfaces/floor';
import { FloorService } from 'src/app/Services/floor.service';

@Component({
  selector: 'app-create-floor',
  templateUrl: './create-floor.component.html',
  styleUrls: ['./create-floor.component.css']
})
export class CreateFloorComponent {

  floor ={
    buildingId: '',
    number: 0,
    description: ''
  };

  buildings$:Observable<Building[]>;

  constructor(private buildingService:BuildingService,private floorService:FloorService){this.buildings$=buildingService.getBuildings()}

  createFloor() {
    if(!!this.floor.buildingId === false){
      alert("Error: Failed to create floor.\nReason: You must select one building.");
    }else if(!!this.floor.description === false){
      alert("Error: Failed to create floor.\nReason: You must write a description.");
    }else{
      const floor1=this.floorService.createFloor(this.floor as Floor).subscribe(
        (response) => {
          alert("Success: Floor created successfully");
        },
        (error) => {
          alert("Error: Failed to create floor.\nReason: "+error.error.error);
        }
      );
    }
  }

  
}
