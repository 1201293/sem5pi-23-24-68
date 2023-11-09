import { Component } from '@angular/core';
import { Observable, first } from 'rxjs';
import { Building } from 'src/app/Interfaces/building';
import { BuildingService } from 'src/app/Services/building.service';

@Component({
  selector: 'app-list-buildings',
  templateUrl: './list-buildings.component.html',
  styleUrls: ['./list-buildings.component.css']
})
export class ListBuildingsComponent {

  building$:Observable<Building[]>;
  size:number=0;
  index:number=0;
  menuInfo:Boolean=false;
  menuBuilding:Boolean=false;
  currentBuilding?:Building;

  constructor(private buildingService:BuildingService){
    this.building$=buildingService.getBuildings();
  }

  toggleInfo(){
    
  }

}
