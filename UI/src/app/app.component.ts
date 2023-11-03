import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  menuFloors:boolean=false;
  menuBuildings:boolean=false;

  toggleMenuFloors(){
    this.menuFloors=!this.menuFloors;
  }
  toggleMenuBuildings(){
    this.menuBuildings=!this.menuBuildings;
  }
}
