import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title="UI";
  menuFloors:boolean=false;
  menuBuildings:boolean=false;
  menuBuildingConnections:boolean=false;
  menuElevators:boolean=false;
  menuRooms:boolean=false;

  toggleMenuFloors(){
    this.menuFloors=!this.menuFloors;
  }
  toggleMenuBuildings(){
    this.menuBuildings=!this.menuBuildings;
  }
  toggleMenuBuildingConnections(){
    this.menuBuildingConnections=!this.menuBuildingConnections;
  }

  toggleMenuElevators(){
    this.menuElevators=!this.menuElevators;
  }
  toggleMenuRooms(){
    this.menuRooms=!this.menuRooms;
  }
}
