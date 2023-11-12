import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { response } from "express";
import { Observable,of,catchError,tap } from 'rxjs';
import { Building } from "src/app/Interfaces/building";
import { BuildingService } from "src/app/Services/building.service";

@Component({
    selector: 'app-edit-building',
    templateUrl: './edit-building.component.html',
    styleUrls: ['./edit-building.component.css']

})
export class EditBuildingComponent {

    building!:Building;
    buildings?:Building[];
    firstFormGroup!: FormGroup;
    secondFormGroup!: FormGroup;

    constructor(private buildingService:BuildingService, private _formBuilder:FormBuilder, private _snackBar:MatSnackBar) {}

    ngOnInit(){
        this.getBuildings;
        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: [null, Validators.required],
        });
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required],
            thirdCtrl: ['', Validators.required],
            forthCtrl: ['', Validators.required],
        })
        
    }

    getBuildings(){
        this.buildingService.getBuildings().subscribe(buildings => this.buildings=buildings);
    }


    editBuilding(){
        
       
    }

}

