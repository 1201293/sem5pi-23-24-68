import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BuildingConnection } from 'src/app/Interfaces/buildingconnection';
import { BuildingConnectionService } from 'src/app/Services/buildingconnection.service';
import { Floor } from 'src/app/Interfaces/floor';
import { FloorService } from 'src/app/Services/floor.service';

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

  floors$:Observable<Floor[]>;

  constructor(private floorService:FloorService,private buildingconnectionService:BuildingConnectionService){this.floors$=floorService.getFloors()}

  createBuildingConnection() {
    if(!!this.buildingconnection.floor1Id === false){
      alert("Error: Failed to create building connection.\nReason: You must select one floor.");
    }else if(!!this.buildingconnection.floor2Id === false){
      alert("Error: Failed to create building connection.\nReason: You must select one floor.");
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
