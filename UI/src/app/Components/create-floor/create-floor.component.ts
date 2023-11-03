import { Component } from '@angular/core';

@Component({
  selector: 'app-create-floor',
  templateUrl: './create-floor.component.html',
  styleUrls: ['./create-floor.component.css']
})
export class CreateFloorComponent {
  floor = {
    buildingId: '',
    number: '',
    description: ''
  };

  buildings=[{"id":"aaaaaa","code":"A"},{"id":"asds1","code":"B"}]
  

  createFloor() {
    console.log(this.floor)
  }

  
}
