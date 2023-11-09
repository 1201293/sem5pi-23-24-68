import { Component } from '@angular/core';
import { Observable, first } from 'rxjs';
import { Room } from 'src/app/Interfaces/room';
import { RoomService } from 'src/app/Services/room.service';
import { Floor } from 'src/app/Interfaces/floor';
import { FloorService } from 'src/app/Services/floor.service';
import { Building } from 'src/app/Interfaces/building';
import { BuildingService } from 'src/app/Services/building.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent {

  room ={
    floorId: '',
    name: '',
    category: '',
    description: ''
  };

  floors$?:Observable<Floor[]>;
  buildings$:Observable<Building[]>;
  buildingId?:string;
  menuBuilding:Boolean=false;
  menuRoom:Boolean=false;

  constructor(private buildingService:BuildingService,private roomService:RoomService, private floorService:FloorService){this.buildings$=buildingService.getBuildings()}

  loadFloors(){
    if(this.buildingId === undefined){
      alert("Error: Failed to create elevator.\nReason: You must select one building.");
      this.menuBuilding = false;
      this.menuRoom = false;
    }
    else{
      this.floors$ = this.floorService.getFloors(this.buildingId);
    }
  }

  toggleBoth(){
    this.menuBuilding = !this.menuBuilding;
    this.menuRoom = !this.menuRoom;
  }

  createRoom() {
    if(!!this.room.floorId === false){
      alert("Error: Failed to create room.\nReason: You must select one floor.");
    }else if(!!this.room.name === false){
      alert("Error: Failed to create room.\nReason: You must write a name.");
    }else if(!!this.room.category === false){
      alert("Error: Failed to create room.\nReason: You must write a category.");
    }else if(!!this.room.description === false){
      alert("Error: Failed to create room.\nReason: You must write a description.");
    }else{
      const room1=this.roomService.createRoom(this.room as Room).subscribe(
        (response) => {
          alert("Success: Room created successfully");
        },
        (error) => {
          alert("Error: Failed to create Room.\nReason: "+error.error.error);
        }
      );
    }
  }

  
}
