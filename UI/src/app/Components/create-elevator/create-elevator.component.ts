import { Component } from '@angular/core';
import { Observable,first } from 'rxjs';
import { Building } from 'src/app/Interfaces/building';
import { BuildingService } from 'src/app/Services/building.service';
import { Floor } from 'src/app/Interfaces/floor';
import { FloorService } from 'src/app/Services/floor.service';
import { Elevator } from 'src/app/Interfaces/elevator';
import { ElevatorService } from 'src/app/Services/elevator.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-create-elevator',
  templateUrl: './create-elevator.component.html',
  styleUrls: ['./create-elevator.component.css']
})
export class CreateElevatorComponent {
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;

  isLinear=true;

  elevator:Elevator ={};

  buildings!:Building[];
  floors!:Floors[];
  

  constructor(private buildingService:BuildingService,private floorService:FloorService,private elevatorService:ElevatorService,private _snackBar:MatSnackBar,private _formBuilder: FormBuilder){}

  ngOnInit() {
    this.getBuildings();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required],
      fourthCtrl: ['', Validators.required],
      fifthCtrl: ['', Validators.required],
      sixthCtrl: ['', Validators.required],
      seventhCtrl: ['', Validators.required]
    })
  }

  getBuildings(){
    this.buildingService.getBuildings().subscribe(buildings => this.buildings=buildings);
  }

  getFloors() {
    this.floorService.getFloors(this.firstFormGroup.get("firstCtrl")?.value).subscribe(floors => this.floors=floors);
  }

  createElevator() {
    this.elevator.buildingId=this.firstFormGroup.get("firstCtrl")?.value;
    this.elevator.floorsIds=this.firstFormGroup.get("secondCtrl")?.value;
    this.elevator.code=this.firstFormGroup.get("thirdCtrl")?.value;
    this.elevator.brand=this.firstFormGroup.get("fourthCtrl")?.value;
    this.elevator.model=this.firstFormGroup.get("fifthCtrl")?.value;
    this.elevator.serialNumber=this.firstFormGroup.get("sixthCtrl")?.value;
    this.elevator.description=this.secondFormGroup.get("seventhCtrl")?.value;
    this.elevatorService.createElevator(this.elevator as Elevator).pipe(
      catchError(error => {
        this._snackBar.open("Couldn't create the elevator!\n Reason: " + error.error.error,'Close',{duration:3000});
        return of();
      }),
      tap(result =>{
        this._snackBar.open("Elevator created successfully!",'Close',{duration:3000});
      })
    ).subscribe();
  }
}
