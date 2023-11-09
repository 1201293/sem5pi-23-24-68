import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Building } from 'src/app/Interfaces/building';
import { Elevator } from 'src/app/Interfaces/elevator';
import { Floor } from 'src/app/Interfaces/floor';
import { BuildingService } from 'src/app/Services/building.service';
import { ElevatorService } from 'src/app/Services/elevator.service';
import { FloorService } from 'src/app/Services/floor.service';

@Component({
  selector: 'app-list-elevator',
  templateUrl: './list-elevator.component.html',
  styleUrls: ['./list-elevator.component.css']
})
export class ListElevatorComponent {
  firstFormGroup!:FormGroup;
  isLinear=true;
  buildingId?:string;
  elevators?:Elevator[];
  buildings!:Building[];
  floors!:Floor[];

  constructor(private buildingService:BuildingService,private floorService:FloorService,private elevatorService:ElevatorService,private _formBuilder:FormBuilder){}

  ngOnInit() {
    this.getBuildings();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: [null, Validators.required],
    });
  }

  getBuildings(){
    this.buildingService.getBuildings().subscribe(buildings => this.buildings=buildings);
  }

  getElevators(){
    this.buildingId=this.firstFormGroup.get("firstCtrl")?.value;
    if(!!this.buildingId === false){
      this.elevators=undefined;
    }else{
      this.elevatorService.getElevators(this.buildingId).subscribe(elevators => this.elevators=elevators);
    }
  }

  reset(){
    this.elevators=undefined;
  }
}
