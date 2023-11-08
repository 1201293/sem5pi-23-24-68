import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { Building } from "src/app/Interfaces/building";
import { BuildingService } from "src/app/Services/building.service";

@Component({
    selector: 'app-create-building',
    templateUrl: './create-building.component.html',
    styleUrls: ['./create-building.component.css']
})
export class CreateBuildingComponent {
    
    building ={
        name : '',
        code : '',
        description : '',
        width : 0,
        depth : 0
    }

    constructor(private buildingService:BuildingService){}

    createBuilding() {
        if(!!this.building.name === false){
            alert("Error: Failed to create building.\nReason: You must write a name.");
        }else if(!!this.building.code === false){
            alert("Error: Failed to create building.\nReason: You must write a code.");
        }else if(!!this.building.description === false){
            alert("Error: Failed to create building.\nReason: You must write a description.");
        }else if(this.building.width <= 0){
            alert("Error: Failed to create building.\nReason: Width must be greater than 0."); 
        }else if(this.building.depth <= 0){
            alert("Error: Failed to create building.\nReason: Depth must be greater than 0.");
        }
        else{
            const building1=this.buildingService.createBuilding(this.building as Building).subscribe(
                (response) => {
                    alert("Success: Building created successfully");
                },
                (error) => {
                    alert("Error: Failed to create building.\nReason: "+error.error.error);
                }
            );
        }
    }
}