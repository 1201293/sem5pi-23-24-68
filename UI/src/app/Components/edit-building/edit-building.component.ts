import { Component } from "@angular/core";
import { response } from "express";
import { Observable, first } from "rxjs";
import { Building } from "src/app/Interfaces/building";
import { BuildingService } from "src/app/Services/building.service";

@Component({
    selector: 'app-edit-building',
    templateUrl: './edit-building.component.html',
    styleUrls: ['./edit-building.component.css']

})
export class EditBuildingComponent {
    building: Building = {};
    buildings$: Observable<Building[]>;
    menuBuilding:Boolean=false;
    menuElevator:Boolean=false;
    menuEditBuilding:Boolean=false;
    menuEditFloors:Boolean=false;
    menuEdit:Boolean=false;

    constructor(private buildingService: BuildingService) {
        this.buildings$ = buildingService.getBuildings();
    }

    toggleBuilding() {
        if(this.building.id===undefined){
            alert("Error: Failed to edit building.\nReason: You must select one building.");
            this.menuBuilding=false;
            this.menuEditBuilding=false;
        } else {
            this.menuBuilding=!this.menuBuilding;
            this.menuEditBuilding=!this.menuEditBuilding;
        }
    }

    toggleEdit() {
        if(this.building.id===undefined){
            alert("Error: Failed to edit building.\nReason: You must select one building.");
            this.menuBuilding=true;
            this.menuEditBuilding=false;
        } else {
            this.menuBuilding=!this.menuBuilding;
            this.menuEditBuilding=!this.menuEditBuilding;
        }
    }

    editBuilding() {
        console.log(this.building);
        this.buildingService.updateBuilding(this.building as Building).subscribe(
            (response) => {
                alert("Success: Building updated successfully.");
            },
            (error) => {
                alert("Error: Failed to update building.\nReason: " + error.error.error);
            });
        }
        
    }

