import { Component, OnInit } from '@angular/core';
import { Observable, isEmpty,first,elementAt } from 'rxjs';
import { Floor } from 'src/app/Interfaces/floor';
import { Building } from 'src/app/Interfaces/building';
import { BuildingService } from 'src/app/Services/building.service';
import { FloorService } from 'src/app/Services/floor.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-floors-with-connections',
  templateUrl: './list-floors-with-connections.component.html',
  styleUrls: ['./list-floors-with-connections.component.css']
})
export class ListFloorsWithConnectionsComponent implements OnInit{

  firstFormGroup!:FormGroup;
  isLinear=true;
  buildingId?:string;
  floors?:Floor[];
  buildings!:Building[];

  constructor(private buildingService:BuildingService,private floorService:FloorService,private _formBuilder: FormBuilder ){
    
  }

  ngOnInit() {
    this.getBuildings();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: [null, Validators.required],
    });
  }

  getBuildings(){
    this.buildingService.getBuildings().subscribe(buildings => this.buildings=buildings);
  }

  getFloors(){
    this.buildingId=this.firstFormGroup.get("firstCtrl")?.value;
    if(!!this.buildingId === false){
      this.floors=undefined;
    }else{
      this.floorService.getFloorsWithConnections(this.buildingId).subscribe(floors => this.floors=floors);
    }
  }

  reset(){
    this.floors=undefined;
  }
}
